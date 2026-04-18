'use client';

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "🇵🇬 Poro Chat is live. Ask me about Papua New Guinea." }
  ]);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    setMessages([...newMessages, { role: "ai", text: data.reply }]);
    setInput("");
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>🇵🇬 Poro Chat</h1>

      <div style={{ border: "1px solid #ccc", height: 400, overflowY: "auto", padding: 10 }}>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.role}:</b> {m.text}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about PNG..."
        style={{ width: "80%", padding: 10, marginTop: 10 }}
      />

      <button onClick={sendMessage} style={{ padding: 10 }}>
        Send
      </button>
    </div>
  );
                }
