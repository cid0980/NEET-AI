#!/bin/bash
# Build script for Vercel
# Vercel will run this and replace __OR_KEY__ with the OPENROUTER_KEY env var

cp neet-ai-tutor.html index.html
sed -i "s/__OR_KEY__/$OPENROUTER_KEY/g" index.html
