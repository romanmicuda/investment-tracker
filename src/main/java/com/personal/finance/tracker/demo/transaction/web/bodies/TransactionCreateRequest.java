package com.personal.finance.tracker.demo.transaction.web.bodies;

import java.time.LocalDate;

import lombok.Data;

@Data
public class TransactionCreateRequest {
    private double amount;

    private String type;

    private String description;

    private LocalDate date;

    private String category;
}
