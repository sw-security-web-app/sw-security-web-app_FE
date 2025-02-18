import { useSearchParams, Link } from "@remix-run/react";
import chatMainStyle from "../css/chatMain.module.css";

export default function ChatMain() {
  const [searchParams] = useSearchParams();
  const ai = searchParams.get("ai") || "AI"; // 기본값 설정

  return (
    <div className={chatMainStyle.mainContainer}>
      <div className={chatMainStyle.chatHistoryContainer}>
        {/* <div>{ai}와의 채팅</div>
        <p>대화를 시작하려면 아래 버튼을 눌러주세요.</p>
         */}
        <div className={chatMainStyle.topDiv}>
          <div className={chatMainStyle.leftDiv}>
            <img src="../../img/time.svg" alt="time" />
            <span className={chatMainStyle.historyText}>최신 대화 내용</span>
          </div>

          <Link
            to={`/main/chatMain/${ai}`}
            className={chatMainStyle.newChatDiv}
            style={{ textDecoration: "none" }}
          >
            <img src="../../img/plus.svg" alt="plus" />
            <span className={chatMainStyle.newChatText}>새 대화</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
