---
template: post
title: Coronavirus mutations and its evolution
slug: coronavirus-mutations-and-its-evolution
draft: false
date: 2020-03-12T16:08:40.229Z
description: >-
  Genomic analysis has changed the way we can visualize the spread of pathogens.
  Every time a virus spreads to another person, it leaves a genomic signature
  via point mutations.
category: Data Visualization
tags:
  - Epidemiology
  - Data Visualization
---
Genomic analysis has changed the way we can visualize the spread of pathogens. Every time a virus spreads to another person, it leaves a genomic signature via point mutations. Using a simple phylogenic tree, we can see the particular “strains” of COVID-19. It is trivial to use this data to trace the spread of COVID-19 from its origin across the world.

For example, we can see all of the cases that originated in China (Hubei province) spread into distinct phylogenic trees. Cases in North America are coloured red.

<img src="https://s3.amazonaws.com/carter.sprigings.com/covid19-tree-radial.png"/>

The interactive tree can be found at [nextstrain.org](https://nextstrain.org/ncov).

Plotting a histogram of point mutations shows us what parts of its genome are active (i.e. have a significant number of mutations). Mutations often occur by chance and are neutral – not harming or benefitting the organism. However, when they provide an evolutionary advantage, they are selected for. The peaks in this histogram *suggest* they are mutations that confer an evolutionary advantage.

<img style="width: 100%" alt="COVID-19 Point mutations" src="https://s3.amazonaws.com/carter.sprigings.com/covid-19-point-mutations.png"/>


Contrary to the stereotypical view of viruses as deadly killing machines, it is in their best interest not to kill the host.

In particular, a virus will usually select for a few things:

* Faster reproduction cycle (shedding)

* Become more contagious (better survival outside the body; higher production in mucus)

* Better host survival (or an extended shedding period before killing the host)

It is not obvious that the virus wants to keep the host alive. Diseases with a high mortality rate such as Ebola (~90%) do not encourage the reproduction of the virus. As a consequence, it has a poor ability to cause a pandemic because it kills the host before it can spread to enough people. 

On the other hand, COVID-19 has a mortality of ~2%. This allows the virus to have a long reproductive cycle in 98% of the infected. This also means that the selective pressure for COVID-19 to reduce its mortality rate below 2% is much weaker.

I admit that my [previous estimate](https://carter.sprigings.com/the-sudden-jump-in-coronavirus-cases) of a 5-10% mortality rate was incorrect. I failed to account for the majority of people who have mild symptoms and are not tested for COVID-19. The real figure is closer to ~2% (possibly greater if health systems begin to fail).

Right now, there are two major subtypes of Coronavirus, the S-type and its L-type descendent. Now, the L-type is found in the majority of cases, suggesting it is harbouring more aggressive mutations. These mutations are in the [receptor-binding domain of the COVID-19 spike protein](https://academic.oup.com/nsr/advance-article/doi/10.1093/nsr/nwaa036/5775463), likely making it more contagious.  Once the virus is analyzed, we will be able to understand what is being selected for.

It is believed COVID-19 originated in bats (96.3%) and jumped to the Pangolin (~99% sequence similarity) before reaching humans. Assuming this is true, COVID-19 lives inside Bats without causing the species harm, whereas it is much more dangerous inside a human. That is why novel viruses are the most dangerous. They do not *know* how to live inside a human body. They have evolved to live inside a different animal.

Tracing the phylogenic tree of COVID-19 is a retroactive look at its spread. It should not be used to close off borders retroactively, as [Trump is doing](https://www.wsj.com/articles/coronavirus-outbreak-prompts-trump-to-question-europe-travel-restrictions-11583971156) by closing off all travel from Europe.

However, tracing the tree will help us understand which regions have the more aggressive (and possible more lethal) form of the virus. This is suggestive of where government intervention and mitigation should be concentrated.
