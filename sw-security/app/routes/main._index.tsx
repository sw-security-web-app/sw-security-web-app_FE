import { Link } from "@remix-run/react";
import mainStyle from "../../public/css/main.module.css";
import defaultStyle from "../../public/css/default.module.css";
import NickNameHeader from "~/components/nickNameHeader";

export default function Join() {
  return (
    <div className={defaultStyle.container}>
      <NickNameHeader />

      <div className={defaultStyle.content}>
        <div className={defaultStyle.inner}>
          <div className={mainStyle.textContainer}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <div className={mainStyle.text1Container}>
                <span className={mainStyle.text1}>AI 선택하기</span>
              </div>
            </Link>
            <div className={mainStyle.text2Container}>
              <span className={mainStyle.text2}>AI 선택</span>
            </div>
            <div className={mainStyle.text3Container}>
              <span className={mainStyle.text3}>
                사용하실 AI를 선택해주세요
              </span>
            </div>
          </div>
          <div className={mainStyle.aiSelectContainer}>
            <div className={mainStyle.aiSelect}></div>
            <div className={mainStyle.aiSelect}></div>
            <div className={mainStyle.aiSelect}></div>
          </div>
          <div className={mainStyle.eclipseDiv}>
            <div className={mainStyle.eclipseBlur} />
          </div>
        </div>
      </div>
    </div>
  );
}
