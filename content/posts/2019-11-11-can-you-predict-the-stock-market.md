---
template: post
title: Can you predict the stock market?
slug: can-you-predict-the-stock-market
draft: true
date: 2019-11-11T22:15:13.746Z
description: >-
  Not particularly accurate two-dimensional simulation of 262144 bodies
  interacting gravitationally on a periodic 256 \times 256256×256 grid.
category: Physics
tags:
  - Physics
  - Space
---
``

<script>alert('test')</script>



<div id="observablehq-72849680"></div>

<script type="module">

import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";

import define from "https://api.observablehq.com/@rreusser/2d-n-body-gravity-with-poissons-equation.js?v=3";

const inspect = Inspector.into("#observablehq-72849680");

(new Runtime).module(define, name => (name === "canvas") && inspect());

</script>
