---
template: post
title: Carthage on Apple Silicon M1
slug: carthage-on-apple-silicon
draft: false
date: 2021-01-28T19:10:46.694Z
description: 2 Steps. Build it from source. And link it!
category: M1
tags:
  - M1
---
2 Steps. Build it from source. And link it!

```sh
brew install carthage -s
```

```sh
sudo ln -s /opt/homebrew/Cellar/carthage/0.36.1/bin/carthage /usr/local/bin/carthage
```

When using carthage, you will need to build most things from source (things don't ship with Apple Silicon binaries yet). Use this command to build from source:

```sh
carthage update --no-use-binaries
```
