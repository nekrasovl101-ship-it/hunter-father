#!/usr/bin/env bash
# Текстуры 2K (Poly Haven, CC0) для пресета «Ультра» → public/textures/hd/
set -euo pipefail
cd "$(dirname "$0")/../public/textures"
mkdir -p hd
for id in leafy_grass forest_ground_04 brown_mud_leaves_01 rock_boulder_dry pine_bark bark_brown_02 wood_trunk_wall roof_planks wood_planks; do
  base="https://dl.polyhaven.org/file/ph-assets/Textures/jpg/2k/$id/${id}"
  [ -f "hd/${id}_albedo.jpg" ] || curl -sfL "${base}_diff_2k.jpg" -o "hd/${id}_albedo.jpg"
  [ -f "hd/${id}_normal.jpg" ] || curl -sfL "${base}_nor_gl_2k.jpg" -o "hd/${id}_normal.jpg"
  [ -f "hd/${id}_rough.jpg" ] || curl -sfL "${base}_rough_2k.jpg" -o "hd/${id}_rough.jpg"
done
# шероховатость не требует 2K — ужимаем до 1K, альбедо пережимаем в JPEG 85
for f in hd/*_rough.jpg; do sips -Z 1024 "$f" >/dev/null; done
for f in hd/*_albedo.jpg hd/*_normal.jpg; do sips -s format jpeg -s formatOptions 85 "$f" --out "$f" >/dev/null; done
du -sh hd
