export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("VideoMakerBot is online 🤖");
    }

    try {
      const update = await request.json();

      if (update.message) {
        const chatId = update.message.chat.id;
        const message = update.message.text || "";

        let reply;

        if (message === "/start") {
          reply =
            "🎬 VideoMakerBot\n\n" +
            "Welcome! 🤖\n\n" +
            "Commands:\n" +
            "/create - Create a video\n" +
            "/edit - Edit your uploaded video\n" +
            "/help - Help";
        } else if (message === "/help") {
          reply =
            "🎬 VideoMakerBot Help\n\n" +
            "Example:\n" +
            "/create Sri Lanka Travel\n\n" +
            "You can also upload a video/photo and use /edit.";
        } else if (message.startsWith("/create")) {
          const topic = message.replace("/create", "").trim();

          reply = topic
            ? `🎬 Topic received: ${topic}\n\n⏳ Video creation system is being prepared...`
            : "Please enter a topic.\n\nExample:\n/create Sri Lanka Travel";
        } else if (message === "/edit") {
          reply =
            "🎞️ Upload your photo or video first.\n\n" +
            "Then send /edit.";
        } else {
          reply =
            "🤖 I am ready!\n\n" +
            "Use /start or /help.";
        }

        await sendMessage(env.BOT_TOKEN, chatId, reply);
      }

      return new Response("OK");
    } catch (error) {
      return new Response("Error", { status: 500 });
    }
  }
};

async function sendMessage(token, chatId, text) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text
    })
  });
}
