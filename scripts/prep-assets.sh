#!/usr/bin/env bash
# Regenerates every optimized image in src/assets + public from the originals in design/.
#
# The mockup PNGs ship with a big semi-transparent dithered shadow and the device sits off-center in
# the canvas. The device body itself is fully opaque, so thresholding alpha gives its exact bounding
# box; we crop to that and let CSS draw the shadow instead.
set -euo pipefail

cd "$(dirname "$0")/.."
SRC=design
OUT=src/assets
mkdir -p "$OUT" public

# crop_device <source png> <output webp> [resize geometry]
# After cropping, alpha is multiplied by the device silhouette (opaque core, dilated 2px, feathered) so
# the leftover baked shadow can't show up as a hard-edged darker rectangle at the crop boundary.
crop_device() {
  local src="$1" out="$2" resize="${3:-}"
  local box tmp
  tmp=$(mktemp -d)
  box=$(magick "$SRC/$src" -alpha extract -threshold 90% -format '%@' info:)
  magick "$SRC/$src" -crop "$box" +repage "$tmp/c.png"
  magick "$tmp/c.png" -alpha extract "$tmp/a.png"
  magick "$tmp/c.png" -alpha extract -threshold 90% -morphology Dilate Disk:2 -blur 0x0.8 "$tmp/m.png"
  magick "$tmp/a.png" "$tmp/m.png" -compose Multiply -composite "$tmp/na.png"
  local args=("$tmp/c.png" -alpha off "$tmp/na.png" -compose CopyOpacity -composite +repage)
  [[ -n "$resize" ]] && args+=(-filter Lanczos -resize "$resize")
  magick "${args[@]}" -define webp:alpha-quality=100 -quality 88 -define webp:method=6 "$OUT/$out"
  rm -rf "$tmp"
  echo "  $out  ($box)"
}

echo "Device mockups"
crop_device "iPhone 17 - 474 1.png" desktop.webp
# Phones: 729x1529 native, displayed ~640px tall -> keep ~2x for retina
crop_device "Group 67664.png" phone-home.webp     x1300
crop_device "Group 67665.png" phone-lyrics.webp   x1300
crop_device "Group 67666.png" phone-player.webp   x1300
crop_device "Group 67667.png" phone-library.webp  x1300

echo "Logo + decoration"
magick "$SRC/Mask group.png"       -strip PNG8:"$OUT/logo.png" 2>/dev/null || cp "$SRC/Mask group.png" "$OUT/logo.png"
magick "$SRC/Mask group (2).png"   -strip "$OUT/deco.png"
magick "$SRC/Vector.png" -filter Lanczos -resize 200% -strip "$OUT/linux.png"

echo "Favicon"
magick "$SRC/Mask group.png" -background none -gravity center -resize 56x56 -extent 64x64 "public/favicon.png"

echo
ls -la "$OUT" public | grep -v '^total'
