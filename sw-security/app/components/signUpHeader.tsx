import { Link } from "@remix-run/react";
import loginHeaderStyle from "../../public/css/loginHeader.module.css";
import Logo from "./logo";
import DefaultButton from "./defautlButton";

export default function SignUpHeader() {
  return (
    <div className={loginHeaderStyle.header}>
      <div className={loginHeaderStyle.headerItems}>
        <Logo />
      </div>
    </div>
  );
}
