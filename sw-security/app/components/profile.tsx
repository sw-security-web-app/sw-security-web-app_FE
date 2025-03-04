import { Link } from "@remix-run/react";
import nickNameHeader from "../css/nickNameHeader.module.css";

type Props = { nickNameColor: string; profileColor: string };
export default function Profile({ nickNameColor, profileColor }: Props) {
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
        닉네임
      </div>
      <div
        className={nickNameHeader.profile}
        style={{ backgroundColor: profileColor }}
      ></div>
    </div>
  );
}
