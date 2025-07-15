package com.example.coindesk_api.Service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.coindesk_api.DTO.TransformedCurrency;

@SpringBootTest
public class CurrencyServiceTest {

    @Autowired
    private CurrencyService currencyService;

    @Test
    void testCreateOrUpdate() {
        TransformedCurrency transformedCurrency = new TransformedCurrency();
        transformedCurrency.setCurrency("JPY");
        transformedCurrency.setChineseName("日圓");
        currencyService.createOrUpdate(transformedCurrency);
    }

    @Test
    void testDeleteCurrency() {
        currencyService.deleteCurrency("JPY");
    }

    @Test
    void testGetAllCurrencies() {
        System.out.println("testGetAllCurrencies: "+currencyService.getAllCurrencies());
    }
}
