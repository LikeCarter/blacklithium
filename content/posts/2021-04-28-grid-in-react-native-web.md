---
template: post
title: A simple, responsive grid in React Native Web
slug: grid-in-react-native-web
draft: false
date: 2021-04-28T20:19:10.804Z
description: Creating a simple, responsive grid in react native web.
category: React Native Web
tags:
  - React
  - React Native
  - React Native Web
---

I had a few requirements for this project:

- No screen size, dimension, or rotation listeners
- Works across all screen sizes
- Ideally only css

Turns out, there is a way to meet all these requirements with flexbox.

Create the number of columns you wish to see on the _maximum_ size screen. In this case, I created 3.

Here are the styles. The key is to set `flexWrap` to `wrap`.

```tsx
const styles = StyleSheet.create({
  grid: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  col: {
    flexGrow: 1,
    flexDirection: "column",
  },
});
```

```tsx
<View style={styles.grid}>
  <View style={styles.col}>
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
  </View>
  <View style={styles.col}>
    <Card></Card>
    <Card></Card>
  </View>
  <View style={styles.col}>
    <Card></Card>
    <Card></Card>
  </View>
</View>
```

Voila!