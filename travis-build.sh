#!/bin/bash

set -e

rev=$(git rev-parse --short HEAD)

bundle exec rake docs docs:tidy

git config --global user.email "baenej@gmail.com"
git config --global user.name "Travis on behalf Hirofumi Wakasugi"

git remote add upstream "https://$GH_TOKEN@github.com/crystal-jp/ja.crystal-lang.org"
git fetch upstream
git reset upstream/gh-pages

git add -A docs/
git commit -m "rebuild docs at ${rev} [ci skip]" || true
git push -q upstream HEAD:gh-pages
