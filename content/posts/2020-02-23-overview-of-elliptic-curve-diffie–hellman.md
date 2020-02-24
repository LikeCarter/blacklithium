---
template: post
title: Overview of Elliptic-curve Diffie–Hellman
slug: overview-of-elliptic-curve-diffie–hellman
draft: false
date: 2020-02-24T00:49:19.387Z
description: >-
  A brief primer on Elliptic Curve Cryptography (ECC) and its implementation
  with Diffie–Hellman. Since RSA and Diffie-Hellman could be broken within 5
  years, learning about ECC may be useful.
category: Programming
tags:
  - Programming
  - Cryptography
---
## Overview

An elliptic curve has the form:

$$ y^2 = x^3 + ax + b $$

Alice and Bob want to share a secret message. The two parties agree to use ECDH with the same elliptic curve and a random starting point $G$.

$$ y^2 = x^3 - 3x + 10 $$

This curve is plotted below. You can see that it is symmetrical about the x-axis.

<img style="width: 100%" alt="Elliptic curve" src="https://s3.amazonaws.com/carter.sprigings.com/ec.png
"/>

For practical reasons this curve needs to be finite. A large prime modulus is used to keep the curve capped within a certain range.

$$ (y^2 - x^3 - 3x + 10)(\bmod\ 281) = 0 $$

<img style="width: 100%" alt="Elliptic curve taurus mapping" src="https://s3.amazonaws.com/carter.sprigings.com/taurus.png
"/>

The resulting equation can be plotted as a taurus. Notice how it is still symmetrical about the x-axis. You can view the interactive taurus here. You can move the black dot in the center to see how the finite field is mapped.

Next, Alice and Bob choose their respective private numbers $\alpha$ and $\beta$. These are prime. Alice multiplies $G$ by $\alpha$ to arrive at a new point $A$. Bob multiplies $G$ by $\beta$ to arrive at a new point $B$. $$ A = \alpha G B = \beta G $$ Alice and Bob then exchange their public points $A$ and $B$ and multiply them by their private numbers.

$$ S = \alpha B = \alpha(\beta G) = \beta A = \beta(\alpha G) $$

They now have an exclusive secret key $S$.

## Security
The ECC (and the RSA) cryptosystem is dependent on a trapdoor function. This function describes an operation that is trivial to perform yet difficult to calculate in reverse.

In the RSA cryptosystem, the trapdoor function is multiplication of prime numbers. While you can factor 2183 with relative ease, imagine the product is a 1024-bit binary number.

For ECC, due to the $\bmod\ p$ operation performed every time the generator is applied to a point on the curve, deducing how many times the law was applied before reaching the end point is nearly impossible for well-chosen curves.

This is known as the discrete logarithm problem (DLP) for elliptic curves. If given points $P$ and $Q$ on an elliptic curve $E$, what is $k$ such that $kP = Q$? The smallest integer solution $k$ to this problem is then called the discrete logarithm of $Q$ with respect to $P$. This is denoted by $k = logP (Q)$. `
