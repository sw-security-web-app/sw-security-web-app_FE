import { Link, Outlet } from "@remix-run/react";
import authStyle from "../../public/css/auth.module.css";
import defaultStyle from "../../public/css/default.module.css";
import SignUpHeader from "~/components/signUpHeader";

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
