---
template: post
title: Getting SRTP/TLS working with Yeastar S100 and a VOIP (SIP) Trunk
slug: srtp-yeastar-voipms
draft: false
date: 2021-01-17T21:05:23.632Z
description: SIP phone encryption. Who even cares?
category: SIP
tags:
  - PBX SRTP TLS
---
I'm starting to make these blog posts after I can't find help for a tedious problem (bug?). After spending hours figuring it out, I feel like a small blog post to save someone else's time is the right thing to do. Now pay it forward!

This post is really a checklist:

1. Make sure **Enable SRTP** is checked in the trunk settings.
2. Make sure the port is set to **5061**, and the protocol is **TLS** in the trunk settings.
3. Make sure **Use Encryption** is checked on your VOIP portal (in this case VOIP.ms), under advanced (for every account you wish to use it for).
4. Finally, the crux was ensuring that **Enable TLS** is checked under General > SIP on the PBX. This shouldn't be necessary, but it seems to be a bug.
5. And don't forget to restart the PBX!
