import { Link } from "@remix-run/react";
import joinStyle from "../../public/css/join.module.css";
import DefaultButton from "../components/defautlButton";
import Logo from "~/components/logo";

export default function Join() {
  return (
    <div className={joinStyle.container}>
      <div className={joinStyle.header}>
        <div className={joinStyle.headerItems}>
          <Logo />
          <div className={joinStyle.login}>
            <Link to="/login">
              <DefaultButton
                text="로그인"
                fontWeight={700}
                size="small"
                onClick={() => {}}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className={joinStyle.content}>
        <div className={joinStyle.inner}>
          <div className={joinStyle.textContainer}>
            <div className={joinStyle.text1Container}>
              <span className={joinStyle.text1}>시작하기</span>
            </div>
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
          <div className={joinStyle.diamond}></div>
          <div className={joinStyle.diamond}></div>
          <div className={joinStyle.diamond}></div>
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
