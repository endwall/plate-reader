#!/bin/bash

set -e

echo 'running unit tests'
./node_modules/.bin/istanbul cover node_modules/.bin/_mocha "test/**/*.test.js" -- --reporter list --invert -g '[Ii]ntegration'
./node_modules/.bin/istanbul check-coverage

echo 'running integration tests'
NODE_ENV=dev_local ./node_modules/.bin/mocha "test/**/*.test.js" --reporter list -g '[Ii]ntegration'