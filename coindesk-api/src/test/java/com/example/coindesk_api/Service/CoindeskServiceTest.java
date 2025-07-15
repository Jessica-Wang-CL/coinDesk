package com.example.coindesk_api.Service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CoindeskServiceTest {

    @Autowired
    private CoindeskService coindeskService;

    @Test
    void testFetchCoindeskData() {
        System.out.println("testFetchCoindeskData: "+ coindeskService.fetchCoindeskData());
    }
}
