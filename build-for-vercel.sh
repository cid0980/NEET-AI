#!/bin/bash
# Vercel build script
# Replaces __OR_KEY__ placeholder with OPENROUTER_KEY environment variable

# Copy the main file
cp neet-ai-tutor.html index.html

# Replace the placeholder with the actual key
if [ -n "$OPENROUTER_KEY" ]; then
  sed -i "s/__OR_KEY__/$OPENROUTER_KEY/g" index.html
  echo "Tutor key injected successfully"
else
  echo "ERROR: OPENROUTER_KEY environment variable not set"
  exit 1
fi

# Copy service worker
cp sw.js .
