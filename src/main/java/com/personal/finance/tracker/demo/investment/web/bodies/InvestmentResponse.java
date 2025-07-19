package com.personal.finance.tracker.demo.investment.web.bodies;

import java.time.LocalDate;
import java.util.UUID;
import lombok.Data;
import com.personal.finance.tracker.demo.investment.data.Investment;

@Data
public class InvestmentResponse {
    
    private UUID id;
    private String assetName;
    private double quantity;
    private double buyPrice;
    private Double currentPrice;
    private LocalDate buyDate;
    private String notes;

    public InvestmentResponse(Investment investment) {
        this.id = investment.getId();
        this.assetName = investment.getAssetName();
        this.quantity = investment.getQuantity();
        this.buyPrice = investment.getBuyPrice();
        this.currentPrice = investment.getCurrentPrice();
        this.buyDate = investment.getBuyDate();
        this.notes = investment.getNotes();
    }

}
