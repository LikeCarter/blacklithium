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
An elliptic curve has the form:
$$
y^2 = x^3 + ax + b
$$
Alice and Bob want to share a secret message. The two parties agree to use ECDH with the same elliptic curve and a **random** starting point ${tex`G`}.
${tex.block`
y^2 = x^3 - 3x + 10
`}
This curve is plotted below. You can see that it is symmetrical about the x-axis.

Since RSA and Diffie-Hellman could be broken within 5 years, learning about ECC is useful!
