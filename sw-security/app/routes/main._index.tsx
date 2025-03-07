import { Link, useNavigate, useOutletContext } from "@remix-run/react";
import mainStyle from "../css/main.module.css";
import defaultStyle from "../css/default.module.css";
import NickNameHeader from "~/components/nickNameHeader";
import AISelect from "~/components/aiSelect";
import { useEffect } from "react";

export default function Main() {
  const { setIsOpen } = useOutletContext<{
    setIsOpen: (open: boolean) => void;
  }>();
  const { setModalText } = useOutletContext<{
    setModalText: (text: string) => void;
  }>();
  const { setModalTitle } = useOutletContext<{
    setModalTitle: (title: string) => void;
  }>();
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
        <AISelect
          aiName="Gemini"
          setIsOpen={setIsOpen}
          setModalText={setModalText}
          setModalTitle={setModalTitle}
        />
        <AISelect
          aiName="Claude"
          setIsOpen={setIsOpen}
          setModalText={setModalText}
          setModalTitle={setModalTitle}
        />
        <AISelect
          aiName="ChatGPT"
          setIsOpen={setIsOpen}
          setModalText={setModalText}
          setModalTitle={setModalTitle}
        />
      </div>
      <div className={mainStyle.eclipseDiv}>
        <div className={mainStyle.eclipseBlur} />
      </div>
    </div>
  );
}
