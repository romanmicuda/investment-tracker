package com.personal.finance.tracker.demo.investment.web;

import java.time.LocalDate;
import java.util.Map;

import com.personal.finance.tracker.demo.investment.data.InvestmentStatistics;

import lombok.Data;

@Data
public class InvestmentStatisticsResponse {
    private double totalInvestedValue;
    private long totalNumberOfInvestments;
    private LocalDate earliestInvestmentDate;
    private LocalDate latestInvestmentDate;
    private Map<String, Double> investmentValueByAsset;


    public static InvestmentStatisticsResponse fromStatistics(InvestmentStatistics statistics) {
        InvestmentStatisticsResponse response = new InvestmentStatisticsResponse();
        response.setInvestmentValueByAsset(statistics.getInvestmentValueByAsset());
        response.setTotalInvestedValue(statistics.getTotalInvestedValue());
        response.setTotalNumberOfInvestments(statistics.getTotalNumberOfInvestments());
        response.setEarliestInvestmentDate(statistics.getEarliestInvestmentDate());
        response.setLatestInvestmentDate(statistics.getLatestInvestmentDate());
        return response;
    }

}
