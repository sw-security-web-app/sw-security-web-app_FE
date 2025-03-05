import { Link } from "@remix-run/react";
import joinStyle from "../css/join.module.css";
import defaultStyle from "../css/default.module.css";
import LoginHeader from "~/components/loginHeader";
import "../css/styles.module.css";

export default function Join() {
  return (
    <div className={defaultStyle.container}>
      <LoginHeader />
      <div className={defaultStyle.content}>
        <div className={defaultStyle.inner}>
          <div className={joinStyle.textContainer}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <div className={joinStyle.text1Container}>
                <span className={joinStyle.text1}>시작하기</span>
              </div>
            </Link>
            <div className={joinStyle.text2Container}>
              <span className={joinStyle.text2}>가입 유형 선택</span>
            </div>
            <div className={joinStyle.text3Container}>
              <span className={joinStyle.text3}>
                서비스를 사용하기 위해 회원 가입 유형을 선택해주세요
              </span>
            </div>
          </div>
          <div className={joinStyle.circlePoint}>
            <div className={joinStyle.circle} />
          </div>
          <div className={joinStyle.selectContainer}>
            <Link to="/individualSignUp" className={joinStyle.select}>
              <div className={joinStyle.tagContainer}>
                <span className={joinStyle.tag}>개인</span>
                <span className={joinStyle.addTag}>14세 이상 개인 사용자</span>
              </div>
              <div className={joinStyle.imgContainer}>
                <img src="/img/individual.svg" className={joinStyle.img} />
              </div>
            </Link>
            <Link to="/adminSignUp" className={joinStyle.select}>
              <div className={joinStyle.tagContainer}>
                <span className={joinStyle.tag}>관리자</span>
                <span className={joinStyle.addTag}>직원 관리 기능 제공</span>
              </div>
              <div className={joinStyle.imgContainer}>
                <img src="/img/admin.svg" className={joinStyle.img} />
              </div>
            </Link>
            <Link to="/employeeSignUp" className={joinStyle.select}>
              <div className={joinStyle.tagContainer}>
                <span className={joinStyle.tag}>직원</span>
                <span className={joinStyle.addTag}>기업에 소속된 사용자</span>
              </div>
              <div className={joinStyle.imgContainer}>
                <img src="/img/employee.svg" className={joinStyle.img} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
