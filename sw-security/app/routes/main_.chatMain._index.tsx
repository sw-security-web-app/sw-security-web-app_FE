import { useSearchParams, Link, useNavigate } from "@remix-run/react";
import chatMainStyle from "../css/chatMain.module.css";
import api from "~/api/api";
import { useEffect, useState } from "react";

export default function ChatMain() {
  const [searchParams] = useSearchParams();
  const ai = searchParams.get("ai") || "AI"; // 기본값 설정
  const navigate = useNavigate();
  const [chatDiv, setChatDiv] = useState<
    { chatRoomId: number; latestAnswer: string; latestCreatedAt: string }[]
  >([]);

  const createChatRoom = async () => {
    try {
      const response = await api.post("api/chat-room/create");
      if (response.status === 200) {
        const chatRoomId = response.data.chatRoomId; // 응답에서 채팅방 ID 추출
        navigate(`/main/chatMain/${ai}/${chatRoomId}`); // 채팅방으로 이동
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      alert(errorMessage);
    } finally {
    }
  };
  const fetchChatDiv = async () => {
    try {
      const response = await api.get(`/api/chat-room/latest?aiModelType=${ai}`);
      if (response.status === 200) {
        setChatDiv(response.data);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      alert(errorMessage);
    }
  };

  useEffect(() => {
    fetchChatDiv();
  }, []);

  return (
    <div className={chatMainStyle.mainContainer}>
      <div className={chatMainStyle.chatHistoryContainer}>
        <div className={chatMainStyle.topDiv}>
          <div className={chatMainStyle.leftDiv}>
            <img src="../../img/time.svg" alt="time" />
            <span className={chatMainStyle.historyText}>최신 대화 내용</span>
          </div>
          <div className={chatMainStyle.newChatDiv} onClick={createChatRoom}>
            <img src="../../img/plus.svg" alt="plus" />
            <span className={chatMainStyle.newChatText}>새 대화</span>
          </div>
        </div>
        <div className={chatMainStyle.chatSelectGrid}>
          {chatDiv.map((chat) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`/main/chatMain/${ai}/${chat.chatRoomId}`}
              className={chatMainStyle.child}
              key={chat.chatRoomId}
            >
              <div className={chatMainStyle.dateDiv}>
                <span>{chat.latestCreatedAt}</span>
              </div>
              <div className={chatMainStyle.contentDiv}>
                {chat.latestAnswer}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
