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

# 3. Handle entry point
# We want the landing page to be the first thing people see.
# But we don't want to break Jupyter Book's internal structure.

echo "Organizing files..."

# Move the book to a subdirectory 'book/'
mkdir -p _build/html/book
mv _build/html/* _build/html/book/ 2>/dev/null || true

# Copy our custom index.html to the root
cp index.html _build/html/index.html

# Copy assets to the root so index.html can find them
cp -r assets _build/html/ 2>/dev/null || true

echo "Build complete! Entry: /index.html (Landing) -> /book/index.html (Jupyter Book)"
