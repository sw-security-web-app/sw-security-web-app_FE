import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import chatMainStyle from "../css/chatMain.module.css";
import logoStyle from "../css/logo.module.css";
import { useStore } from "../store/store";
import { useEffect, useState } from "react";

export default function ChatMainLayout() {
  const [searchParams] = useSearchParams();
  const { ai2 } = useParams();
  const [ai, setAi] = useState<string>("AI");

  useEffect(() => {
    if (ai2) {
      setAi(ai2);
    } else {
      const aiQuery = searchParams.get("ai");
      if (aiQuery) {
        setAi(aiQuery);
      }
    }
  }, [ai2, searchParams]);

  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className={chatMainStyle.container}>
      <div className={chatMainStyle.grid}>
        <div className={chatMainStyle.sideBar}>
          <div className={chatMainStyle.topItemContainer}>
            <div
              className={logoStyle.img}
              style={{ backgroundColor: "white" }}
            ></div>
            <Link
              style={{ textDecoration: "none" }}
              to={`/main/chatMain?ai=${ai}`}
              className={chatMainStyle.itemDiv}
            >
              <img src="../../img/home.svg" alt="home" />
              <span className={chatMainStyle.itemText}>홈</span>
            </Link>
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
            <Link
              to="/main/profile"
              style={{ textDecoration: "none" }}
              className={chatMainStyle.itemDiv2}
            >
              <img src="../../img/myProfile.svg" alt="myProfile" />
              <span className={chatMainStyle.itemText2}>내 프로필</span>
            </Link>
            <button
              className={chatMainStyle.itemDiv2}
              onClick={handleLogOut}
              style={{
                border: "none",
                backgroundColor: "transparent",
                padding: "0",
                cursor: "pointer",
              }}
            >
              <img src="../../img/logout.svg" alt="logout" />
              <span className={chatMainStyle.itemText2}>로그아웃</span>
            </button>
          </div>
        </div>
        <div className={chatMainStyle.contentContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
