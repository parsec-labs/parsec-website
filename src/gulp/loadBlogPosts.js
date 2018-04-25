const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

module.exports = async function loadBlogPosts(srcPath) {
  const files = (await readdir(srcPath)).filter(fn => fn !== 'index.md');
  const contents = await Promise.all(
    files.map(fn => readFile(path.join(srcPath, fn), 'utf-8'))
  )

  return contents.map(fm).map(({ attributes }) => attributes).map((attrs, i) => Object.assign(attrs, {
    date: new Date(attrs.date),
    path: `/${files[i].split('.')[0]}`,
  }));
}
