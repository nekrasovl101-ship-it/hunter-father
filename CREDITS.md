# Credits / Источники ассетов

Все сторонние ассеты в проекте распространяются под лицензией **CC0 1.0 (Public Domain)**,
кроме отдельно отмеченных. Указание авторства для CC0 не обязательно, но мы его приводим.

## Текстуры (`public/textures`)

| Файл | Источник | Автор | Лицензия |
|---|---|---|---|
| `leafy_grass_*` — трава | https://polyhaven.com/a/leafy_grass | Poly Haven | CC0 |
| `forest_ground_04_*` — лесная земля | https://polyhaven.com/a/forest_ground_04 | Poly Haven | CC0 |
| `brown_mud_leaves_01_*` — грязь у реки | https://polyhaven.com/a/brown_mud_leaves_01 | Poly Haven | CC0 |
| `rock_boulder_dry_*` — камень | https://polyhaven.com/a/rock_boulder_dry | Poly Haven | CC0 |
| `pine_bark_*` — кора | https://polyhaven.com/a/pine_bark | Poly Haven | CC0 |
| `moss002_*` — мох | https://ambientcg.com/view?id=Moss002 | ambientCG (Lennart Demes) | CC0 |
| `grass004_*` — газон (основной слой травы) | https://ambientcg.com/view?id=Grass004 | ambientCG | CC0 |
| `foliage/leafset009_*` — листья (из них собираются кроны) | https://ambientcg.com/view?id=LeafSet009 | ambientCG | CC0 |
| `bark_brown_02_*` — кора лиственных | https://polyhaven.com/a/bark_brown_02 | Poly Haven | CC0 |
| `wood_trunk_wall_*` — бревенчатые стены | https://polyhaven.com/a/wood_trunk_wall | Poly Haven | CC0 |
| `roof_planks_*` — кровля | https://polyhaven.com/a/roof_planks | Poly Haven | CC0 |
| `wood_planks_*` — доски, двери, крыльцо | https://polyhaven.com/a/wood_planks | Poly Haven | CC0 |

Скачаны через Poly Haven API (`api.polyhaven.com/files/<id>`, 1K JPG: Diffuse, nor_gl, Rough)
и ambientCG (`Moss002_1K-JPG.zip`: Color, NormalGL, Roughness).

## 3D-модели (`public/models`)

| Файл | Модель | Источник | Автор | Лицензия |
|---|---|---|---|---|
| `deer.glb` | Deer (анимированная) | https://poly.pizza/m/T6Cs7tmMHJ | Quaternius | CC0 |
| `stag.glb` | Stag (анимированная) | https://poly.pizza/m/tQdzbZ1Cmw | Quaternius | CC0 |
| `wolf.glb` | Wolf (анимированная) | https://poly.pizza/m/P1gU3Qkr9r | Quaternius | CC0 |
| `boar.glb` | Pig (анимированная, перекрашена в кабана) | https://poly.pizza/m/u35l6uP5vj | Quaternius | CC0 |
| `fox.glb` | Fox (анимированная) | https://poly.pizza/m/Bc97C66HKi | Quaternius | CC0 |
| `hare.glb` | Jackrabbit (анимация прыжков — процедурная) | https://poly.pizza/m/biNOm96olTH | Poly by Google | **CC-BY 3.0** |
| `pickup.glb` | Pickup Truck | https://poly.pizza/m/qn4grQgHm8 | Quaternius | CC0 |
| `rover.glb` | Range Rover | https://poly.pizza/m/8zk4o6nALW | IvOfficial | **CC-BY 3.0** |
| `hunter.glb` | Adventurer (другие охотники в онлайне) | https://poly.pizza/m/5EGWBMpuXq | Quaternius | CC0 |
| `rifle/` | Bolt Action Rifle 7.62 | https://polyhaven.com/a/bolt_action_rifle_7_62 | Poly Haven | CC0 |

**CC-BY 3.0** (https://creativecommons.org/licenses/by/3.0/) — можно использовать бесплатно,
в том числе коммерчески, но нужно указывать автора. Для этого держите этот файл в проекте
и/или покажите авторов в игре (экран «Авторы»). Если нужен строго CC0 — замените
`rover.glb` на Quaternius SUV/Pickup, а `hare.glb` — на любую CC0-модель зайца
(см. `src/config/models.js`).

Оригиналы паков: https://quaternius.com

## Сделано в проекте (без сторонних ассетов)

- Деревья (ели и лиственные из «карточек»), кусты, камни, трава, цветы, вода, небо с облаками — процедурная геометрия и шейдеры. Текстура еловой лапы рисуется кодом.
- Избы, сараи, охотничьи вышки, поленницы, кострище — процедурная геометрия с PBR-текстурами Poly Haven.
- Все звуки — синтез на Web Audio API.

## Библиотеки

- three.js — MIT License — https://github.com/mrdoob/three.js
- Vite — MIT License — https://github.com/vitejs/vite
- Basis Universal transcoder (в `public/basis`, из three.js) — Apache 2.0
