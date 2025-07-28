package com.personal.finance.tracker.demo.user.data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.personal.finance.tracker.demo.category.data.Category;
import com.personal.finance.tracker.demo.investment.data.Investment;
import com.personal.finance.tracker.demo.transaction.data.Transaction;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "email") 
    })
    @Data
    @NoArgsConstructor
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;

  // @NotBlank
  // @Size(max = 20)
  private String username;

  // @NotBlank
  // @Size(max = 50)
  // @Email
  private String email;

  // @NotBlank
  // @Size(max = 120)
  private String password;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(  name = "user_roles", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();

  private LocalDateTime createdAt = LocalDateTime.now();

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Transaction> transactions;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Investment> investments;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Category> customCategories;

  public User(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

}
