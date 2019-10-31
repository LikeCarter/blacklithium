# A personal blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/168a1da6-3a31-4320-9ba5-855f56686d55/deploy-status)](https://app.netlify.com/sites/heuristic-beaver-df914c/deploys)

Built with Gatsby.

You can see this site running at [carter.sprigings.com](https://carter.sprigings.com).

## Development

Navigate into the site’s directory and start it up.

```sh
gatsby develop
```

Site is now running at `http://localhost:8000`!

Note: There is a second link: `http://localhost:8000/___graphql`. This is a tool to experiment with querying data. Information on this tool can be found in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).

## Folder Structure

```
└── content
    ├── pages
    └── posts
└── static
    ├── admin
    └── media
└── src
    ├── assets
    │   └── scss
    │       ├── base
    │       └── mixins
    ├── cms
    │   └── preview-templates
    ├── components
    │   ├── Feed
    │   ├── Icon
    │   ├── Layout
    │   ├── Page
    │   ├── Pagination
    │   ├── Post
    │   │   ├── Author
    │   │   ├── Comments
    │   │   ├── Content
    │   │   ├── Meta
    │   │   └── Tags
    │   └── Sidebar
    │       ├── Author
    │       ├── Contacts
    │       ├── Copyright
    │       └── Menu
    ├── constants
    ├── templates
    └── utils
```

## Credit
This blog uses [Lumen](https://github.com/alxshelepenok/gatsby-starter-lumen), a minimal, lightweight and mobile-first starter for Gatsby.