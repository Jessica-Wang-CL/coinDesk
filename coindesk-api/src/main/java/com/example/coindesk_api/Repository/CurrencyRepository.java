package com.example.coindesk_api.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.coindesk_api.Domain.CurrencyEntity;

public interface CurrencyRepository extends JpaRepository<CurrencyEntity, String>{
    List<CurrencyEntity> findAllByOrderByCodeAsc();
}
