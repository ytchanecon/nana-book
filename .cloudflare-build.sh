#!/bin/bash
# .cloudflare-build.sh - Correct fix for Nana's Book
set -e

# 1. Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# 2. Build the Jupyter Book
echo "Building the book..."
# Clean previous builds to ensure fresh start
jupyter-book clean .
jupyter-book build .

# 3. Handle entry point with a Staging Directory approach
# This avoids "moving directory into itself" errors.

echo "Organizing files..."

# Create a staging directory
mkdir -p _build/site/book

# Move the generated book content (from _build/html) to the subfolder in staging
# We use find/cp or just mv. mv is faster.
# Note: _build/html/* includes the book content.
mv _build/html/* _build/site/book/

# Copy our custom landing page to the staging root
# We use cover.html as the source for index.html
cp cover.html _build/site/index.html

# Copy assets to the staging root (for the landing page to use)
cp -r assets _build/site/

# 4. Finalize
# Replace the original output directory with our staged version
rm -rf _build/html
mv _build/site _build/html

echo "Build complete!"
echo "Structure:"
echo "  /index.html       -> Custom Landing Page (from cover.html)"
echo "  /assets/          -> Assets for Landing Page"
echo "  /book/index.html  -> Jupyter Book Intro"
