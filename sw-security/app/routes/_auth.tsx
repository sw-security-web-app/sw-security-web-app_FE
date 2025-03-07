import { Link, Outlet } from "@remix-run/react";
import { useState } from "react";
import authStyle from "../css/auth.module.css";
import SignUpHeader from "~/components/signUpHeader";
import Modal from "~/components/modal"; // 모달 컴포넌트 import
import modalStyle from "../css/modal.module.css";

export default function AuthLayOut() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  return (
    <>
      {isOpen && (
        <div className={modalStyle.overlay}>
          <Modal setIsOpen={setIsOpen} text={modalText} title={modalTitle} />
        </div>
      )}
      <div className={authStyle.container}>
        <SignUpHeader />
        <div className={authStyle.content}>
          <div className={authStyle.inner}>
            <Outlet context={{ setModalText, setModalTitle, setIsOpen }} />
          </div>
        </div>
      </div>
    </>
  );
}
