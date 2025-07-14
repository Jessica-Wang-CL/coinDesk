package com.example.coindesk_api.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping
    public CurrencyEntity create(@RequestBody CurrencyEntity currency) {
        return currencyService.addCurrency(currency);
    }

    @PutMapping("/{code}")
    public CurrencyEntity update(@PathVariable String code, @RequestBody CurrencyEntity currency) {
        return currencyService.updateCurrency(code, currency);
    }

    @DeleteMapping("/{code}")
    public void delete(@PathVariable String code) {
        currencyService.deleteCurrency(code);
    }
}
