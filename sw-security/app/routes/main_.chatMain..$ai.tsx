import { useParams, useSearchParams } from "@remix-run/react";
import api from "../api/api";
import { useEffect, useRef, useState } from "react";
import chatMainStyle from "../css/chatMain.module.css";
import logoStyle from "../css/logo.module.css";
import ChatBtn from "~/components/chatBtn";
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios";
import { mockMessages } from "../mockMessages";

interface Message {
  sender: "USER" | "AI";
  text: string;
}

export default function Chat() {
  const { ai } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<Message | null>(null);
  const [page, setPage] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  // const fetchMessages = async (newPage: number) => {
  //   // console.log("불러짐");
  //   if (loading) return;
  //   setLoading(true);
  //   // try {
  //   //   const startIndex = (newPage - 1) * 10;
  //   //   const newMessages = mockMessages.slice(startIndex, startIndex + 10);

  //   //   setMessages((prev) => [...newMessages.reverse(), ...prev]); // 기존 메시지 앞에 추가
  //   //   setPage(newPage);
  //   // } catch (error) {
  //   //   console.error("이전 메시지 불러오기 실패:", error);
  //   // } finally {
  //   //   setLoading(false);
  //   // }

  //   try {
  //     const response = await api.get(`주소`, {
  //       params: { page: newPage, limit: 10 }, // 10개씩 불러오기
  //     });

  //     if (response.status === 200) {
  //       const newMessages: Message[] = response.data.messages;
  //       setMessages((prev) => [...newMessages.reverse(), ...prev]);
  //       setPage(newPage);
  //     }
  //   } catch (error) {
  //     console.error("이전 메시지 불러오기 실패:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // const handleScroll = () => {
  //   if (chatContainerRef.current) {
  //     if (chatContainerRef.current.scrollTop === 0) {
  //       setIsUserScrolling(true);
  //       fetchMessages(page + 1); // 페이지 증가하여 이전 메시지 가져오기
  //     }
  //   }
  // };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    const userMessage: Message = { sender: "USER", text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    // AI 응답이 도착할 때까지 로딩 메시지 추가
    setPendingMessage({ sender: "AI", text: "" });
    try {
      const requestBody =
        ai === "ChatGPT" ? { content: userInput } : { prompt: userInput };

      const response = await axios.post(
        `http://192.168.189.133:8080/api/gemini/ask`,
        requestBody,
        // { prompt: userInput },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6NiwiZW1haWwiOiJ0aW1lcjk3M0BuYXZlci5jb20iLCJtZW1iZXJTdGF0dXMiOiJHRU5FUkFMIiwiYWNjb3VudExvY2tlZCI6ZmFsc2UsImlhdCI6MTc0MDE5NTIzNSwiZXhwIjoxODI2NTk1MjM1fQ.2WYMh1Ve1e8cPTFqnYj8SqvA0ihqGtpN6U_xKQL4qw0`,
          },
        }
      );
      if (response.status === 200) {
        // alert("성공");
        const aiMessage: Message = { sender: "AI", text: response.data };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const error = await response.data;
        alert(error.message);
      }
    } catch (error) {
      console.error("에러 발생");
      const aiMessage: Message = {
        sender: "AI",
        text: "적합하지 않은 질문입니다. 다른 질문을 입력해주세요.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
      setPendingMessage(null);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };
  // useEffect(() => {
  //   const chatDiv = chatContainerRef.current;
  //   if (chatDiv) {
  //     chatDiv.addEventListener("scroll", handleScroll);
  //   }
  //   return () => {
  //     if (chatDiv) {
  //       chatDiv.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, [page]);

  // 🔹 UI가 업데이트될 때 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // useEffect(() => {
  //   fetchMessages(1); // 첫 번째 페이지 메시지 불러오기
  //   // console.log(mockMessages);
  // }, []);

  return (
    <div className={chatMainStyle.aiContainer}>
      <div ref={chatContainerRef} className={chatMainStyle.chatContainer}>
        {messages.map((msg, index) => (
          <div key={index} className={chatMainStyle.messageDiv}>
            {msg.sender === "AI" && (
              <div className={chatMainStyle.onlyAI}>
                <img
                  src={`../../img/${ai}.svg`}
                  className={chatMainStyle.img}
                />
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#CB62FF",
                    marginLeft: "15px",
                  }}
                >
                  {ai}
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
        {pendingMessage && (
          <div className={chatMainStyle.messageDiv}>
            <div className={chatMainStyle.onlyAI}>
              <img src={`../../img/${ai}.svg`} className={chatMainStyle.img} />
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#CB62FF",
                  marginLeft: "15px",
                }}
              >
                {ai}
              </span>
            </div>
            <div className={chatMainStyle.ai}>
              <AiOutlineLoading className={chatMainStyle.loadingIcon} />
            </div>
          </div>
        )}
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
        <ChatBtn onClick={handleSendMessage} loading={loading} />
      </div>
    </div>
  );
}
