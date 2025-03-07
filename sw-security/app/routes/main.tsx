import { Link, Outlet, useNavigate } from "@remix-run/react";
import defaultStyle from "../css/default.module.css";
import NickNameHeader from "~/components/nickNameHeader";
import signupStyle from "../css/signup.module.css";
import "../css/styles.module.css";
import modalStyle from "../css/modal.module.css";
import { useLocalStorage, useStore } from "../store/store";
import { useEffect, useState } from "react";
import CautionModal from "~/components/cautionModal";
import Modal from "~/components/modal";
import CodeModal from "~/components/codeModal";
export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [cautionOpen, setCautionOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  useLocalStorage();
  return (
    <>
      {cautionOpen && (
        <div className={modalStyle.overlay}>
          <CautionModal
            setCautionOpen={setCautionOpen}
            text={modalText}
            title={modalTitle}
          />
        </div>
      )}
      {isOpen && (
        <div className={modalStyle.overlay}>
          <Modal setIsOpen={setIsOpen} text={modalText} title={modalTitle} />
        </div>
      )}
      {codeOpen && (
        <div className={modalStyle.overlay}>
          <CodeModal setCodeOpen={setCodeOpen} text={text} title={title} />
        </div>
      )}
      <div className={defaultStyle.container}>
        <NickNameHeader
          setCodeOpen={setCodeOpen}
          setTitle={setTitle}
          setText={setText}
          color="#0d0d0d"
        />
        <div className={defaultStyle.content}>
          <Outlet
            context={{
              setIsOpen,
              setModalText,
              setModalTitle,
              setCautionOpen,
            }}
          />
        </div>
      </div>
    </>
  );
}
