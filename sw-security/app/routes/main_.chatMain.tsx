import {
  Link,
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import chatMainStyle from "../css/chatMain.module.css";
import logoStyle from "../css/logo.module.css";
import { useStore } from "../store/store";
import { useEffect, useState } from "react";
import Logo from "~/components/logo";
import api from "~/api/api";
import { create } from "zustand";
import { useAuthRedirect } from "~/Hooks/useAuthRedirect";

export default function ChatMainLayout() {
  const [searchParams] = useSearchParams();
  const { ai2 } = useParams();
  const [ai, setAi] = useState<string>("AI");
  const [chatList, setChatList] = useState<number[]>([]);
  const [renderList, setRenderList] = useState(false);
  // useAuthRedirect();

  const fetchChatList = async () => {
    console.log("fetchChatList실행");
    try {
      const response = await api.get(`/api/chat-room/get?aiModelType=${ai}`);
      if (response.status === 200) {
        setChatList(response.data.map((chat: any) => chat.chatRoomId));
      } else {
        const error = await response.data;
        alert(error.message);
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
    if (ai2) {
      setAi(ai2);
    } else {
      const aiQuery = searchParams.get("ai");
      if (aiQuery) {
        setAi(aiQuery);
      }
    }
  }, [ai2, searchParams]);

  useEffect(() => {
    if (ai != "AI") {
      fetchChatList();
    }
  }, [ai, renderList]);

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
            <img
              src="/img/logo.svg"
              alt="logo"
              style={{ height: "2.8rem", width: "2.8rem" }}
            />
            <Link
              style={{ textDecoration: "none" }}
              to={`/main/chatMain?ai=${ai}`}
              className={chatMainStyle.itemDiv}
            >
              <img src="/img/home.svg" alt="home" />
              <span className={chatMainStyle.itemText}>홈</span>
            </Link>
            <div className={chatMainStyle.itemDiv}>
              <img src="/img/alarm.svg" alt="alarm" />
              <span className={chatMainStyle.itemText}>알림</span>
            </div>
            <div className={chatMainStyle.itemDiv}>
              <img src="/img/chatHistory.svg" alt="chatHistory" />
              <span className={chatMainStyle.itemText}>대화 기록</span>
            </div>
          </div>
          <div className={chatMainStyle.chatHistoryConatainer}>
            {chatList.map((id, index) => (
              <Link
                style={{ textDecoration: "none" }}
                to={`/main/chatMain/${ai}/${id}`}
                className={chatMainStyle.chatTitle}
                key={id}
              >
                <span>대화 내용 {id}</span>
              </Link>
            ))}
          </div>
          <div className={chatMainStyle.bottomItemContainer}>
            <button
              onClick={() => {
                navigate("/main/profile");
              }}
              className={chatMainStyle.itemDiv2}
            >
              <img src="/img/myProfile.svg" alt="myProfile" />
              <span className={chatMainStyle.itemText2}>내 프로필</span>
            </button>
            <button className={chatMainStyle.itemDiv2} onClick={handleLogOut}>
              <img src="/img/logout.svg" alt="logout" />
              <span className={chatMainStyle.itemText2}>로그아웃</span>
            </button>
          </div>
        </div>
        <div className={chatMainStyle.contentContainer}>
          <Outlet context={setRenderList} />
        </div>
      </div>
    </div>
  );
}
