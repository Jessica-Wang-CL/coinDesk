package com.example.coindesk_api.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.coindesk_api.DTO.TransformedCurrency;
import com.example.coindesk_api.Domain.CurrencyEntity;
import com.example.coindesk_api.Service.CurrencyService;

@RestController
@RequestMapping("/api/currency")
public class CurrencyController {

    @Autowired
    private CurrencyService currencyService;

    @GetMapping
    public List<CurrencyEntity> getAll() {
        return currencyService.getAllCurrencies();
    }

    @PostMapping(value = "/createOrUpdate")
    public void createOrUpdate(@RequestBody TransformedCurrency transformedCurrency) {
        currencyService.createOrUpdate(transformedCurrency);
    }

    @PostMapping(value = "/delete")
    public void delete(@RequestParam String code) {
        currencyService.deleteCurrency(code);
    }
}
