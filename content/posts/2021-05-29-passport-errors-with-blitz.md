---
template: post
title: Passport errors with Blitz!
slug: third-party-login-blitz
draft: false
date: 2021-05-29T14:46:49.035Z
description: >-
  When using a reverse-proxy with Nginx, it is important to set the
  x-forwarded-proto header properly.
category: BlitzJS
tags:
  - Typescript
  - BlitzJS
  - React
---
When using a reverse-proxy with `nginx` and `blitz`, you may be getting some obscure errors in your `passportjs` handlers.

In my case, I was using Dokku to manage TLS in production, and getting obscure failure messages:

```
Error: Your 'azuread-openidconnect' passport verify callback returned empty data. Ensure you call 'done(null, {publicData: {userId: 1}})' along with any other publicData fields you need)
```

The solution is to add `secureProxy: true` to your `passportjs` strategy. This was because the `x-forwarded-proto` wasn't being set properly.

*This took me a while to figure out, so I hope the links below help!*

Issue is solved here: [https://github.com/blitz-js/blitz/issues/966](https://github.com/blitz-js/blitz/issues/966)

Commit fix is here: [https://github.com/blitz-js/blitz/pull/1033/commits/ca3424f336d164ce41fa81e84594a7410cad718f](https://github.com/blitz-js/blitz/pull/1033/commits/ca3424f336d164ce41fa81e84594a7410cad718f)

Documentation on it is here: [https://blitzjs.com/docs/passportjs#1-add-the-passport-js-api-route](https://blitzjs.com/docs/passportjs#1-add-the-passport-js-api-route)
