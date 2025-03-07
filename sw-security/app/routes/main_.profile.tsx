import { Outlet } from "@remix-run/react";
import NickNameHeader from "~/components/nickNameHeader";
import adminStyle from "../css/admin.module.css";
import "../css/styles.module.css";
import { useState } from "react";
import modalStyle from "../css/modal.module.css";
import Modal from "~/components/modal";
import { useAuthRedirect } from "~/Hooks/useAuthRedirect";
import { AiOutlineLoading } from "react-icons/ai";
import CodeModal from "~/components/codeModal";

export default function ProfileLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  useAuthRedirect();
  return (
    <>
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
      {loading && (
        <div className={adminStyle.overlay}>
          <AiOutlineLoading className={adminStyle.loadingIcon2} />
        </div>
      )}
      <div className={adminStyle.container}>
        <NickNameHeader
          color="#FFFFFF"
          setCodeOpen={setCodeOpen}
          setTitle={setTitle}
          setText={setText}
        />
        <Outlet
          context={{
            setIsOpen,
            setModalText,
            setModalTitle,
            setLoading,
          }}
        />
      </div>
    </>
  );
}
