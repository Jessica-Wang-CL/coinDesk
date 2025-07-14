package com.example.coindesk_api.DTO;

import lombok.Data;

@Data
public class TransformedCurrency {
    private String currency;
    private String chineseName;
    private double rate;
}