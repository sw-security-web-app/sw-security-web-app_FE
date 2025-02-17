import { Outlet } from "@remix-run/react";
import chatMainStyle from "../css/chatMain.module.css";
import logoStyle from "../css/logo.module.css";

export default function ChatMainLayout() {
  return (
    <div className={chatMainStyle.container}>
      <div className={chatMainStyle.grid}>
        <div className={chatMainStyle.sideBar}>
          <div className={chatMainStyle.topItemContainer}>
            <div
              className={logoStyle.img}
              style={{ backgroundColor: "white" }}
            ></div>
            <div className={chatMainStyle.itemDiv}>
              <img src="../../img/home.svg" alt="home" />
              <span className={chatMainStyle.itemText}>홈</span>
            </div>
            <div className={chatMainStyle.itemDiv}>
              <img src="../../img/alarm.svg" alt="alarm" />
              <span className={chatMainStyle.itemText}>알림</span>
            </div>
            <div className={chatMainStyle.itemDiv}>
              <img src="../../img/chatHistory.svg" alt="chatHistory" />
              <span className={chatMainStyle.itemText}>대화 기록</span>
            </div>
          </div>
          <div className={chatMainStyle.chatHistoryConatainer}>
            <span className={chatMainStyle.chatTitle}>대화 내용 1</span>
            <span className={chatMainStyle.chatTitle}>대화 내용 2</span>
            <span className={chatMainStyle.chatTitle}>대화 내용 3</span>
          </div>
          <div className={chatMainStyle.bottomItemContainer}>
            <div className={chatMainStyle.itemDiv2}>
              <img src="../../img/myProfile.svg" alt="myProfile" />
              <span className={chatMainStyle.itemText2}>내 프로필</span>
            </div>
            <div className={chatMainStyle.itemDiv2}>
              <img src="../../img/logout.svg" alt="logout" />
              <span className={chatMainStyle.itemText2}>로그아웃</span>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
