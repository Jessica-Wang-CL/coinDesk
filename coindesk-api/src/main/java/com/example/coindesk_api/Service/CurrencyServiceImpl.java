package com.example.coindesk_api.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.coindesk_api.DTO.TransformedCurrency;
import com.example.coindesk_api.Domain.CurrencyEntity;
import com.example.coindesk_api.Repository.CurrencyRepository;

@Service
public class CurrencyServiceImpl implements CurrencyService {

    @Autowired
    private CurrencyRepository currencyRepository;

    @Override
    public List<CurrencyEntity> getAllCurrencies() {
        return currencyRepository.findAllByOrderByCodeAsc();
    }

    @Transactional
	@Override
    public void createOrUpdate(TransformedCurrency transformedCurrency) {
        CurrencyEntity entity = currencyRepository.findById(transformedCurrency.getCurrency()).orElse(null);
        if (entity != null) {
            entity.setChineseName(transformedCurrency.getChineseName());
        } else {
            entity = new CurrencyEntity();
            entity.setCode(transformedCurrency.getCurrency());
            entity.setChineseName(transformedCurrency.getChineseName());
        }
        currencyRepository.save(entity);
    }

    @Transactional
	@Override
    public void deleteCurrency(String code) {
        currencyRepository.deleteById(code);
    }

}
