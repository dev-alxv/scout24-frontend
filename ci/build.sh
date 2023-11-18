#!/bin/sh
if [ "$TRAVIS_BRANCH" = "production" ];
then
  npm run ci:build
else
  npm run ci:build-sandbox
fi
tar -cvzf scout24-frontend.tgz -C dist immoviewer-virtual-tours
