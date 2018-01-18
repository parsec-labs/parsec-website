#!/usr/bin/env bash
#
# Copy Jekyll site to S3 bucket
#
####################################

set -e # halt script on error
set -v
set -o pipefail

echo "Building site..."
JEKYLL_ENV=production bundle exec jekyll build

echo "Removing .html extension"
find _site/ -type f ! -iname 'index.html' -iname '*.html' -print0 | while read -d $'\0' f; do mv "$f" "${f%.html}"; done

echo "Copying files to server..."
aws s3 sync _site/ $PRODUCTION_BUCKET --size-only --exclude "*" --include "*.*" --delete --acl public-read

echo "Copying files with content type..."
aws s3 sync _site/ $PRODUCTION_BUCKET --size-only --content-type text/html --exclude "*.*" --delete --acl public-read

if [ "$DISTRIBUTION_ID" ]; then
  echo "Invalidating CloudFront distribution..."
  aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths '/*'
fi
