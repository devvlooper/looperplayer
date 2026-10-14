#!/usr/bin/env bash
# Cuts the looping screen recordings used in the screenshot showcase from the promo project's captures
# (../looper_showcase/captures by default). Each clip gets a small H.264 MP4 plus a WebP poster frame.
set -euo pipefail

cd "$(dirname "$0")/.."
CAP=${1:-../looper_showcase/captures}
OUT=public/clips
mkdir -p "$OUT"

# clip <source> <name> <start s> <length s> <scale> <bitrate>
clip() {
  local src="$1" name="$2" ss="$3" t="$4" scale="$5" br="$6"
  ffmpeg -v error -y -ss "$ss" -t "$t" -i "$CAP/$src" -an \
    -vf "scale=$scale:flags=lanczos,fps=30,format=yuv420p" \
    -c:v libopenh264 -b:v "$br" -maxrate "$br" -movflags +faststart "$OUT/$name.mp4"
  ffmpeg -v error -y -i "$OUT/$name.mp4" -frames:v 1 -c:v libwebp -quality 80 "$OUT/$name.webp"
  printf '  %-14s %s\n' "$name" "$(du -h "$OUT/$name.mp4" | cut -f1)"
}

echo "Phone (576x1280 recordings)"
clip 10-home-open.mp4       m-home     0   4.2 432:960 1400k
clip 11-colours.mp4         m-colours  0.3 4.2 432:960 1400k
clip 12-lyrics-word-sync.mp4 m-lyrics  1   4.2 432:960 1400k
clip 16-analyze.mp4         m-analyze  0   4.2 432:960 1400k
clip 14-equalizer.mp4       m-eq       0   4.2 432:960 1400k

echo "Desktop (1920x1048 recording)"
clip 06-desktop.mp4 d-home   0    5   1600:874 2200k
clip 06-desktop.mp4 d-album  5.2  4.6 1600:874 2200k
clip 06-desktop.mp4 d-lyrics 10.2 8   1600:874 2200k
