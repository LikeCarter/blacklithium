---
template: post
title: Google Cloud SDK on Apple Silicon (M1)
slug: gcloud-sdk-m1-silicon
draft: false
date: 2021-01-30T20:19:10.804Z
description: Another Apple Silicon workaround!
category: M1
tags:
  - M1
---
Another short but effective Apple Silicon M1 workaround!

Download SDK from https://cloud.google.com/sdk/docs/quickstart.

Use the following command to install properly:

```sh
./google-cloud-sdk/install.sh --override-components core
```
