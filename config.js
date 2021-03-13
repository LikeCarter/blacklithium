'use strict';

module.exports = {
  url: 'https://carter.sprigings.com',
  pathPrefix: '/',
  title: 'Carter Sprigings',
  subtitle: 'Personal blog of Carter Sprigings.',
  copyright: '© Carter Sprigings ' + (new Date()).getFullYear(),
  disqusShortname: '',
  postsPerPage: 4,
  googleAnalyticsId: 'UA-57619073-6',
  useKatex: true,
  menu: [
    {
      label: 'Blog',
      path: '/'
    },
    {
      label: 'About',
      path: '/pages/about'
    },
    {
      label: 'Tags',
      path: '/tags'
    }
  ],
  author: {
    name: 'Carter Sprigings',
    photo: '/photo.jpg',
    bio: 'Personal blog. Working on Octoflock!',
    contacts: {
      email: 'carter@sprigings.com',
      twitter: 'cartersprigings',
      github: 'likecarter',
      linkedin: 'carter-sprigings',
    }
  }
};