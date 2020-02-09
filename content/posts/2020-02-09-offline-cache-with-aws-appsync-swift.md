---
template: post
title: Offline Cache with AWS AppSync (Swift)
slug: offline-cache-with-aws-appsync-swift
draft: false
date: 2020-02-09T13:53:09.381Z
description: >-
  AWS Amplify has great support for Querying and Mutating the offline cache.
  Here, I outline the quickest way to get set up with offline persistence for
  your iOS app.
category: Programming
tags:
  - Swift
  - AWS
---

## Setup

Setting up the offline cache is simple. You need to initialize the default `AWSAppSyncCacheConfiguration()` and add it as a parameter to your `AWSAppSyncClientConfiguration`.

To setup offline caching with your Swift application, add:

```swift
//  AppDelegate.swift

let cacheConfiguration = try AWSAppSyncCacheConfiguration()
let appSyncConfig = try AWSAppSyncClientConfiguration(appSyncServiceConfig: AWSAppSyncServiceConfig(),
      userPoolsAuthProvider: AWSMobileClient.default(),
      cacheConfiguration: cacheConfiguration)
```

## Cache Database

The offline caches for Mutations, Queries, and Subscriptions are stored as SQLite database files and named `offlineMutations.db`, `offlineQueries.db`, and `offlineSubscriptions.db`, respectively. When running the iOS simulator, you can find the offline caches in a similar directory to mine:

```/Users/Username/Library/Developer/CoreSimulator/Devices/6A9D3F43-2F02-4F8C-8CDE-1CE11ED89FE2/data/Containers/Data/Application/352073BC-AEEE-4A0C-9B78-A4BB7E3BA131/Library/Caches/appsync/```

It can be useful to view these files while debugging your application. It will help you understand how the offline cache works!

## Offline Persistence

The trickiest part is ensuring that users can go offline for days and still be able to perform queries, mutations, and subscriptions on data.

For this, Amplify includes `optimisticUpdates` for mutations. Here is an example pulled out of one of my applications:

```swift
func createOptimisticRoutine(routine: Routine, filter: ModelRoutineFilterInput) {
    let appSyncClient = (UIApplication.shared.delegate as! AppDelegate).appSyncClient
    appSyncClient?.perform(mutation: CreateRoutineMutation(input: CreateRoutineInput(id: routine.appsync_id, number: routine.number, title: routine.name, log: false, owner: routine.owner)), optimisticUpdate: { transaction in
        do {
            try transaction?.update(query: ListAllQuery(filter: filter, limit: 1000)) {
                (data: inout ListAllQuery.Data) in
                // Idempotent block
                var newState = data.listRoutines?.items?.filter { $0?.id != routine.appsync_id }
                newState?.append(ListAllQuery.Data.ListRoutine.Item(id: routine.appsync_id, title: routine.name, owner: routine.owner, number: routine.number))
                data.listRoutines?.items = newState
            }
        } catch {
            print("Error: Optimistic routine update failed.")
        }
    })
}
```

After you perform a mutation, you have the option to include an `optimisticUpdate` parameter. With this, you can update the results of an offline Query. Note that the block modifying the Query data *must* be **idempotent** – meaning that multiple executions of the same statement will not produce a different result. To accomplish this, we add the following line:
```swift
var newState = data.listRoutines?.items?.filter { $0?.id != routine.appsync_id }
````

You must also reference the Query request in the exact same way it is accessed. So if you access the Query with a filter, the filter (and limit) must be included in the transaction request like so:

```swift
try transaction?.update(query: ListAllQuery(filter: filter, limit: 1000)) {
```

## Review

AWS Amplify has great tools that allow you to write software that persists offline.

However, optimistically updating queries with nested items is where things can get tricky. If you have any questions, feel free to continue the conversation [@cartersprigings](https://twitter.com/cartersprigings).
