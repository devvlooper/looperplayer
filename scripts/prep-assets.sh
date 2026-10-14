#!/usr/bin/env bash
# Regenerates the logo, decoration and favicon in src/assets + public from the originals in design/.
# App screenshots come from the app repo instead: see scripts/prep-screens.sh.
set -euo pipefail

cd "$(dirname "$0")/.."
SRC=design
OUT=src/assets
mkdir -p "$OUT" public

echo "Logo + decoration"
magick "$SRC/Mask group.png"       -strip PNG8:"$OUT/logo.png" 2>/dev/null || cp "$SRC/Mask group.png" "$OUT/logo.png"
magick "$SRC/Mask group (2).png"   -strip "$OUT/deco.png"
magick "$SRC/Vector.png" -filter Lanczos -resize 200% -strip "$OUT/linux.png"

echo "Favicon"
magick "$SRC/Mask group.png" -background none -gravity center -resize 56x56 -extent 64x64 "public/favicon.png"

echo
ls -la "$OUT" public | grep -v '^total'
