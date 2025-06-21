package com.personal.finance.tracker.demo.category.model;

import com.personal.finance.tracker.demo.appUser.model.AppUser;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Category {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Null if it's a global category
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
}

