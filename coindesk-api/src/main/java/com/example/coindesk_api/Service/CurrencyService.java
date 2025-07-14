package com.example.coindesk_api.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.coindesk_api.Domain.CurrencyEntity;
import com.example.coindesk_api.Repository.CurrencyRepository;

@Service
public class CurrencyService {

    @Autowired
    private CurrencyRepository currencyRepository;

    public List<CurrencyEntity> getAllCurrencies() {
        return currencyRepository.findAllByOrderByCodeAsc();
    }

    public CurrencyEntity addCurrency(CurrencyEntity currency) {
        return currencyRepository.save(currency);
    }

    public CurrencyEntity updateCurrency(String code, CurrencyEntity currency) {
        CurrencyEntity existing = currencyRepository.findById(code).orElseThrow();
        existing.setChineseName(currency.getChineseName());
        return currencyRepository.save(existing);
    }

    public void deleteCurrency(String code) {
        currencyRepository.deleteById(code);
    }
}
