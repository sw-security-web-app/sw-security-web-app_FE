import { Link } from "@remix-run/react";
import joinStyle from "../../public/css/join.module.css";

export default function Join() {
  return (
    <div className={joinStyle.container}>
      <div className={joinStyle.header}>
        <div className={joinStyle.headerItems}>
          <div>로고</div>
          <div className={joinStyle.login}>
            <Link to="/login">로그인</Link>
          </div>
        </div>
      </div>
      <div className={joinStyle.content}>
        <div className={joinStyle.inner}>
          <div className={joinStyle.select}>
            <div>
              <Link to="/individual">개인</Link>
            </div>
          </div>
          <div className={joinStyle.select}>
            <div>
              <Link to="/admin">관리자</Link>
            </div>
          </div>
          <div className={joinStyle.select}>
            <div>
              <Link to="/employee">직원</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
