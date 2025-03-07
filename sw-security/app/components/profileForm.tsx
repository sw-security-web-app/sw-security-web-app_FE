import { Link, useNavigate, useOutletContext } from "@remix-run/react";
import profileStyle from "../css/profile.module.css";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useStore } from "../store/store";
import { AiOutlineLoading } from "react-icons/ai";

export default function ProfileForm() {
  interface UserInfo {
    name: string;
    email: string;
    companyName: string;
    companyDept: string;
    companyPosition: string;
    memberStatus: "MANAGER" | "EMPLOYEE" | "INDIVIDUAL";
  }
  type Role = UserInfo["memberStatus"];

  const { isLogin } = useStore();
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const { setCautionOpen } = useOutletContext<{
    setCautionOpen: (open: boolean) => void;
  }>();
  const { setModalText } = useOutletContext<{
    setModalText: (text: string) => void;
  }>();
  const { setModalTitle } = useOutletContext<{
    setModalTitle: (title: string) => void;
  }>();

  const fetchUserInfo = async () => {
    try {
      const response = await api.get("api/my-info");
      if (response.status === 200) {
        setRole(response.data.memberStatus);
        setUserInfo(response.data);
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

  const openCautionModal = () => {
    setCautionOpen(true);
    setModalTitle("정말 탈퇴하시겠어요?");
    setModalText("회원 탈퇴 시, 계정은 삭제되며 복구되지 않습니다.");
  };

  useEffect(() => {
    if (!isLogin) {
      // 로그인되지 않았다면 로그인 페이지로 이동
      navigate("/login");
    } else {
      fetchUserInfo();
    }
  }, [navigate]);

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

  //로딩아이콘 띄우기
  if (userInfo == null) {
    return (
      <div className={profileStyle.profileContainer}>
        <div className={profileStyle.content}>
          <div className={profileStyle.iconContainer}>
            <AiOutlineLoading className={profileStyle.loadingIcon} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={profileStyle.profileContainer}>
      <div className={profileStyle.content}>
        <div className={profileStyle.titleContainer}>
          <span className={profileStyle.title}>마이페이지</span>
        </div>
        <div className={profileStyle.nameContainer}>
          <label>이름</label>
          <div className={profileStyle.nameDiv}>
            {/* <span className={profileStyle.name}>아년석</span> */}
            <span className={profileStyle.name}>{userInfo.name}</span>
          </div>
        </div>
        <div className={profileStyle.emailContainer}>
          <label>이메일</label>
          <div className={profileStyle.emailDiv}>
            {/* <span className={profileStyle.email}>vero1234@naver.com</span> */}
            <span className={profileStyle.email}>{userInfo.email}</span>
          </div>
        </div>
        {(role === "EMPLOYEE" || role === "MANAGER") && (
          <>
            <div className={profileStyle.companyContainer}>
              <label>회사명</label>
              <div className={profileStyle.companyDiv}>
                {/* <span className={profileStyle.company}>삼성전자</span> */}
                <span className={profileStyle.company}>
                  {userInfo.companyName}
                </span>
              </div>
            </div>
            <div className={profileStyle.deptContainer}>
              <label>부서명</label>
              <div className={profileStyle.deptDiv}>
                {/* <span className={profileStyle.dept}>SI</span> */}
                <span className={profileStyle.dept}>
                  {userInfo.companyDept}
                </span>
              </div>
            </div>
            <div className={profileStyle.positionContainer}>
              <label>직책</label>
              <div className={profileStyle.positionDiv}>
                {/* <span className={profileStyle.position}>BE-1년차</span> */}
                <span className={profileStyle.position}>
                  {userInfo.companyPosition}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      {role === "MANAGER" && (
        <div className={profileStyle.adminOptionsContainer}>
          <div className={profileStyle.firstBackground}>
            <Link
              style={{ textDecoration: "none" }}
              to="/main/profile/employeeList"
              className={profileStyle.showEmployeeListContainer}
            >
              <img src="../img/folder.svg" className={profileStyle.img} />
              <div className={profileStyle.tagContainer}>
                <span className={profileStyle.tag}>직원 명단 보기</span>
              </div>
            </Link>
          </div>
          <div className={profileStyle.secondBackground}>
            <Link
              style={{ textDecoration: "none" }}
              to="/main/profile/learningAI"
              className={profileStyle.learningAIContainer}
            >
              <img src="../img/learning.svg" className={profileStyle.img} />
              <div className={profileStyle.tagContainer}>
                <span className={profileStyle.tag}>AI 학습시키기</span>
              </div>
            </Link>
          </div>
        </div>
      )}
      <div className={profileStyle.form}>
        <button
          type="button"
          onClick={openCautionModal}
          className={profileStyle.exitBtn}
        >
          탈퇴하기
        </button>
        <button
          type="button"
          onClick={handleLogOut}
          className={profileStyle.logOutBtn}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
