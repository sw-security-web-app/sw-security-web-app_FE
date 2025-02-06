import { Link } from "@remix-run/react";
import nickNameHeader from "../../public/css/nickNameHeader.module.css";
export default function Profile() {
  return (
    <Link to="/main/profile" style={{ textDecoration: "none" }}>
      <div className={nickNameHeader.container}>
        <div className={nickNameHeader.nickname}>닉네임</div>
        <div className={nickNameHeader.profile}></div>
      </div>
    </Link>
  );
}
