package com.example.coindesk_api.Service;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.coindesk_api.DTO.CoindeskResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class CoindeskService {
     private static final String COINDESK_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    public CoindeskResponse fetchCoindeskData() {
        try {
            // 嘗試呼叫 CoinDesk API
            ResponseEntity<CoindeskResponse> response = restTemplate.getForEntity(COINDESK_URL, CoindeskResponse.class);
            return response.getBody();
        } catch (Exception e) {
            // 呼叫失敗時，從本地 mock json 載入資料
            try (InputStream is = getClass().getClassLoader().getResourceAsStream("mock/coindesk_mock.json")) {
                return objectMapper.readValue(is, CoindeskResponse.class);
            } catch (IOException ex) {
                throw new RuntimeException("載入 Mocking Data 失敗", ex);
            }
        }
    }
}
