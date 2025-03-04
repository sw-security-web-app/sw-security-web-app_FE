import { Link, Outlet } from "@remix-run/react";
import defaultStyle from "../css/default.module.css";
import NickNameHeader from "~/components/nickNameHeader";
import "../css/styles.module.css";
import { useStore } from "../store/store";
import { useState } from "react";
export default function Join() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const { isLogin } = useStore();
  return (
    <div className={defaultStyle.container}>
      <NickNameHeader color="#0d0d0d" />
      <div className={defaultStyle.content}>
        <Outlet context={{ setIsOpen, setModalText, setModalTitle }} />
      </div>
    </div>
  );
}
