package com.example.coindesk_api.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.coindesk_api.DTO.CoindeskResponse;
import com.example.coindesk_api.Service.CoindeskService;

@Component
public class ScheduledTask {

    @Autowired
    private CoindeskService coindeskService;

    @Scheduled(cron = "0 0 0 * * *")  // 每天凌晨 12:00 執行
    public void updateExchangeRates() {
        try {
            CoindeskResponse data = coindeskService.fetchCoindeskData();
            System.out.println("成功更新匯率資料：" + data);
        } catch (Exception e) {
            System.err.println("更新匯率時發生錯誤: " + e.getMessage());
        }
    }
}
