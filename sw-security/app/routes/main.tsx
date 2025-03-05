import { Link, Outlet, useNavigate } from "@remix-run/react";
import defaultStyle from "../css/default.module.css";
import NickNameHeader from "~/components/nickNameHeader";
import signupStyle from "../css/signup.module.css";
import "../css/styles.module.css";
import modalStyle from "../css/modal.module.css";
import { useStore } from "../store/store";
import { useEffect, useState } from "react";
import CautionModal from "~/components/cautionModal";
import { useAuthRedirect } from "~/Hooks/useAuthRedirect";
export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  // useAuthRedirect();

  return (
    <>
      {isOpen && (
        <div className={modalStyle.overlay}>
          <CautionModal
            setIsOpen={setIsOpen}
            text={modalText}
            title={modalTitle}
          />
        </div>
      )}
      <div className={defaultStyle.container}>
        <NickNameHeader color="#0d0d0d" />
        <div className={defaultStyle.content}>
          <Outlet
            context={{
              setIsOpen,
              setModalText,
              setModalTitle,
            }}
          />
        </div>
      </div>
    </>
  );
}
