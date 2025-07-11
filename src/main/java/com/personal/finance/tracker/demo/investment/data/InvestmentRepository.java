package com.personal.finance.tracker.demo.investment.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InvestmentRepository extends JpaRepository<Investment, UUID> {

}
