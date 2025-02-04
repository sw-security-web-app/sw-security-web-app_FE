import { Link } from "@remix-run/react";
import loginHeaderStyle from "../../public/css/loginHeader.module.css";
import Logo from "./logo";
import DefaultButton from "./defautlButton";

export default function LoginHeader() {
  return (
    <div className={loginHeaderStyle.header}>
      <div className={loginHeaderStyle.headerItems}>
        <Logo />
        <div className={loginHeaderStyle.login}>
          <Link to="/login">
            <DefaultButton
              text="로그인"
              fontWeight={700}
              size="small"
              onClick={() => {}}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
