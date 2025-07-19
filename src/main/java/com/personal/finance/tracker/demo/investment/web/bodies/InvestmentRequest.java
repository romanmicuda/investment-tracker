package com.personal.finance.tracker.demo.investment.web.bodies;

import java.time.LocalDate;

import lombok.Data;

@Data
public class InvestmentRequest {
    private String assetName;
    private double quantity;
    private double buyPrice;
    private LocalDate buyDate;
    private String notes;
}
