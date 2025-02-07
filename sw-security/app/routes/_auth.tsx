import { Link, Outlet } from "@remix-run/react";
import authStyle from "../css/auth.module.css";
import SignUpHeader from "~/components/signUpHeader";
import "../css/styles.module.css";

export default function Join() {
  return (
    <div className={authStyle.container}>
      <SignUpHeader />
      <div className={authStyle.content}>
        <div className={authStyle.inner}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
