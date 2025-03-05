import { useSearchParams, Link, useNavigate } from "@remix-run/react";
import chatMainStyle from "../css/chatMain.module.css";
import api from "~/api/api";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect } from "react";

export default function ChatMain() {
  const [searchParams] = useSearchParams();
  const ai = searchParams.get("ai") || "AI"; // 기본값 설정
  const navigate = useNavigate();

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
    }
  };

  const fetchChatList = async () => {
    try {
      const response = await api.get("api/chat-room/latest");
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchChatList;
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
          <div className={chatMainStyle.child}>
            <div className={chatMainStyle.dateDiv}>
              <span>2024.11.11</span>
              <FaRegTrashAlt
                style={{ color: "white" }}
                className={chatMainStyle.trashIcon}
              />
            </div>
            <div className={chatMainStyle.contentDiv}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              minima quibusdam, nobis, illum omnis natus hic odit laudantium
              laboriosam animi aut aspernatur fuga est. Totam delectus
              perferendis est iusto exercitationem?
            </div>
          </div>
          <div className={chatMainStyle.child}>
            <div className={chatMainStyle.dateDiv}>
              <span>2024.11.11</span>
              <FaRegTrashAlt
                style={{ color: "white" }}
                className={chatMainStyle.trashIcon}
              />
            </div>
            <div className={chatMainStyle.contentDiv}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              minima quibusdam, nobis, illum omnis natus hic odit laudantium
              laboriosam animi aut aspernatur fuga est. Totam delectus
              perferendis est iusto exercitationem?
            </div>
          </div>
          <div className={chatMainStyle.child}>
            <div className={chatMainStyle.dateDiv}>
              <span>2024.11.11</span>
              <FaRegTrashAlt
                style={{ color: "white" }}
                className={chatMainStyle.trashIcon}
              />
            </div>
            <div className={chatMainStyle.contentDiv}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              minima quibusdam, nobis, illum omnis natus hic odit laudantium
              laboriosam animi aut aspernatur fuga est. Totam delectus
              perferendis est iusto exercitationem?
            </div>
          </div>
          <div className={chatMainStyle.child}>
            <div className={chatMainStyle.dateDiv}>
              <span>2024.11.11</span>
              <FaRegTrashAlt
                style={{ color: "white" }}
                className={chatMainStyle.trashIcon}
              />
            </div>
            <div className={chatMainStyle.contentDiv}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              minima quibusdam, nobis, illum omnis natus hic odit laudantium
              laboriosam animi aut aspernatur fuga est. Totam delectus
              perferendis est iusto exercitationem?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
