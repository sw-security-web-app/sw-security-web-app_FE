import { Link } from "@remix-run/react";
import loginHeaderStyle from "../css/loginHeader.module.css";
import Logo from "./logo";
import DefaultButton from "./defautlButton";

export default function SignUpHeader() {
  return (
    <div className={loginHeaderStyle.header}>
      <div className={loginHeaderStyle.headerItems}>
        <Logo color="white" to="/" />
        {/* <div className={loginHeaderStyle.none}>none</div> */}
      </div>
    </div>
  );
}
