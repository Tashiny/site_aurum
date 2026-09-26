# Aurum Studio — лендинг дизайн-студии

Сайт с крупной типографикой, анимациями на скролле и формой заявок в Telegram.

## Стек
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion — анимации появления, параллакс, индикатор прокрутки
- Vercel — деплой

## Что внутри
- Первый экран: построчное раскрытие заголовка из-под маски, параллакс фона на скролле
- Бегущая строка на CSS-анимации (без JS)
- Список проектов с реакцией на наведение
- Секция «В цифрах» со счётчиками, стартующими при появлении в вьюпорте
- Форма заявки → серверный роут `/api/lead` → Telegram-бот, с honeypot против спама
- Переключатель RU/EN без перезагрузки
- Мобильное меню, адаптив от 390px
- Техническое SEO: метаданные, Open Graph, schema.org ProfessionalService, sitemap.xml, robots.txt, hreflang
- Поддержка `prefers-reduced-motion`: анимации отключаются системной настройкой
- Анимируются только `transform` и `opacity` — без layout shift

## Запуск

```bash
npm install
cp .env.example .env.local   # вписать токен бота и chat_id
npm run dev
```

## Деплой на Vercel
1. Залить репозиторий на GitHub
2. На Vercel: New Project → выбрать репозиторий
3. В Settings → Environment Variables добавить `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`
4. Deploy

## Форма заявок
`@BotFather` → `/newbot` → токен. Chat ID — написать боту и открыть
`https://api.telegram.org/bot<ТОКЕН>/getUpdates`, взять `chat.id`.
