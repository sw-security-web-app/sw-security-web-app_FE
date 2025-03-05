import { Link } from "@remix-run/react";
import nickNameHeader from "../css/nickNameHeader.module.css";

type Props = { nickNameColor: string; profileColor: string };
export default function Profile({ nickNameColor, profileColor }: Props) {
  const isBrowser = typeof window !== "undefined"; // 브라우저에서만 실행되도록 체크
  const userName = isBrowser ? localStorage.getItem("userName") : null; // 브라우저에서만 localStorage 접근
  return (
    // <Link to="/main/profile" style={{ textDecoration: "none" }}>
    //   <div className={nickNameHeader.container}>
    //     <div
    //       className={nickNameHeader.nickname}
    //       style={{ color: nickNameColor }}
    //     >
    //       닉네임
    //     </div>
    //     <div
    //       className={nickNameHeader.profile}
    //       style={{ backgroundColor: profileColor }}
    //     ></div>
    //   </div>
    // </Link>

    <div className={nickNameHeader.container}>
      <div className={nickNameHeader.nickname} style={{ color: nickNameColor }}>
        {userName}
      </div>
      <div
        className={nickNameHeader.profile}
        style={{ backgroundColor: profileColor }}
      ></div>
    </div>
  );
}
