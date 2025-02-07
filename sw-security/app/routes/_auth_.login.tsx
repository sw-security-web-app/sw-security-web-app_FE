import { Outlet } from "@remix-run/react";
import SignUpHeader from "~/components/signUpHeader";
import "../css/styles.module.css";

export default function LoginLayout() {
  return (
    <div>
      <SignUpHeader />
      <Outlet />
    </div>
  );
}
