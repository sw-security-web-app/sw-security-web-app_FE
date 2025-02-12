import { Link } from "@remix-run/react";
import loginHeaderStyle from "../css/loginHeader.module.css";
import Logo from "./logo";
import DefaultButton from "./defautlButton";

export default function LoginHeader() {
  return (
    <div className={loginHeaderStyle.header}>
      <div className={loginHeaderStyle.headerItems}>
        <Logo color="white" to="/" />

        <Link to="/login" className={loginHeaderStyle.login}>
          <DefaultButton
            text="로그인"
            fontWeight={700}
            size="small"
            onClick={() => {}}
          />
        </Link>
      </div>
    </div>
  );
}
