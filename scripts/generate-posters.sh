#!/bin/bash
# generate-posters.sh
# Extracts the first frame from each project video as a compressed JPEG poster.
# Run once locally whenever a new video is added or replaced.
#
# Prerequisites: ffmpeg (brew install ffmpeg)
# Usage: bash scripts/generate-posters.sh

set -euo pipefail

PROJECTS_DIR="images/projects"

# Find all .mp4 files in the projects directory
for video in "$PROJECTS_DIR"/*.mp4; do
  [ -f "$video" ] || continue

  basename="${video%.mp4}"
  poster="${basename}-poster.jpg"

  if [ -f "$poster" ]; then
    echo "⏩  Skipping (already exists): $poster"
    continue
  fi

  echo "🖼️  Generating poster: $poster"
  ffmpeg -i "$video" -frames:v 1 -update 1 -q:v 2 -y "$poster" 2>/dev/null
done

echo ""
echo "✅  Done. Poster images:"
ls -lh "$PROJECTS_DIR"/*-poster.jpg 2>/dev/null || echo "  (none generated)"
