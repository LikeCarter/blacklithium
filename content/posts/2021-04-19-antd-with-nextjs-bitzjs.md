---
template: post
title: Ant Design + BlitzJS
slug: antd-with-nextjs-bitzjs
draft: false
date: 2021-01-30T20:19:10.804Z
description: Adding Ant Design (antd) to a BlitzJS (blitzjs) or NextJS (next) project.
category: NextJS
tags:
  - NextJS
  - BlitzJS
  - Typescript
---

Ant Design is my go-to frontend framework for large React projects. It is definitely the most feature complete framework out there. (with a few drawbacks, namely accessibility and extensibility).

The only issue is it doesn't always play nice with NextJS. At the time of writing this, `next` is on version `10.1.3` and `antd` is on `4.5.1`.

## BlitzJS

With BlitzJS, it's quite easy with the recipe:

`blitz install timetrackify/blitz-recipe-antd`

## NextJS

If you are using NextJS, you will need to `yarn add next-plugin-antd-less` and modify `next.config.js` and `babel.config.js`.

```typescript
// next.config.js
const withAntdLess = require("next-plugin-antd-less");

module.exports = (_, { defaultConfig }) =>
  withAntdLess({
    ...defaultConfig,
    webpack: (config, _) => {
      return config;
    },
  });
```

```typescript
// babel.config.js
module.exports = {
  presets: ["next/babel"],
  plugins: [["import", { libraryName: "antd", style: true }]],
};
```

### Tip

To reduce the file size of `antd`, I'd suggest using the `moment-locales-webpack-plugin` to get a sweet, sweet bundle size reduction. Antd uses moment.js which is a pretty hefty boy.