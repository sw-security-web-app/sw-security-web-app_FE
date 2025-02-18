import { useParams, useSearchParams } from "@remix-run/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import chatMainStyle from "../css/chatMain.module.css";
import logoStyle from "../css/logo.module.css";
import ChatBtn from "~/components/chatBtn";

interface Message {
  sender: "USER" | "AI";
  text: string;
}

export default function Chat() {
  const { ai } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // 페이지네이션을 위한 상태
  const messagesEndRef = useRef<HTMLDivElement>(null); // 🔹 메시지 전송 함수

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // 사용자 메시지 추가
    const userMessage: Message = { sender: "USER", text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    // 1초 뒤 AI 응답 추가 (테스트용)
    setTimeout(() => {
      const aiMessage: Message = {
        sender: "AI",
        text: "이것은 AI 응답입니다!",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  // 🔹 UI가 업데이트될 때 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={chatMainStyle.aiContainer}>
      <div className={chatMainStyle.chatContainer}>
        {messages.map((msg, index) => (
          <div key={index} className={chatMainStyle.messageDiv}>
            {msg.sender === "AI" && (
              <div className={chatMainStyle.onlyAI}>
                <div
                  className={logoStyle.img}
                  style={{ backgroundColor: "#1B1C1E" }}
                ></div>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#CB62FF",
                    marginLeft: "15px",
                  }}
                >
                  답변
                </span>
              </div>
            )}
            <div
              className={`${chatMainStyle.message} ${
                msg.sender === "USER" ? chatMainStyle.user : chatMainStyle.ai
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={chatMainStyle.inputContainer}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="질문을 입력하세요"
          className={chatMainStyle.input}
          onKeyDown={handleKeyDown}
        />
        <ChatBtn onClick={handleSendMessage} />
      </div>
    </div>
  );
}
