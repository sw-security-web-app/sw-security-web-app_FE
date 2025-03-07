import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import nickNameHeader from "../css/nickNameHeader.module.css";
import { BsPersonFill } from "react-icons/bs";

type Props = { nickNameColor: string };

export default function Profile({ nickNameColor }: Props) {
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
        style={{ border: "0.1rem solid", borderColor: nickNameColor }}
      >
        <BsPersonFill
          className={nickNameHeader.profileIcon}
          style={{ color: nickNameColor }}
        />
      </div>
    </div>
  );
}
