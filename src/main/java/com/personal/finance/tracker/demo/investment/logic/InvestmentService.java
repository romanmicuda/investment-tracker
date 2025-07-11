package com.personal.finance.tracker.demo.investment.logic;

import java.util.UUID;

import org.springframework.web.bind.annotation.RequestBody;

import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.investment.data.Investment;
import com.personal.finance.tracker.demo.investment.web.bodies.InvestmentRequest;
import com.personal.finance.tracker.demo.investment.web.bodies.UpdateInvestmentRequest;

public interface InvestmentService {
    
    public Investment getInvestmentById(UUID id) throws NotFoundException;
    public void deleteInvestmentById(UUID id) throws NotFoundException;
    public Investment createInvestment(@RequestBody InvestmentRequest request);
    public Investment updateInvestment(UUID id, @RequestBody UpdateInvestmentRequest request) throws NotFoundException;
}
