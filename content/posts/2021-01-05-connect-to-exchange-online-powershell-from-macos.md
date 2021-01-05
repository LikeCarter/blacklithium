---
template: post
title: Connect to Exchange Online PowerShell From MacOS
slug: Connect-to-Exchange-Online-PowerShell-From-MacOS-For-Good
draft: false
date: 2021-01-05T17:14:44.173Z
description: >-
  Get that pesky EXOP to work on MacOS. Use a docker image instead of
  downgrading something.
category: Powershell
tags:
  - Powershell Docker
---

If you are here, you're probably getting this pesky error:

```ps
New-PSSession: This parameter set requires WSMan, and no supported WSMan client library was found. WSMan is either not installed or unavailable for this system.
```

And googl'ng this problem tells you to install old version of openssl. Which didn't work for me.

So here we are. Just use docker.

```bash
docker run  \
  -v $HOME:$HOME \
  -v $HOME/.local/share/powershell/:/root/.local/share/powershell/  \
  -v $HOME/.cache/powershell/:/root/.cache/powershell/  \
  -it mcr.microsoft.com/azure-powershell pwsh
```

And optionally alias:

```bash
alias pwsh="docker run -v $HOME:$HOME -v $HOME/.local/share/powershell/:/root/.local/share/powershell/ -v $HOME/.cache/powershell/:/root/.cache/powershell/ -it mcr.microsoft.com/azure-powershell pwsh"
```
