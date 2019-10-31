# A personal blog

Built with Gatsby.

You can see this site running here [carter.sprigings.com](https://carter.sprigings.com).

## Development

Navigate into the site’s directory and start it up.

```sh
gatsby develop
```

Site is now running at `http://localhost:8000`!

Note: There is asecond link: `http://localhost:8000/___graphql`. This is a tool to experiment with querying data. Information on this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).

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