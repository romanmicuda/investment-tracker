package com.personal.finance.tracker.demo.investment.logic;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestBody;

import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.investment.data.Investment;
import com.personal.finance.tracker.demo.investment.data.InvestmentStatistics;
import com.personal.finance.tracker.demo.investment.web.AllInvestementReqeust;
import com.personal.finance.tracker.demo.investment.web.bodies.InvestmentRequest;
import com.personal.finance.tracker.demo.investment.web.bodies.UpdateInvestmentRequest;
import com.personal.finance.tracker.demo.user.data.User;

public interface InvestmentService {
    
    public Investment getInvestmentById(UUID id) throws NotFoundException;
    public void deleteInvestmentById(UUID id) throws NotFoundException;
    public Investment createInvestment(@RequestBody InvestmentRequest request, User user);
    public Investment updateInvestment(UUID id, @RequestBody UpdateInvestmentRequest request) throws NotFoundException;
    public Page<Investment> getAllInvestments(AllInvestementReqeust request);

    public InvestmentStatistics getInvestmentStatistics(User user);
}
