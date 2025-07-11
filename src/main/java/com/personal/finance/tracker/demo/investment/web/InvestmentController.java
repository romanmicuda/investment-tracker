package com.personal.finance.tracker.demo.investment.web;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personal.finance.tracker.demo.exception.NotFoundException;
import com.personal.finance.tracker.demo.investment.data.Investment;
import com.personal.finance.tracker.demo.investment.logic.InvestmentService;
import com.personal.finance.tracker.demo.investment.web.bodies.InvestmentRequest;
import com.personal.finance.tracker.demo.investment.web.bodies.InvestmentResponse;
import com.personal.finance.tracker.demo.investment.web.bodies.UpdateInvestmentRequest;

@RequestMapping("api/investments")
@RestController
public class InvestmentController {

    private final InvestmentService investmentService;

    public InvestmentController(InvestmentService investmentService) {
        this.investmentService = investmentService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvestmentResponse> getInvestmentById(@PathVariable("id") UUID id) throws NotFoundException {
        Investment investment = investmentService.getInvestmentById(id);
        return ResponseEntity.ok(new InvestmentResponse(investment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvestmentById(@PathVariable("id") UUID id) throws NotFoundException {
        investmentService.deleteInvestmentById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvestmentResponse> updateInvestment(@PathVariable("id") UUID id,
            @RequestBody UpdateInvestmentRequest request) throws NotFoundException {
        Investment investment = investmentService.updateInvestment(id, request);
        return ResponseEntity.ok(new InvestmentResponse(investment));
    }

    @PostMapping
    public ResponseEntity<InvestmentResponse> createInvestment(@RequestBody InvestmentRequest request) {
        Investment newInvestment = investmentService.createInvestment(request);
        return ResponseEntity.ok(new InvestmentResponse(newInvestment));
    }
}
