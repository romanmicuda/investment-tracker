package com.personal.finance.tracker.demo.investment.logic;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.investment.data.Investment;
import com.personal.finance.tracker.demo.investment.data.InvestmentRepository;
import com.personal.finance.tracker.demo.investment.data.InvestmentStatistics;
import com.personal.finance.tracker.demo.investment.web.AllInvestementReqeust;
import com.personal.finance.tracker.demo.investment.web.bodies.InvestmentRequest;
import com.personal.finance.tracker.demo.investment.web.bodies.UpdateInvestmentRequest;
import com.personal.finance.tracker.demo.user.data.User;

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
    public Investment createInvestment(InvestmentRequest request, User user){
        Investment newInvestment = new Investment();
        newInvestment.setAssetName(request.getAssetName());
        newInvestment.setQuantity(request.getQuantity());
        newInvestment.setBuyPrice(request.getBuyPrice());
        newInvestment.setBuyDate(request.getBuyDate());
        newInvestment.setNotes(request.getNotes());
        newInvestment.setUser(user);
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
    @Override
    public Page<Investment> getAllInvestments(AllInvestementReqeust request) {
       return investementRepository.findAll(PageRequest.of(request.getPageNumber(), request.getPageSize()));
    }
    @Override
    public InvestmentStatistics getInvestmentStatistics(User user) {
        List<Investment> investments = investementRepository.findAllByUser(user);
        InvestmentStatistics statistics = new InvestmentStatistics();
        statistics.setInvestmentValueByAsset(
            investments.stream()
                .collect(Collectors.groupingBy(Investment::getAssetName, 
                    Collectors.summingDouble(investment -> 
                       investment.getQuantity() * investment.getBuyPrice()
                    ))
                )
        );
        statistics.setEarliestInvestmentDate(
            investments.stream()
                .map(Investment::getBuyDate)
                .min(LocalDate::compareTo)
                .orElse(null)
        );
        statistics.setLatestInvestmentDate(
            investments.stream()
                .map(Investment::getBuyDate)
                .max(LocalDate::compareTo)
                .orElse(null)
        );
        statistics.setTotalInvestedValue(
            investments.stream()
                .mapToDouble(investment -> investment.getQuantity() * investment.getBuyPrice())
                .sum()
        );
        statistics.setTotalNumberOfInvestments(investments.size());
        return statistics;

    }

}
