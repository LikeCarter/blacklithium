---
template: post
title: Visualizing the sudden jump in Coronavirus cases
slug: the-sudden-jump-in-coronavirus-cases
draft: false
date: 2020-02-13T14:47:06.552Z
description: >-
  Inconsistent numbers are being reported by health officials at the center of
  the outbreak. On February 11, the number of new confirmed cases slowed and the
  Dow closed at a record. But only a day later, health officials in Hubei
  province confirmed 14,840 new infections.
category: Data Visualization
tags:
  - Data Visualization
  - Epidemiology
---
## What is going on with the Coronavirus?

Health officials in Hubei (centre of the outbreak) are reporting inconsistent [numbers](https://www.nytimes.com/2020/02/12/health/coronavirus-cases-china.html). On February 11, the number of confirmed cases showed signs of levelling off and the Dow Jones closed at a [record](https://www.wsj.com/articles/global-stocks-rise-as-optimism-prevails-11581503200). But only a day later, health officials confirmed 14,840 new infections in Hubei – the total number of is now 48,206. In response, the CCP [ousted](https://www.wsj.com/articles/china-ousts-top-official-in-coronavirus-outbreaks-epicenter-11581568911) the party secretaries of Hubei and Wuhan.

So what is really happening?

## Confirmed cases

<img src="https://s3.amazonaws.com/carter.sprigings.com/confirmed-ncov2019.png" alt="Confirmed number of cases" width="100%"/>

### Takeaways

* The majority of cases are still found in Hubei. 
* This sudden jump suggests there are many people in the centre of the outbreak that have not been diagnosed. 
* Undiagnosed individuals increases the chances of spreading the virus leading to an increased transmission rate (Ro) value.
* The Coronavirus could have a Ro as high as 3.0 without effective containment measures.

## Recovered cases

<img src="https://s3.amazonaws.com/carter.sprigings.com/recovered-ncov2019.png" alt="Confirmed number of cases" width="100%"/>

### Takeaways

* It's a good sign that the number of recovered cases is showing hockey-stick properties (growing exponentially).
* The state of the healthcare system is an important factor for improving the chances of recovery. Because of this, the growth of this chart could get worse if the outbreak continues.

## Deaths

<img src="https://s3.amazonaws.com/carter.sprigings.com/deaths-ncov2019.png" alt="Confirmed number of cases" width="100%"/>

### Takeaways

* The number of deaths has showed linear properties until recently – with over 200 deaths reported on February 12.
* The mortality rate is often calculated as the deaths per confirmed cases (2%).
* The true mortality rate will be closer to the number of dead per recovered + dead individuals. This sits around 15% but will move downwards towards 5-10%.

## Mapping the Coronavirus in Asia

<img src="https://s3.amazonaws.com/carter.sprigings.com/map.png" alt="Coronavirus map" width="100%"/>

### Takeaways

* The radii of the circles are log-scaled to the number of confirmed cases, recoveries, and deaths, respectively.
* We can see that Hubei Province (in the centre) has the most cases. But also the most deaths by a significant margin.
* This suggests that the number of deaths increase once the medical system becomes overburdened.
* Or that the number of cases is much higher than confirmed (or reported).

## Conclusion

The sudden jump in Coronavirus cases is probably the result of inadequate testing. The original nucleic acid tests are only 30-40% accurate. Moreover, there is a shortage of testing kits and **the results of this testing kit takes two days**.

Many infected patients were told to go home rather than be isolated and undergo treatment. The deceased whistle-blower [Dr. Li Wenliang](https://www.nytimes.com/2020/02/07/world/asia/china-coronavirus-doctor-death.html) needed to be tested five times before the test showed a positive result. 

Now, doctors in Hubei province are including infections diagnosed by using lung scans of symptomatic patients. This shortcut will help but a more accurate and consistent test is needed.

At this stage, properly identifying the affected individuals and quarantining them from the general population will be the most important mitigation against the Coronavirus.

––

These graphs were produced with [ObservableHQ](https://observablehq.com/). Give me a [follow](https://observablehq.com/@likecarter)!
