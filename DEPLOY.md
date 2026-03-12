# Deploy: Telegram Mini App + Coolify

## Как открыть сайт в Mini App и создать бота (кратко)

1. **Создать бота в Telegram**
   - Открой [@BotFather](https://t.me/BotFather).
   - Отправь `/newbot`, введи имя и username бота (например `Poker App` и `YourPokerMiniBot`).
   - Сохрани выданный **Bot Token** (нужен для бэкенда).

2. **Настроить бэкенд**
   - В `.env` бэкенда задай `TELEGRAM_BOT_TOKEN` и `TELEGRAM_BOT_USERNAME` (username без `@`).
   - Задай `CORS_ORIGINS` с доменом фронта, например: `https://luckyspin777.xyz`.

3. **Привязать Mini App к боту**
   - В BotFather: выбери бота → **Bot Settings** → **Configure Mini App** (или **Configure Main Mini App**).
   - Укажи URL мини-приложения: `https://luckyspin777.xyz` (твой развёрнутый фронт).

4. **Открыть приложение**
   - Зайди в бота в Telegram (по username или по ссылке `https://t.me/YourPokerMiniBot`).
   - Нажми кнопку **Open App** / **Запустить** (или Menu → открыть приложение).
   - Откроется твой сайт внутри Telegram; авторизация и баланс подтянутся с бэка по Telegram initData.

Реферальные ссылки: `https://t.me/YourPokerMiniBot?startapp=REF_XXXX` — фронт передаёт `ref_code` на бэк при логине.

---

## 1. Frontend (Coolify)

- **Build:** Dockerfile in `frontend/`
- **Build args** (in Coolify build settings):
  - `VITE_API_URL=https://main.redbluemountainvalley.click`
  - `VITE_APP_URL=https://luckyspin777.xyz`
- **Port:** 80 (nginx)
- **Domain:** e.g. `luckyspin777.xyz` with HTTPS (Coolify usually handles Let's Encrypt).

If you prefer env at runtime (no build args), you can switch to runtime config (e.g. inject `window.__ENV__` via a small script from nginx or a single `config.js`). Defaults in code already point to the URLs above.

## 2. Backend

Already deployed at `https://main.redbluemountainvalley.click`. Ensure CORS allows your frontend origin `https://luckyspin777.xyz` (and `http://localhost:5173` for dev).

## 3. Telegram: create bot and Mini App

### Create the bot

1. Open [@BotFather](https://t.me/BotFather) in Telegram.
2. Send `/newbot`.
3. Set name and username (e.g. `Poker Mini App` / `YourPokerBot`).
4. Copy the **Bot Token** (e.g. `123456:ABC...`). Save it on the backend as `TELEGRAM_BOT_TOKEN`.
5. Set backend env: `TELEGRAM_BOT_USERNAME=YourPokerBot` (the username without `@`).

### Enable Mini App and set URL

1. In BotFather: **Bot Settings** → **Configure Mini App** (or **Menu Button** / **Configure Main Mini App**).
2. Choose **Configure Main Mini App** (or the option that sets the main web app URL).
3. Set **Mini App URL** to your frontend:
   - Production: `https://luckyspin777.xyz`
   - Optional for testing: you can use a direct link like `https://t.me/YourPokerBot/app` later.

### Optional: Menu button

- **Bot Settings** → **Menu Button** → set text (e.g. "Open App") and URL: `https://luckyspin777.xyz`.

### Open the Mini App

- From bot profile: tap **Open App** (or the main Mini App button).
- Or open in browser/direct link: `https://t.me/YourPokerBot` and tap the app button.
- Direct link format: `https://t.me/YourPokerBot` or `https://t.me/YourPokerBot?startapp=REF_XXXX` for referral.

### Referral links

Backend expects `ref_code` in `POST /auth/telegram`. Frontend reads `tgWebAppStartParam` (e.g. `REF_ABC12345`) and sends it as `ref_code`. User opens `https://t.me/YourPokerBot?startapp=REF_ABC12345` to land with that ref.

## 4. Local dev

```bash
cd frontend
cp .env.example .env
# Edit .env: VITE_API_URL, VITE_APP_URL
npm install
npm run dev
```

To test inside Telegram: use Telegram’s built-in “Open in browser” with your ngrok/tunnel URL, or test with [Telegram Mini App test environment](https://core.telegram.org/bots/webapps#testing-mini-apps).

## 5. Checklist

- [ ] Backend has `TELEGRAM_BOT_TOKEN` and `TELEGRAM_BOT_USERNAME`.
- [ ] Backend CORS allows `https://luckyspin777.xyz` (and dev origin if needed).
- [ ] Frontend built with correct `VITE_API_URL` and `VITE_APP_URL` (or defaults match).
- [ ] Coolify build args set for production build.
- [ ] Domain `luckyspin777.xyz` points to Coolify and uses HTTPS.
- [ ] BotFather Mini App URL set to `https://luckyspin777.xyz`.
- [ ] Open bot in Telegram and tap the app — profile and balance load after Telegram auth.
