package com.personal.finance.tracker.demo.transaction.data;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    
    Optional<Transaction> findById(UUID id);
    boolean existsById(UUID id);
}
