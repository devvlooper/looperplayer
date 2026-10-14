#!/usr/bin/env bash
# Builds public/og.png (1200x630), the link preview for social sites and chat apps.
set -euo pipefail
cd "$(dirname "$0")/.."
FONTS=${1:-../looper_player/assets/fonts}
S=src/assets/shots
tmp=$(mktemp -d)
magick -size 1200x630 xc:'#151515' \
  \( -size 1200x630 xc:none -fill 'rgba(206,245,0,0.6)' -draw 'ellipse 600,-60 760,250 0,360' -blur 0x110 \) -composite \
  -depth 8 "$tmp/bg.png"
magick "$S/phone-now_playing.webp" -resize x520 "$tmp/p1.png"
magick "$S/phone-lyrics.webp" -resize x560 "$tmp/p2.png"
magick "$tmp/bg.png" \
  \( "$tmp/p1.png" -background none -rotate -6 \) -geometry +700+95 -composite \
  \( "$tmp/p2.png" -background none -rotate 5 \) -geometry +900+60 -composite \
  \( src/assets/logo.png -resize x56 \) -geometry +72+92 -composite \
  -font "$FONTS/plus_jakarta_sans/PlusJakartaSans-ExtraBold.ttf" -fill white -pointsize 64 \
  -annotate +72+250 'Made for the music' -annotate +72+325 'you already own.' \
  -font "$FONTS/dm_sans/DMSans-Regular.ttf" -fill '#ffffffb0' -pointsize 28 \
  -annotate +72+400 'Offline music player for Android & Linux' -annotate +72+440 'with word-synced lyrics. Free, no ads.' \
  -font "$FONTS/dm_sans/DMSans-Bold.ttf" -fill '#d8ff00' -pointsize 26 -annotate +72+530 'looperplayer.vercel.app' \
  -depth 8 -strip -quality 95 public/og.png
rm -rf "$tmp"
echo "public/og.png"
