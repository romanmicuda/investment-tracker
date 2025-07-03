package com.personal.finance.tracker.demo.investment.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

import com.personal.finance.tracker.demo.user.data.User;


@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Investment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String assetName;
    private double quantity;
    private double buyPrice;
    private Double currentPrice;
    private LocalDate buyDate;
    private String notes;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

