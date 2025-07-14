package com.example.coindesk_api.Controller;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.coindesk_api.DTO.CoindeskResponse;
import com.example.coindesk_api.DTO.TransformedCurrency;
import com.example.coindesk_api.DTO.TransformedResponse;
import com.example.coindesk_api.Domain.CurrencyEntity;
import com.example.coindesk_api.Repository.CurrencyRepository;
import com.example.coindesk_api.Service.CoindeskService;

@RestController
@RequestMapping("/api/coindesk")
public class CoindeskController {

    @Autowired
    private CoindeskService coindeskService;

    @Autowired
    private CurrencyRepository currencyRepository;

    @GetMapping("/transformed")
    public TransformedResponse getTransformed() {
        CoindeskResponse data = coindeskService.fetchCoindeskData();

        List<TransformedCurrency> currencies = data.getBpi().entrySet().stream().map(entry -> {
            String code = entry.getKey();
            CurrencyEntity currency = currencyRepository.findById(code).orElse(null);

            TransformedCurrency transformed = new TransformedCurrency();
            transformed.setCurrency(code);
            transformed.setRate(entry.getValue().getRate_float());
            transformed.setChineseName(currency != null ? currency.getChineseName() : "未定義");
            return transformed;
        }).collect(Collectors.toList());

        String updatedISO = data.getTime().getUpdatedISO();
        OffsetDateTime odt = OffsetDateTime.parse(updatedISO);
        String formattedTime = odt.format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss"));

        TransformedResponse response = new TransformedResponse();

        response.setUpdatedTime(formattedTime);
        response.setDisclaimer(data.getDisclaimer());
        response.setCurrencyList(currencies);

        return response;
    }
}
