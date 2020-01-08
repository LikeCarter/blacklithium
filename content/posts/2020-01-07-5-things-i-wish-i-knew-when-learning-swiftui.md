---
template: post
title: 5 Things I Wish I Knew When Learning SwiftUI
slug: 5-things-i-wish-i-knew-when-learning-swiftui
draft: true
date: 2020-01-08T01:53:03.056Z
description: |
  1. Use bound variables to dismiss views and control navigation.
  2. The difference between `@State`, `@ObservableObject`, and `@Environment`.
  3. When do I use `@Published`?
  4. Properly dismiss a keyboard with a tap gesture.
  5. Use a proxy to validate TextField input.
category: Programming
tags:
  - SwiftUI
  - Programming
  - iOS
---
1. Use bound variables to dismiss views and control navigation.

The documentation is unclear on how to properly dismiss a Modal or View. Most discussions lead you to using the `PresentationMode` environment variable. However, this solution leads to issues rendering navigation titles. The best solution is to use a bound variable and the `isActive` parameter.

```swift
//  ContentView.swift

struct ContentView: View {
    @State var show: Bool = false

    var body: some View {
        return NavigationLink(destination: DetailView(show: self.$show), isActive: self.$show) {
            Button(action: {
                self.show = true
            }) {
                Text("Navigate")
            }
        }
    }
}
```

```swift
//  DetailView.swift

struct DetailView: View {
    @Binding var show: Bool

    var body: some View {
        Button(action: {
            self.show = false
        }) {
            Text("Dismiss")
        }
    }
}
```

2. The difference between `@State`, `@ObservableObject`, and `@Environment`.



3. When do I use `@Published`?



4. Properly dismiss a keyboard with a tap gesture.

```swift
//  ContentView.swift

struct DismissingKeyboard: ViewModifier {
    func body(content: Content) -> some View {
        content
            .onTapGesture {
                let keyWindow = UIApplication.shared.connectedScenes
                    .filter { $0.activationState == .foregroundActive }
                    .map { $0 as? UIWindowScene }
                    .compactMap { $0 }
                    .first?.windows
                    .filter { $0.isKeyWindow }.first
                keyWindow?.endEditing(true)
            }
    }
}

struct ContentView: View {
    @State private var text = ""
    var body: some View {
        TextField("Text", text: self.$text)
        .modifier(DismissingKeyboard())
    }
}
```

5. Use a proxy to validate TextField input.

```
//  ContentView.swift

struct TestView: View {

    @State private var positiveNumber: Int = 1

    private var positiveNumberProxy: Binding<String> {
        Binding<String>(
            get: {
                return String(self.positiveNumber)
            },
            set: {
                if let value = Int($0) {
                    if(value > 0) {
                        self.positiveNumber = value
                    }
                }
            }
        )
    }

    var body: some View {
        TextField("Text", text: self.positiveNumberProxy)
        .modifier(DismissingKeyboard())
    }
}
```
