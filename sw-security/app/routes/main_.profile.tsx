import { Outlet } from "@remix-run/react";
import NickNameHeader from "~/components/nickNameHeader";
import adminStyle from "../css/admin.module.css";
import "../css/styles.module.css";
import { useState } from "react";
import modalStyle from "../css/modal.module.css";
import Modal from "~/components/modal";
import { useAuthRedirect } from "~/Hooks/useAuthRedirect";

export default function ProfileLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  useAuthRedirect();
  return (
    <>
      {isOpen && (
        <div className={modalStyle.overlay}>
          <Modal
            setIsOpen={setIsOpen}
            text={modalText}
            title={modalTitle}
            btnColor="#cb62ff"
          />
        </div>
      )}
      <div className={adminStyle.container}>
        <NickNameHeader color="#FFFFFF" />
        <Outlet
          context={{
            setIsOpen,
            setModalText,
            setModalTitle,
          }}
        />
      </div>
    </>
  );
}
