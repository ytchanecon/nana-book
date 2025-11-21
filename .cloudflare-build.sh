#!/bin/bash
set -e

# Install dependencies
pip install -r requirements.txt

# Build the Jupyter Book
jupyter-book build .

# The custom index.html should serve as landing page
# Jupyter Book content will be in _build/html/
# Copy custom index.html to build output
cp index.html _build/html/landing.html

# Rename the jupyter-book generated index to book.html
mv _build/html/index.html _build/html/book.html

# Copy our custom index as the main index
cp index.html _build/html/index.html

# Update link in custom index to point to book.html instead of intro.html
sed -i 's|intro\.html|book.html|g' _build/html/index.html

