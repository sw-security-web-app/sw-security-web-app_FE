import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import nickNameHeader from "../css/nickNameHeader.module.css";
import { GoPerson } from "react-icons/go";

type Props = { nickNameColor: string; profileColor: string };

export default function Profile({ nickNameColor, profileColor }: Props) {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // 클라이언트에서만 localStorage 접근
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName);
  }, []); // 컴포넌트가 마운트될 때만 실행

  return (
    <div className={nickNameHeader.container}>
      <div className={nickNameHeader.nickname} style={{ color: nickNameColor }}>
        {userName}
      </div>
      <div
        className={nickNameHeader.profile}
        style={{ backgroundColor: profileColor }}
      >
        <img
          src="img/profile.png"
          alt="profile"
          style={{ width: "2.8rem", height: "2.8rem", borderRadius: "100%" }}
        />
      </div>
    </div>
  );
}
