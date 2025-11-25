#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -euo pipefail

echo "==> Ensuring Git LFS is configured"
git lfs install --local

echo "==> Fetching large media via Git LFS"
git lfs fetch --all
git lfs checkout

echo "==> Installing dependencies"
npm install

echo "==> Running production build"
npm run build

