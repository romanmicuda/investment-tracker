package com.personal.finance.tracker.demo.investment.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

import com.personal.finance.tracker.demo.appUser.model.AppUser;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Investment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String assetName;
    private double quantity;
    private double buyPrice;
    private Double currentPrice;
    private LocalDate buyDate;
    private String notes;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
}

