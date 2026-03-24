#!/bin/bash
set -e

# Static build script for GitHub Pages
# Temporarily excludes API routes and admin routes that cannot be statically exported

TEMP_DIR=".static-build-temp"
ROUTES_TO_EXCLUDE=(
  "app/api"
  "app/admin"
)

cleanup() {
  # Restore routes if they were moved
  for route in "${ROUTES_TO_EXCLUDE[@]}"; do
    route_name=$(basename "$route")
    if [ -d "$TEMP_DIR/$route_name" ]; then
      mv "$TEMP_DIR/$route_name" "$route"
    fi
  done
  rm -rf "$TEMP_DIR"
}

trap cleanup EXIT

echo "🔧 Preparing static build (excluding API routes)..."

# Create temp directory outside app/
mkdir -p "$TEMP_DIR"

# Move routes outside app directory
for route in "${ROUTES_TO_EXCLUDE[@]}"; do
  if [ -d "$route" ]; then
    route_name=$(basename "$route")
    mv "$route" "$TEMP_DIR/$route_name"
    echo "  ✓ Excluded: $route → $TEMP_DIR/$route_name"
  fi
done

# Run the build
echo "🏗️  Running Next.js static export..."
BUILD_TARGET=static npx next build

echo "✅ Static build complete! Output in 'out/' directory"
