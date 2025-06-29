package com.personal.finance.tracker.demo.transaction.data;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.personal.finance.tracker.demo.appUser.data.AppUser;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    
    Optional<Transaction> findById(UUID id);
    boolean existsById(UUID id);
    List<Transaction> findAllByUser(AppUser user);
}
