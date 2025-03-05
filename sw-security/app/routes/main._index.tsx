import { Link, useNavigate, useOutletContext } from "@remix-run/react";
import mainStyle from "../css/main.module.css";
import defaultStyle from "../css/default.module.css";
import NickNameHeader from "~/components/nickNameHeader";
import AISelect from "~/components/aiSelect";
import { useEffect } from "react";

export default function Join() {
  return (
    <div className={defaultStyle.inner}>
      <div className={mainStyle.textContainer}>
        <div className={mainStyle.text1Container}>
          <span className={mainStyle.text1}>AI 선택하기</span>
        </div>

        <div className={mainStyle.text2Container}>
          <span className={mainStyle.text2}>AI 선택</span>
        </div>
        <div className={mainStyle.text3Container}>
          <span className={mainStyle.text3}>사용하실 AI를 선택해주세요</span>
        </div>
      </div>
      <div className={mainStyle.aiSelectContainer}>
        <AISelect aiName="Gemini" />
        <AISelect aiName="Claude" />
        <AISelect aiName="ChatGPT" />
      </div>
      <div className={mainStyle.eclipseDiv}>
        <div className={mainStyle.eclipseBlur} />
      </div>
    </div>
  );
}
