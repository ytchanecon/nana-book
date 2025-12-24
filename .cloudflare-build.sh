#!/bin/bash
# .cloudflare-build.sh - Optimized build script for Nana's Book
set -e

# 1. Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# 2. Build the Jupyter Book
echo "Building the book..."
jupyter-book build .

# 3. Prepare the output directory
# Jupyter Book builds into _build/html
# We want:
# /index.html -> Landing Page (custom index.html)
# /intro.html -> Book Home (original intro.html)
# /assets/ -> Images for landing page

echo "Organizing files for deployment..."

# Ensure intro.html exists as the book home
if [ -f _build/html/index.html ] && [ ! -f _build/html/intro.html ]; then
    mv _build/html/index.html _build/html/intro.html
fi

# Fix internal links in the book:
# Most links to the 'Home' in sidebar/logo point to index.html.
# We need them to point to intro.html now.
echo "Fixing internal links..."
find _build/html -name "*.html" -exec sed -i 's/href="index.html"/href="intro.html"/g' {} +
find _build/html -name "*.html" -exec sed -i 's/href="#"/href="intro.html"/g' _build/html/intro.html 2>/dev/null || true

# Copy custom landing page to the root index.html
cp index.html _build/html/index.html

# Copy assets folder so images in landing page work
echo "Copying assets..."
mkdir -p _build/html/assets
cp -r assets/* _build/html/assets/ 2>/dev/null || true

echo "Build completed successfully!"
