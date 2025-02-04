import { Link } from "@remix-run/react";
import joinStyle from "../../public/css/join.module.css";
import defaultStyle from "../../public/css/default.module.css";
import LoginHeader from "~/components/loginHeader";

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
          {/* 다이아몬드 세 개 */}
          {/* <div className={joinStyle.diamond}></div>
          <div className={joinStyle.diamond}></div>
          <div className={joinStyle.diamond}></div> */}
          <div className={joinStyle.selectContainer}>
            <Link to="/individualSignUp" className={joinStyle.select}>
              <div className={joinStyle.imgContainer}>
                {/* <img
                    src="../../public/img/test.png"
                    className={joinStyle.img}
                  /> */}
              </div>
              <div className={joinStyle.tag}>개인</div>
            </Link>
            <Link to="/adminSignUp" className={joinStyle.select}>
              <div className={joinStyle.imgContainer}>
                {/* <img
                    src="../../public/img/test.png"
                    className={joinStyle.img}
                  /> */}
                <div className={joinStyle.tag}>관리자</div>
              </div>
            </Link>
            <Link to="/employeeSignUp" className={joinStyle.select}>
              <div className={joinStyle.imgContainer}>
                {/* <img
                    src="../../public/img/test.png"
                    className={joinStyle.img}
                  /> */}
                <div className={joinStyle.tag}>직원</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
