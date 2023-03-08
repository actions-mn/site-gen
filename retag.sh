#!/bin/bash

if [ -z "$1" ]
then
  echo "No tag argument supplied. Exit."
  exit 1
fi

echo "Do re-tag for $1"
# https://stackoverflow.com/a/8044605/902217

# Delete the tag on any remote before you push
git push origin :refs/tags/$1

# Replace the tag to reference the most recent commit
git tag -f $1

# Push the tag to the remote origin
git push origin main --tags
