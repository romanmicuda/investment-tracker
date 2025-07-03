package com.personal.finance.tracker.demo.transaction.data;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

import com.personal.finance.tracker.demo.category.data.Category;
import com.personal.finance.tracker.demo.user.data.User;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Transaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private double amount;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    private String description;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
