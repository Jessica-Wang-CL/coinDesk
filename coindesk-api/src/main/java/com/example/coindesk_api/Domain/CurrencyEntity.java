package com.example.coindesk_api.Domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "currency")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CurrencyEntity {

    @Id
    @Column(length = 10)
    private String code;

    @Column(name = "chinese_name", nullable = false, length = 50)
    private String chineseName;
}