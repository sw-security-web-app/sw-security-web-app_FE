import { Link } from "@remix-run/react";
import nickNameHeader from "../css/nickNameHeader.module.css";
import Logo from "./logo";
import Profile from "./profile";
import ProfileModal from "./ProfileModal";
import { useEffect, useState } from "react";
import api from "~/api/api";
import { GrUserAdmin } from "react-icons/gr";

type Props = {
  color: string;
  setCodeOpen: (isOpen: boolean) => void;
  setTitle: (title: string) => void;
  setText: (text: string) => void;
};
export default function NickNameHeader({
  color = "#0d0d0d",
  setCodeOpen,
  setTitle,
  setText,
}: Props) {
  const fetchCode = async () => {
    try {
      const response = await api.get("/api/company-code");
      if (response.status === 200) {
        setCodeOpen(true);
        setTitle("회사코드");
        setText(response.data.companyCode);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      alert(errorMessage);
    }
  };
  const [role, setRole] = useState<string | null>("INDIVIDUAL");
  const nickNameColor: "#B7BDC7" | string =
    color === "#0d0d0d" ? "#B7BDC7" : "#484B50";
  // const profileColor: "#FFFFFF" | string =
  //   color === "#0d0d0d" ? "#FFFFFF" : "#8C919B";
  useEffect(() => {
    const stroedRole = localStorage.getItem("role");
    setRole(stroedRole);
  }, []);
  return (
    <div className={nickNameHeader.header} style={{ backgroundColor: color }}>
      <div className={nickNameHeader.headerItems}>
        <Logo to="/main" />
        <div className={nickNameHeader.rightItem}>
          {role === "MANAGER" ? (
            <button
              onClick={fetchCode}
              className={nickNameHeader.compnayCodeBtn}
            >
              <GrUserAdmin
                style={{ color: nickNameColor }}
                className={nickNameHeader.codeAicon}
              />
            </button>
          ) : null}
          <div className={nickNameHeader.profileContainer}>
            <Profile
              nickNameColor={nickNameColor}
              // profileColor={profileColor}
            />
            <ProfileModal />
          </div>
        </div>
      </div>
    </div>
  );
}
