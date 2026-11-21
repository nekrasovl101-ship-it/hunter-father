# Деплой Hunter Father на Cloudflare (бесплатный тариф)

Сервер — **Cloudflare Worker + Durable Objects** (папка `server/`), клиент — статические файлы (`dist/`)
на Cloudflare (новая версия Pages внутри Workers, папка `hosting/`).

**Текущий деплой:**
- игра — https://hunter-father-game.nekrasovl101.workers.dev
- сервер — https://hunter-father.nekrasovl101.workers.dev

## 0. Что нужно

- Аккаунт Cloudflare (бесплатный): https://dash.cloudflare.com/sign-up
- Node.js 20+ (уже установлен).

## 1. Войти в Cloudflare

```bash
cd hunter-father/server
npx wrangler login
```

Откроется браузер — нажмите **Allow**. Проверка: `npx wrangler whoami`.

> При первом деплое Wrangler попросит выбрать поддомен `*.workers.dev`, если его ещё нет.

## 2. Задеплоить сервер

```bash
npx wrangler deploy
```

В конце Wrangler напечатает адрес, например:

```
https://hunter-father.ivan123.workers.dev
```

Проверьте: откройте `https://hunter-father.ivan123.workers.dev/health` — должно быть `{"ok":true,...}`.

Durable Objects с SQLite (`new_sqlite_classes` в `wrangler.jsonc`) работают на бесплатном тарифе — включать ничего не нужно.

## 3. Указать клиенту адрес сервера

В корне проекта откройте `.env.production` и подставьте свой адрес:

```
VITE_SERVER_URL=https://hunter-father.ivan123.workers.dev
```

## 4. Собрать и выложить клиент

Cloudflare объединил Pages с Workers: статический сайт теперь выкладывается как Worker
со «статическими ассетами» (бесплатно, запросы к статике не ограничены). Конфиг — `hosting/wrangler.jsonc`.

```bash
cd ..            # корень hunter-father
npm run deploy:client
```

Это `vite build` + `wrangler deploy -c hosting/wrangler.jsonc`. Адрес игры:
**https://hunter-father-game.<ваш-поддомен>.workers.dev**

> Не запускайте `wrangler pages project create` из папки `server` — Wrangler возьмёт конфиг сервера
> и просто передеплоит его.

## 5. Открыть с iPhone

1. На iPhone откройте Safari → `https://hunter-father-game.<ваш-поддомен>.workers.dev`.
2. Для полноэкранного режима: **Поделиться → На экран «Домой»** и запускайте с иконки.
3. Поверните телефон горизонтально. Настройки → Графика: «Средняя» (если тормозит — «Низкая»).
4. Чтобы позвать друга: «Создать комнату» → продиктуйте код из 5 символов
   или пришлите ссылку `https://hunter-father-game.<ваш-поддомен>.workers.dev/?room=КОД`.

## Обновления

- Изменили сервер → `npm run deploy:server`.
- Изменили клиент → `npm run deploy:client`.

## Лимиты бесплатного тарифа (ориентиры)

| Ресурс | Бесплатно в сутки | Как расходуется |
|---|---|---|
| Запросы Workers + Durable Objects | 100 000 | Каждые 20 входящих WebSocket-сообщений = 1 запрос. Клиент шлёт 10 сообщений/с → ≈ 1 800 запросов в час на игрока → ~55 игроко-часов в сутки |
| Время работы Durable Objects | 13 000 ГБ·с | Комната «живёт», пока в ней есть игроки (128 МБ) → ~28 часов работы комнат в сутки |
| SQLite-хранилище | 5 ГБ | Таблицы рекордов — килобайты |
| Статика игры (hosting) | запросы к статическим файлам бесплатны и не лимитированы | — |

Когда в комнате никого нет, цикл симуляции останавливается и объект выгружается — время не тратится.
Если лимит закончится, сервер до полуночи (UTC) будет отвечать ошибкой, одиночная игра продолжит работать.
