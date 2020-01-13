---
template: post
title: 5 Things I Wish I Knew When Learning SwiftUI
slug: 5-things-i-wish-i-knew-when-learning-swiftui
draft: false
date: 2020-01-08T01:53:03.056Z
description: >
  SwiftUI is a relatively new extension of Swift, and its documentation is
  sometimes inadequate. Here I try to describe some important knowledge and
  common pitfalls I wish I knew before starting out.
category: Programming
tags:
  - SwiftUI
  - Programming
  - iOS
---
## 1. Use bound variables to dismiss views and control navigation.

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

## 2. The difference between @State, @ObservableObject, and @EnvironmentObject.

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

`@ObservableObject` is best used for a class (containing one or more values) that conforms to `ObservableObject`. The `@Published` wrapper is used to indicate a member variable should refresh a view upon being set. The object must be manually passed from a parent to a child view. An example is shown in #3. 

`@EnvironmentObject` is also used with objects that conform to `ObservableObject`. But **it removes the need to manually pass the object from a parent to a child view.** Simply put, it is a simpler and more convenient way to update state across many views. However, when navigating, using a `NavigationLink` or showing a modal, the object must be passed once again.

For example:

```swift
\\  ParentView.swift

class Object: ObservableObject {
    var toggle: Bool = false
}

struct ParentView: View {
    var object: Object = Object()

    var body: some View {
        Text("\(self.object.toggle)")
        ChildView().environmentObject(self.object)
      }
    }
}
```

```swift
\\  ChildView.swift

struct ContentView: View {
    @EnvironmentObject var object: Object

    var body: some View {
        Button({
          self.object.toggle = !self.object.toggle
        }) {
          Text("Toggle")
      }
    }
}
```

## 3. When do I use @Published?

As little as possible. The property wrapper `@Published` is an _opt-in_ wrapper designed for use within an `ObservableObject`. All views using a variable wrapped with `@Published` are refreshed upon any change.

For example, the following code does **not** propagate changes to the `toggle` variable:

```swift
\\  ContentView.swift

class Object: ObservableObject {
    var toggle: Bool
}

struct ContentView: View {
    private var object = Object(toggle: false)
    var body: some View {
        Text("\(object.toggle)")
        Button({
          self.object.toggle = !self.object.toggle
        }) {
          Text("Toggle")
        }
    }
}
```

Below, we can see that using the `@Published` wrapper will allow changes to propagate upon a button press.

```swift
\\  ContentView.swift

class Object: ObservableObject {
    @Published var toggle: Bool
}

struct ContentView: View {
    private var object = Object(toggle: false)
    var body: some View {
        Text("\(object.toggle)")
        Button({
            self.object.toggle = !self.object.toggle
        }) {
            Text("Toggle")
        }
    }
}
```

However, when many views access an `ObservableObject`, **performance can quickly degrade**. It is important to mark only necessary variables with `@Published`. In more extreme cases, it is possible to implement a custom Publisher / Subscriber system to filter for when a view should update. This will improve performance.

## 4. Properly dismiss a keyboard with a tap gesture.

Users expect to dismiss a keyboard prompt by tapping the outside of an input. To enable this in SwiftUI, I have found the following solution works the best:

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

## 5. Use a proxy to validate TextField input.

Using a proxy is an excellent tool to filter input from a TextField. It is possible to restrict input length, cast the input to a different type, or match the input to a pattern in realtime. Here we filter so that the input can only be positive:

```swift
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
