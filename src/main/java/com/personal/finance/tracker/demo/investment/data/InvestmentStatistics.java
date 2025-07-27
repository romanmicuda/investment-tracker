package com.personal.finance.tracker.demo.investment.data;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class InvestmentStatistics {

    /**
     * Total capital invested across all assets.
     * Calculated as the sum of (quantity * buyPrice) for all investments.
     */
    private double totalInvestedValue;

    /**
     * Total number of individual investment transactions.
     */
    private long totalNumberOfInvestments;

    /**
     * The date of the very first investment made.
     */
    private LocalDate earliestInvestmentDate;

    /**
     * The date of the most recent investment made.
     */
    private LocalDate latestInvestmentDate;

    /**
     * A map showing the value distribution across different assets.
     * Key: Asset Name, Value: Total invested value for that asset.
     */
    private Map<String, Double> investmentValueByAsset;
}
