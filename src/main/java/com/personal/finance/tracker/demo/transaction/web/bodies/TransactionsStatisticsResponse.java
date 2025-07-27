package com.personal.finance.tracker.demo.transaction.web.bodies;

import com.personal.finance.tracker.demo.transaction.data.TransactionsStatistics;

import lombok.Data;

@Data
public class TransactionsStatisticsResponse {
    private double totalBalance;
    private double income;
    private double expenses;

    public static TransactionsStatisticsResponse fromStatistics(TransactionsStatistics statistics) {
        TransactionsStatisticsResponse response = new TransactionsStatisticsResponse();
        response.setTotalBalance(statistics.getTotalBalance());
        response.setIncome(statistics.getIncome());
        response.setExpenses(statistics.getExpenses());
        return response;
    }

}
