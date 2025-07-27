package com.personal.finance.tracker.demo.investment.web.bodies;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
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
import com.personal.finance.tracker.demo.investment.data.InvestmentStatistics;
import com.personal.finance.tracker.demo.investment.logic.InvestmentService;
import com.personal.finance.tracker.demo.investment.web.AllInvestementReqeust;
import com.personal.finance.tracker.demo.investment.web.InvestmentStatisticsResponse;
import com.personal.finance.tracker.demo.user.data.User;
import com.personal.finance.tracker.demo.user.logic.UserProviderService;

@RequestMapping("api/investments")
@RestController
public class InvestmentController {

    private final InvestmentService investmentService;
    private final UserProviderService userProviderService;

    public InvestmentController(InvestmentService investmentService, UserProviderService userProviderService) {
        this.investmentService = investmentService;
        this.userProviderService = userProviderService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvestmentResponse> getInvestmentById(@PathVariable("id") UUID id) throws NotFoundException {
        Investment investment = investmentService.getInvestmentById(id);
        return ResponseEntity.ok(new InvestmentResponse(investment));
    }

    @PostMapping("/all")
    public ResponseEntity<List<InvestmentResponse>> getAllInvestments(@RequestBody AllInvestementReqeust request) {
        Page<Investment> investments = investmentService.getAllInvestments(request);
        List<InvestmentResponse> investmentResponses = investments.stream()
                .map(InvestmentResponse::new)
                .toList();
        return ResponseEntity.ok(investmentResponses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvestmentById(@PathVariable("id") UUID id) throws NotFoundException {
        investmentService.deleteInvestmentById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvestmentResponse> updateInvestment(@PathVariable("id") UUID id,
            @RequestBody UpdateInvestmentRequest request) throws NotFoundException {
        Investment investment = investmentService.updateInvestment(id, request);
        return ResponseEntity.ok(new InvestmentResponse(investment));
    }

    @PostMapping
    public ResponseEntity<InvestmentResponse> createInvestment(@RequestBody InvestmentRequest request) throws NotFoundException {
        User appUser = userProviderService.getCurrentUser()
                .orElseThrow(() -> new NotFoundException("User not found"));
        Investment newInvestment = investmentService.createInvestment(request, appUser);
        return ResponseEntity.ok(new InvestmentResponse(newInvestment));
    }

    @GetMapping("/statistics")
    public ResponseEntity<InvestmentStatisticsResponse> getInvestmentStatistics() throws NotFoundException {
        User appUser = userProviderService.getCurrentUser()
                .orElseThrow(() -> new NotFoundException("User not found"));
        InvestmentStatistics statistics = investmentService.getInvestmentStatistics(appUser);
        return ResponseEntity.ok(InvestmentStatisticsResponse.fromStatistics(statistics));
    }   

}
