#!/usr/bin/env bash
# Builds the web screenshots from the app repo's media folder (../looper_player/media by default).
#
# The phone screenshots are 1080x1920 renders of a phone on a dark backdrop. We crop to the phone body
# and cut its rounded corners out with an alpha mask so it sits on any background.
set -euo pipefail

cd "$(dirname "$0")/.."
MEDIA=${1:-../looper_player/media}
OUT=src/assets/shots
mkdir -p "$OUT"

# now_playing + lyrics feed og-image.sh; analyze is shown in the Analyze section.
for name in now_playing lyrics analyze; do
  magick "$MEDIA/screenshots/$name.png" -crop 711x1516+184+201 +repage \
    \( +clone -alpha extract -fill black -colorize 100 -fill white -draw "roundrectangle 1,1 709,1514 74,74" -blur 0x0.6 \) \
    -alpha off -compose CopyOpacity -composite -filter Lanczos -resize x1100 \
    -define webp:alpha-quality=100 -quality 86 -define webp:method=6 "$OUT/phone-$name.webp"
  echo "  phone-$name.webp"
done

for name in analyze; do
  magick "$MEDIA/gallery/$name.png" -filter Lanczos -resize '1600x>' -quality 84 -define webp:method=6 "$OUT/desk-$name.webp"
  echo "  desk-$name.webp"
done

ls -la "$OUT" | grep -v '^total'
