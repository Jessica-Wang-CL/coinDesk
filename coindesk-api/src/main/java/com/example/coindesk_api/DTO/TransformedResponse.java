package com.example.coindesk_api.DTO;

import java.util.List;

import lombok.Data;

@Data
public class TransformedResponse {
    private String updatedTime;
    private String disclaimer;
    private List<TransformedCurrency> currencyList;
}
