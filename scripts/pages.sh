#!/usr/bin/env bash

cd demo
../node_modules/.bin/webpack
git init
git add .
git commit . -m "pages"
git remote add origin git@github.com:pie-framework/material-ui-calculator.git
git push --force origin master:gh-pages
rm -fr .git
