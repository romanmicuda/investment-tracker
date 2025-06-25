package com.personal.finance.tracker.demo.transaction.data;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

import com.personal.finance.tracker.demo.appUser.data.AppUser;
import com.personal.finance.tracker.demo.category.model.Category;
import com.personal.finance.tracker.demo.transactionType.model.TransactionType;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Transaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private double amount;

    @Enumerated(EnumType.STRING)
    private TransactionType type; // INCOME / EXPENSE

    private String description;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
}
