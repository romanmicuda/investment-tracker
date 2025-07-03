package com.personal.finance.tracker.demo.category.data;

import java.util.UUID;

import com.personal.finance.tracker.demo.user.data.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Category {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;

    // Null if it's a global category
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private boolean deletable;

    public Category(String name, User user) {
        this.name = name;
        this.user = user;
        this.deletable = false; // Default to false, can be set to true when needed
    
    }
}

