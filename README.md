# parsec-website

## Init

`yarn`

## Build

`gulp`

## Dev

`gulp dev`

You can use [livereload extendsion](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

## Making changes

`main.css`, `presale.css`, `main.js`, `presale.js` — generated files. All changes in this files will be overwritten by `gulp` or `gulp dev` commands. You should change files in `src` folder and use `gulp dev` for seeing your changes.

## Adding blog articles

Add new file `my-super-article.md` to `src/blog/content/`. Content of the file as follows:

```
---
template: post.html
title:    "Article title goes here"
date:     2018-03-28 00:00:00
image:    image-to-be-used-for-social-networks.png
---

Text of the article hoes here

```

Adjust filename, `title`, `date`, `image` and text.

- filename - will be used in article URL. E.g. `/blog/my-super-article`.
- `title` - article name. Shown on the article list page and on the article page.
- `date` - article publishing date. Shown on the article list page and on the article page.
Articles on the article list page are sorted by this date (latest first).
- `image` - name of the image file to be used for social network previews (`og:image`).
The file should be placed in `img/blog/`.
- text - text of the article in [Markdown format](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

Commit the file to github. Our CI server will do the rest and your article will be available
shortly at `parseclabs.org/blog/my-super-article`.
