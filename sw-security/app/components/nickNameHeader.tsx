import { Link } from "@remix-run/react";
import nickNameHeader from "../../public/css/nickNameHeader.module.css";
import Logo from "./logo";
import Profile from "./profile";

export default function NickNameHeader() {
  return (
    <div className={nickNameHeader.header}>
      <div className={nickNameHeader.headerItems}>
        <Logo />
        <Profile />
      </div>
    </div>
  );
}
