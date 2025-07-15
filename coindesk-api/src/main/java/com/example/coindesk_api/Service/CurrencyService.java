package com.example.coindesk_api.Service;
import java.util.List;

import com.example.coindesk_api.DTO.TransformedCurrency;
import com.example.coindesk_api.Domain.CurrencyEntity;

public interface CurrencyService {
    public List<CurrencyEntity> getAllCurrencies();
    public void createOrUpdate(TransformedCurrency transformedCurrency);
    public void deleteCurrency(String code);
}
