package com.personal.finance.tracker.demo.category.data;

import java.util.UUID;

import com.personal.finance.tracker.demo.appUser.data.AppUser;

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
    private AppUser user;
}

