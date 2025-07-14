package com.example.coindesk_api.DTO;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoindeskResponse {

    private Time time;
    private String disclaimer;
    private String chartName;
    private Map<String, CurrencyRate> bpi;

    @Data
    public static class Time {
        private String updated;
        private String updatedISO;
        private String updateduk;
    }

    @Data
    public static class CurrencyRate {
        private String code;
        private String symbol;
        private String rate;
        private String description;
        private double rate_float;
    }
}
