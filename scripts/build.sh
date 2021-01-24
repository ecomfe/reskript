#!/bin/bash
set -e
export PATH=$NODEJS_BIN_LATEST:$YARN_BIN_LATEST:$PATH
export PATH=$PATH:$(yarn bin)

echo "node: $(node -v)"
echo "npm: $(npm -v)"
echo "yarn: $(yarn -v)"
echo "tsc: $(tsc -v)"

yarn ci
