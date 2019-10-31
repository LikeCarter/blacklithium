---
template: post
title: Manipulating Google Search rankings with XSS
slug: /posts/manipulating-google-search-rankings-with-xss/
draft: false
date: 2019-10-31T23:46:37.121Z
description: >-
  Googlebot is based on Google Chrome version 41 (2015), and therefore it has no
  XSS Auditor, which later versions of Chrome use to protect the user from XSS
  attacks. Many sites are susceptible to XSS Attacks, where the URL can be
  manipulated to reflect unsanitized Javascript code.
category: Hacking
tags:
  - Programming
  - Hacking
  - XSS
  - SEO
---
## The cause

While new versions of Google Chrome have an XSS Auditor, which refuses to load pages with identified XSS, Googlebot is based on a vulnerable version of chrome – Google Chrome version 41 (2015). 

Chrome version 41 has no XSS Auditor. Many sites are susceptible to XSS Attacks, where the URL can be manipulated to inject unsanitized Javascript code into the site.



## The result

This manipulation can include injecting links (and for a greater effect: canonicals), which Googlebot will follow to crawl the destination site. Furthermore, Google has confirmed that Javascript links are treated identically to HTML links

This presumably manipulates PageRank, but I’ve not tested that for fear of impacting real sites rankings.



## XSS Attacks

There are various types of cross-site scripting (XSS) attack; we are interested in the situation where Javascript code inside the URL is included inside the content of the page without being sanitized (often referred to as reflection). This can result in the Javascript code being executed in the user’s browser (even though the code isn’t intended to be part of the site).

A simple XSS query is shown below:

```
https://foo.com/stores/?page=<script>alert('hello')</script>
```

However, most sites are clever and will sanitize anything in \<script\> tags. Not to worry, millions of sites are still vulnerable. For example, Bootstrap 3.3.7 has the following XSS vulnerability:

```
<button data-toggle=”collapse” data-target=”<img src=x onerror=alert('hello')>”>Test</button>
```

If one encoded this to a URL-friendly format:

```
%3Cbutton%20data-toggle%3D%E2%80%9Dcollapse%E2%80%9D%20data-target%3D%E2%80%9D%3Cimg%20src%3Dx%20onerror%3Dalert%2811111%29%3E%E2%80%9D%3ETest%3C%2Fbutton%3E
```

You could substitute it as the following parameter:

```
https://foo.com/stores/?page=%3Cbutton%20data-toggle%3D%E2%80%9Dcollapse%E2%80%9D%20data-target%3D%E2%80%9D%3Cimg%20src%3Dx%20onerror%3Dalert%2811111%29%3E%E2%80%9D%3ETest%3C%2Fbutton%3E
```



## More dangerous attack vectors

Redirecting people to a malicious checkout, or directing visitors to a competing product  would be crawled and indexed by Google. This content could even drive featured snippets and appear directly in the search results. Firefox doesn’t yet have adequate XSS protection, so these pages would load for Google users searching with Firefox.



## Defence

Approximately 18 million websites use Bootstrap. Of these, almost every version is plagued with [XSS vulnerabilities](https://snyk.io/vuln/npm:bootstrap) of some kind. While some of these XSS vulnerabilities are more severe than others, it is imperative to keep Bootstrap up to date.

Simply put, keep all of your web frameworks (and libraries) up to date.



## Disclosure

This issue has been reported to Google by [TomAnthonySEO](https:/www.twitter.com/TomAnthonySEO) back in November 2018. They have not confirmed the issue from their side or made any headway addressing it.
