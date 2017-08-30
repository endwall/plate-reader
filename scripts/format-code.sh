#!/bin/bash
set -e
(./scripts/list-javascript.sh | xargs ./node_modules/.bin/js-beautify -r) | (grep -v unchanged || true)
