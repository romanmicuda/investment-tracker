package com.personal.finance.tracker.demo.investment.logic;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.investment.data.Investment;
import com.personal.finance.tracker.demo.investment.data.InvestmentRepository;
import com.personal.finance.tracker.demo.investment.web.bodies.InvestmentRequest;
import com.personal.finance.tracker.demo.investment.web.bodies.UpdateInvestmentRequest;

@Service
public class InvestmentServiceImpl implements InvestmentService {

    private final InvestmentRepository investementRepository;

    public InvestmentServiceImpl(InvestmentRepository investementRepository) {
        this.investementRepository = investementRepository;
    }
    @Override
    public Investment getInvestmentById(UUID id) throws NotFoundException {
        Optional<Investment> investment = investementRepository.findById(id);
        if (investment.isPresent()) {
            return investment.get();
        } else {
            throw new NotFoundException("Investment with id " + id + " not found");
        }
    }
    @Override
    public void deleteInvestmentById(UUID id) throws NotFoundException {
        Optional<Investment> investment = investementRepository.findById(id);
        if (investment.isPresent()) {
            investementRepository.delete(investment.get());
        } else {
            throw new NotFoundException("Investment with id " + id + " not found");
        }
    }
    @Override
    public Investment createInvestment(InvestmentRequest request){
        Investment newInvestment = new Investment();
        newInvestment.setAssetName(request.getAssetName());
        newInvestment.setQuantity(request.getQuantity());
        newInvestment.setBuyPrice(request.getBuyPrice());
        newInvestment.setCurrentPrice(request.getCurrentPrice());
        newInvestment.setBuyDate(request.getBuyDate());
        newInvestment.setNotes(request.getNotes());
        return investementRepository.save(newInvestment);
    }
    @Override
    public Investment updateInvestment(UUID id, UpdateInvestmentRequest request) throws NotFoundException {
        Optional<Investment> existingInvestment = investementRepository.findById(id);
        if (existingInvestment.isPresent()) {
            Investment investment = existingInvestment.get();
            investment.setAssetName(request.getAssetName());
            investment.setQuantity(request.getQuantity());
            investment.setBuyPrice(request.getBuyPrice());
            investment.setCurrentPrice(request.getCurrentPrice());
            investment.setBuyDate(request.getBuyDate());
            investment.setNotes(request.getNotes());
            return investementRepository.save(investment);
        } else {
            throw new NotFoundException("Investment with id " + id + " not found");
        }
    }
    
}
