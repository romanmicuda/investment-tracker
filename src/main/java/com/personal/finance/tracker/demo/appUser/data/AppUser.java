package com.personal.finance.tracker.demo.appUser.data;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.personal.finance.tracker.demo.category.data.Category;
import com.personal.finance.tracker.demo.investment.model.Investment;
import com.personal.finance.tracker.demo.transaction.data.Transaction;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class AppUser {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    
    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Transaction> transactions;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Investment> investments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Category> customCategories;
}
