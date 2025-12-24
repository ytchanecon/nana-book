#!/bin/bash
# .cloudflare-build.sh - Correct fix for Nana's Book
set -e

# 1. Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# 2. Build the Jupyter Book
echo "Building the book..."
jupyter-book clean .
jupyter-book build .

# 3. Handle entry point with a Staging Directory approach
echo "Organizing files..."

# Create a staging directory - FRESH START
rm -rf _build/site
mkdir -p _build/site/book

# Move the generated book content to the subfolder in staging
mv _build/html/* _build/site/book/

# CRITICAL FIX: Ensure book/index.html exists
if [ -f "_build/site/book/intro.html" ]; then
    echo "Found intro.html, copying to index.html..."
    cp _build/site/book/intro.html _build/site/book/index.html
fi

# Copy our custom landing page to the staging root
echo "Copying cover.html to index.html..."
cp cover.html _build/site/index.html

# Copy custom 404 page to the staging root
if [ -f "404.html" ]; then
    echo "Copying 404.html..."
    cp 404.html _build/site/404.html
fi

# Copy assets to the staging root
echo "Copying assets..."
cp -r assets _build/site/

# 4. Finalize
echo "Finalizing build..."
rm -rf _build/html
mv _build/site _build/html

echo "Build complete! Structure:"
ls -R _build/html
