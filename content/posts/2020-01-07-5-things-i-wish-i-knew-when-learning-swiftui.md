---
template: post
title: 5 Things I Wish I Knew When Learning SwiftUI
slug: 5-things-i-wish-i-knew-when-learning-swiftui
draft: true
date: 2020-01-08T01:53:03.056Z
description: >
  1. Use bound variables to dismiss views and control navigation.

  2. The difference between `@State`, `@ObservableObject`, and
  `@EnvironmentObject`.

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

2. The difference between `@State`, `@ObservableObject`, and `@EnvironmentObject`.

`@State` is best used for a value that is applicable to one or two views. It causes an automatic refresh of the view when it changes. The variable must be manually passed from a parent to a child view. If you need to allow a child view to update the parent view's `@State` variable, use the `@Binding` wrapper. For example:

```swift
\\  ParentView.swift

struct ParentView: View {
    @State var toggle: Bool = false
    var body: some View {
        Text("\(toggle)")
        ChildView(toggle: self.$toggle)
    }
}
```

```swift
\\  ChildView.swift

struct ChildView: View {
    @Binding var toggle: Bool
    var body: some View {
        Button({
          self.toggle = !self.toggle
        }) {
          Text("Toggle")
      }
    }
}
```

`@ObservableObject` is best used for a class (containing one or more values) that may or may not need to cause a refresh of the view when it changes.

`@EnvironmentObject` is best used 

3. When do I use `@Published`?

The property wrapper `@Published` is an *opt-in* wrapper designed for use within an `ObservableObject`. All views using a variable wrapped with `@Published` are refreshed upon any change.

For example, the following code does **not** propagate changes to the `name` variable:

```swift
\\  ContentView.swift

class Object: ObservableObject {
    var name: String
}

struct ContentView: View {
    private var object = Object(name: "Example")
    var body: some View {
        Text("\(object.name)")

    }
}
```

Below, we can see that using the @Published wrapper will allow changes to propagate upon a button press.

```

```swift
\\  ContentView.swift

class Object: ObservableObject {
    @Published var name: String
}

struct ContentView: View {
    private var object = Object(name: "Example")
    var body: some View {
        Text("\(object.name)")

    }
}
```

However, when many views access an `ObservableObject`, **performance can quickly degrade**. It is important to mark only necessary variables with `@Published`. In more extreme cases, it is possible to implement a custom Publisher / Subscriber system to filter for when a view should update.

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
