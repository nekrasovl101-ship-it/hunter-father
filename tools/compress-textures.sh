#!/usr/bin/env bash
# Сжимает public/textures/*.jpg в KTX2 (Basis Universal). На iPhone они
# распаковываются в ASTC прямо на GPU: в ~4–6 раз меньше видеопамяти.
# Нужен KTX-Software (команда `ktx`): https://github.com/KhronosGroup/KTX-Software/releases
# После запуска игра сама подхватит .ktx2 (по manifest.json).
set -euo pipefail
cd "$(dirname "$0")/../public/textures"
KTX=${KTX:-ktx}
TMP=$(mktemp -d)
list=()
for f in *_albedo.jpg *_normal.jpg *_rough.jpg; do
  name="${f%.jpg}"
  sips -s format png "$f" --out "$TMP/$name.png" >/dev/null
  case "$name" in
    *_albedo) "$KTX" create --format R8G8B8_SRGB --assign-tf srgb --encode basis-lz --clevel 2 --qlevel 160 --generate-mipmap "$TMP/$name.png" "$name.ktx2" ;;
    *_normal) "$KTX" create --format R8G8B8_UNORM --assign-tf linear --encode uastc --uastc-quality 2 --zstd 18 --generate-mipmap "$TMP/$name.png" "$name.ktx2" ;;
    *_rough)  "$KTX" create --format R8G8B8_UNORM --assign-tf linear --encode basis-lz --clevel 2 --qlevel 128 --generate-mipmap "$TMP/$name.png" "$name.ktx2" ;;
  esac
  list+=("\"$name\"")
  echo "✓ $name.ktx2"
done
(IFS=,; echo "{\"ktx2\":[${list[*]}]}") > manifest.json
rm -rf "$TMP"
echo "Готово: manifest.json обновлён"
