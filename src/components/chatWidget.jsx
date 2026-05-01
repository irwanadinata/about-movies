import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import Swal from "sweetalert2";
import chatLogo from "@/assets/chat-logo.png";
import "@/styles/chatWidget.css";

const PROXY_URL = "/api/chat";

const SYSTEM_PROMPT =
  "You are a helpful movie assistant. Help users find movies, give recommendations, explain plots, and answer any movie-related questions. Be friendly and concise.";

async function callGemini(history, userText) {
  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [
      ...history.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
      { role: "user", parts: [{ text: userText }] },
    ],
    generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
  };

  const res = await fetch(PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "(no response)";
}

const WELCOME = {
  role: "assistant",
  content:
    "Halo! 🎬 Tanya saya tentang film — rekomendasi, plot, aktor, dan lainnya!",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([WELCOME]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userText = prompt.trim();
    const history = messages.filter((_, i) => i > 0);
    const updatedMsg = [...messages, { role: "user", content: userText }];

    setPrompt("");
    setMessages(updatedMsg);
    setIsLoading(true);

    try {
      const reply = await callGemini(history, userText);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) handleSubmit(e);
  };

  return (
    <>
      <div className={clsx("chat-widget-panel", isOpen && "panel-open")}>
        <div className="cw-header">
          <div className="cw-header-left">
            <div className="cw-avatar-sm">
              <img src={chatLogo} alt="AI" className="cw-logo-img" />
            </div>
            <div>
              <p className="cw-title">ChatMe AI</p>
              <p className="cw-subtitle">Movie Assistant</p>
            </div>
          </div>
          <button
            className="cw-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        <div className="cw-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={clsx(
                "cw-row",
                msg.role === "user" ? "cw-row-user" : "cw-row-bot",
              )}
            >
              {msg.role === "assistant" && (
                <div className="cw-bot-avatar">
                  <i className="fas fa-robot" />
                </div>
              )}
              <div
                className={clsx(
                  "cw-bubble",
                  msg.role === "user" ? "cw-bubble-user" : "cw-bubble-bot",
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="cw-row cw-row-bot">
              <div className="cw-bot-avatar">
                <i className="fas fa-robot" />
              </div>
              <div className="cw-bubble cw-bubble-bot cw-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form className="cw-input-bar" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="cw-input"
            type="text"
            placeholder="Tanya tentang film..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="cw-send-btn"
            disabled={isLoading || !prompt.trim()}
            aria-label="Kirim"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <i className="fas fa-paper-plane" />
            )}
          </button>
        </form>
      </div>

      <button
        className={clsx("chat-fab", isOpen && "fab-active")}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <i className="fas fa-times" style={{ fontSize: "1.2rem" }} />
        ) : (
          <img src={chatLogo} alt="Chat AI" className="fab-logo" />
        )}
        {!isOpen && <span className="fab-pulse" />}
      </button>
    </>
  );
}
