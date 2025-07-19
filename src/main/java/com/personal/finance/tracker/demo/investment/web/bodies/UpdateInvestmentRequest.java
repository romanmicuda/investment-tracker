package com.personal.finance.tracker.demo.investment.web.bodies;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UpdateInvestmentRequest {
    private String assetName;
    private double quantity;
    private double buyPrice;
    private Double currentPrice;
    private LocalDate buyDate;
    private String notes;
    
}
