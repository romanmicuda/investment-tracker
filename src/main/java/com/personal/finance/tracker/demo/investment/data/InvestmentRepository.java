package com.personal.finance.tracker.demo.investment.data;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.personal.finance.tracker.demo.user.data.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InvestmentRepository extends JpaRepository<Investment, UUID> {

    Page<Investment> findAll(Pageable pageable);
    Optional<Investment> findById(UUID id);
    List<Investment> findAllByUser(User user);
}
