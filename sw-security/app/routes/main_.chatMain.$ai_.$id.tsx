import { useOutletContext, useParams, useSearchParams } from "@remix-run/react";
import api from "../api/api";
import { useEffect, useRef, useState } from "react";
import chatMainStyle from "../css/chatMain.module.css";
import ChatBtn from "~/components/chatBtn";
import { AiOutlineLoading } from "react-icons/ai";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface Message {
  sender: "question" | "answer";
  text: string;
}

export default function Chat() {
  const { ai, id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<Message | null>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [lastIndex, setLastIndex] = useState<number | null>(null);
  const [apiName, setAPIName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { setRenderList, setAi } = useOutletContext<{
    setRenderList: React.Dispatch<React.SetStateAction<boolean>>;
    setAi: React.Dispatch<React.SetStateAction<string | undefined>>;
  }>();

  const fetchMessages = async (lastIndex?: number | null) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await api.get(`/api/chat/detail/${id}`, {
        params: { size: 10, id: lastIndex, type: ai },
      });

      if (response.status === 200) {
        setLastIndex(response.data.lastChatId);
        const newMessages: Message[] = [];
        for (const chat of response.data.array) {
          if (chat.message) {
            const question = chat.message.question;
            const answer = chat.message.answer;
            if (answer) {
              // 마크다운 처리
              const result = await marked(answer); // 마크다운 변환
              const sanitizedHtml = DOMPurify.sanitize(result); // HTML sanitize
              newMessages.push({ sender: "answer", text: sanitizedHtml });
            }
            if (question) {
              newMessages.push({ sender: "question", text: question });
            }
          }
        }
        setMessages((prev) => [...newMessages.reverse(), ...prev]);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      if (chatContainerRef.current.scrollTop === 0 && !loading) {
        setIsUserScrolling(true); // 사용자가 스크롤을 올렸음 → 자동 스크롤 방지
        fetchMessages(lastIndex as number);
      }
    }
  };
  const handleUserScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      // 사용자가 맨 아래로 스크롤하면 자동 스크롤 다시 활성화
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setIsUserScrolling(false);
      }
    }
  };

  const handleSendMessage = async () => {
    setRenderList(true);
    if (!userInput.trim()) return;
    setLoading(true);

    const userMessage: Message = { sender: "question", text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    // AI 응답이 도착할 때까지 로딩 메시지 추가
    setPendingMessage({ sender: "answer", text: "" });
    try {
      const requestBody =
        ai === "ChatGPT"
          ? { prompt: userInput, model: "gpt-3.5-turbo", chatRoomId: id }
          : { chatRoomId: id, prompt: userInput };
      const header = ai === "ChatGPT" ? { "X-ChatRoom-Id": id } : {};

      const response = await api.post(`/api/${apiName}/ask`, requestBody, {
        headers: header,
      });
      if (response.status === 200) {
        if (typeof response.data.prompt === "string") {
          // response.data.prompt가 문자열인지 확인
          const result = await marked(response.data.prompt); // await 키워드 사용
          const sanitizedHtml = DOMPurify.sanitize(result);
          const aiMessage: Message = { sender: "answer", text: sanitizedHtml };
          setMessages((prev) => [...prev, aiMessage]);
        } else {
          const aiMessage: Message = {
            sender: "answer",
            text: response.data.prompt,
          };
          setMessages((prev) => [...prev, aiMessage]);
        }
      } else {
        const error = await response.data;
        alert(error.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      const aiMessage: Message = {
        sender: "answer",
        text: errorMessage,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
      setPendingMessage(null);
      setRenderList(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    const chatDiv = chatContainerRef.current;
    if (chatDiv) {
      chatDiv.addEventListener("scroll", handleScroll);
      chatDiv.addEventListener("scroll", handleUserScroll);
    }
    return () => {
      if (chatDiv) {
        chatDiv.removeEventListener("scroll", handleScroll);
        chatDiv.removeEventListener("scroll", handleUserScroll);
      }
    };
  }, [lastIndex]);

  useEffect(() => {
    if (!isFetching && !isUserScrolling) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isFetching]);

  useEffect(() => {
    setMessages([]);
    setLastIndex(null);
    setAi(ai);
    setRenderList((prev) => !prev);
    setAPIName(
      ai === "ChatGPT" ? "chat-gpt" : ai === "Claude" ? "claude" : "gemini"
    );

    fetchMessages();
  }, [id, ai]);

  return (
    <div className={chatMainStyle.aiContainer}>
      <div ref={chatContainerRef} className={chatMainStyle.chatContainer}>
        {messages.map((msg, index) => (
          <div key={index} className={chatMainStyle.messageDiv}>
            {msg.sender === "answer" && (
              <div className={chatMainStyle.onlyAI}>
                <img src={`/img/${ai}.svg`} className={chatMainStyle.img} />
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#CB62FF",
                    marginLeft: "0.83rem",
                  }}
                >
                  {ai}
                </span>
              </div>
            )}
            <div
              className={`${chatMainStyle.message} ${
                msg.sender === "question"
                  ? chatMainStyle.user
                  : chatMainStyle.ai
              }`}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            >
              {/* {msg.text} */}
            </div>
          </div>
        ))}
        {pendingMessage && (
          <div className={chatMainStyle.messageDiv}>
            <div className={chatMainStyle.onlyAI}>
              <img src={`/img/${ai}.svg`} className={chatMainStyle.img} />
              <span
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#CB62FF",
                  marginLeft: "0.83rem",
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
