import { Link } from "@remix-run/react";
import joinStyle from "../../public/css/join.module.css";

export default function Join() {
  return (
    <div className={joinStyle.container}>
      <div className={joinStyle.header}>
        <div className={joinStyle.headerItems}>
          <div>
            <Link to="/">로고</Link>
          </div>
          <div className={joinStyle.login}>
            <Link to="/login">로그인</Link>
          </div>
        </div>
      </div>
      <div className={joinStyle.content}>
        <div className={joinStyle.inner}>
          <div className={joinStyle.select}>
            <div className={joinStyle.tag}>개인</div>
            <div className={joinStyle.imgContainer}>
              <Link to="/individualSignUp">
                <img
                  src="../../public/img/test.png"
                  className={joinStyle.img}
                />
              </Link>
            </div>
          </div>
          <div className={joinStyle.select}>
            <div className={joinStyle.tag}>관리자</div>
            <div className={joinStyle.imgContainer}>
              <Link to="/adminSignUp">
                <img
                  src="../../public/img/test.png"
                  className={joinStyle.img}
                />
              </Link>
            </div>
          </div>
          <div className={joinStyle.select}>
            <div className={joinStyle.tag}>직원</div>
            <div className={joinStyle.imgContainer}>
              <Link to="/employeeSignUp">
                <img
                  src="../../public/img/test.png"
                  className={joinStyle.img}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
