---
template: post
title: 'What is the difference between Sharpe, Sortino, and Treynor Ratios?'
slug: sharpe-ratio-or-sortino-ratio-or-treynor-ratio
draft: false
date: 2019-11-11T22:15:13.746Z
description: >-
  The Sharpe Ratio is a risk-adjusted measure of return that uses standard
  deviation to represent risk.
category: Finance
tags:
  - Finance
  - Investment
  - Trading
---
## Sharpe Ratio

Named after William F. Sharpe, who developed it in 1966 (revised in 1994), the Sharpe Ratio is a risk-adjusted measure of return that uses standard deviation to represent risk. The Sharpe ratio is simply the return per unit of risk (represented by variance).  The higher the Sharpe ratio, the better the combined performance of "risk" and return.

Using an annualized Sharpe Ratio is useful for comparison of multiple return streams.  The annualized Sharpe ratio is computed by dividing the annualized mean monthly excess return by the annualized monthly standard deviation of excess return. Like any other mathematical model, it relies on the data being correct – Ponzi schemes have high Sharpe ratios.

This function annualizes the number based on the scale parameter.



## Information Ratio

The information ratio is similar to the Sharpe ratio, the main difference being that the Sharpe ratio uses a risk-free return as benchmark whereas the information ratio uses a risky index as benchmark (such as the S&P500). While the information ratio is widely used in practice, it is still often referred to as the Sharpe ratio. 

William Sharpe recommends the _Information Ratio_ preferentially to the original Sharpe Ratio.



## Weaknesses of Sharpe (and Information) Ratios

For **negative returns**, the Sharpe ratio is not a particularly useful tool of analysis. This is because a negative Sharpe ratio can be brought closer to zero by either increasing returns (a good thing) or increasing volatility (a bad thing).

For returns that are **not normally distributed**, the Sharpe ratio is a poor tool of analysis. Abnormalities like kurtosis, fatter tails and higher peaks, or skewness on the distribution can be problematic for the ratio, as standard deviation doesn't have the same effectiveness when these problems exist. Returns can be of any frequency (i.e. daily, weekly, monthly or annually), as the returns can always be annualized.



## Sortino Ratio

Developed by Frank A. Sortino in 1994, the Sortino ratio is a modification of the Sharpe ratio  but penalizes only those returns falling below a user-specified target. 

Because the Sortino ratio focuses only on the negative deviation of a portfolio's returns from the mean, it is thought to give a better view of a portfolio's risk-adjusted performance since positive volatility is a benefit.

In the ratio, the downside risk (denominator) is target semi-deviation (the square root of target semi-variance). An intuitive way to view downside risk is the annualized standard deviation of returns below the target.



## Treynor Ratio

The Treynor ratio, named after Jack L. Treynor, works only with systematic risk of a portfolio whereas the Sharpe ratio observes both systematic and idiosyncratic risks. 



## Weaknesses of Treynor Ratio

Because the Treynor ratio uses systematic risk instead of total risk, it will not reveal risks in an investors portfolio if it lacks diversity.

**What is the difference between idiosyncratic systemic risk?**

Total risk of an asset is a combination of idiosyncratic risk and systemic risk. Idiosyncratic risk is the inherent risk involved in investing in a specific asset that doesn’t affect the entire market (or an entire investment portfolio). It is the opposite of systemic risk, which affects all assets. Systemic risks include things such as changing interest rates or inflation.



## Additional Information

Berkshire Hathaway had a Sharpe ratio of 0.76 for the period 1976 to 2011, higher than any other stock or mutual fund with a history of more than 30 years. The stock market had a Sharpe ratio of 0.39 for the same period.

Purportedly Renaissance Technologies' Medallion Fund has a Sharpe ratio that has never been below 2.0, and as high as 7.0. As possibly the most successful quantitative hedge fund in history, Renaissance’s Medallion fund, available only to the firm’s employees, has reportedly generated returns of almost 80% a year (before fees) since being founded in 1988 by James Simmons.
