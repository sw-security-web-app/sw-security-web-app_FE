import {
  useSearchParams,
  Link,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import chatMainStyle from "../css/chatMain.module.css";
import api from "~/api/api";
import { FaRegTrashAlt } from "react-icons/fa";
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
      } else {
        const error = await response.data;
        alert(error.message);
      }
    } catch (error) {
      console.error("채팅방 생성 실패:", error);
      alert("새 대화 생성에 실패했습니다."); // 에러 처리
    } finally {
    }
  };
  const fetchChatDiv = async () => {
    try {
      const response = await api.get(`/api/chat-room/latest?aiModelType=${ai}`);
      if (response.status === 200) {
        setChatDiv(response.data);
      } else {
        const error = await response.data;
        alert(error.message);
      }
    } catch (error: any) {
      alert(error.message);
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
          {/* <Link
            to=""
            style={{ textDecoration: "none" }}
            className={chatMainStyle.child}
          >
            <div className={chatMainStyle.dateDiv}>
              <span>aaa</span>
            </div>
            <div className={chatMainStyle.contentDiv}>sss</div>
          </Link> */}
          {chatDiv.map((chat) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`/main/chatMain/${ai}/${chat.chatRoomId}`}
              className={chatMainStyle.child}
            >
              <div key={chat.chatRoomId}>
                <div className={chatMainStyle.dateDiv}>
                  <span>{chat.latestCreatedAt}aaa</span>
                  {/* <FaRegTrashAlt
                  style={{ color: "white" }}
                  className={chatMainStyle.trashIcon}
                /> */}
                </div>
                <div className={chatMainStyle.contentDiv}>
                  {chat.latestAnswer}sss
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
