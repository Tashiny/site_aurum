import { NextResponse } from "next/server";

/** Приём заявки и отправка в Telegram. Токен и chat_id — только в env на стороне сервера. */
export async function POST(req: Request) {
  const { name, contact, brief, company } = await req.json().catch(() => ({}));

  // honeypot заполнен — это бот, тихо отвечаем ок
  if (company) return NextResponse.json({ ok: true });
  if (!name || !contact) return NextResponse.json({ error: "missing fields" }, { status: 400 });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return NextResponse.json({ error: "not configured" }, { status: 500 });

  const text = [
    "🟡 *Новая заявка с сайта*",
    `*Имя:* ${name}`,
    `*Контакт:* ${contact}`,
    brief ? `*Проект:* ${brief}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });

  if (!res.ok) return NextResponse.json({ error: "telegram failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
