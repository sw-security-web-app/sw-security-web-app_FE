import { Outlet } from "@remix-run/react";
import SignUpHeader from "../components/signUpHeader";

export default function LoginLayout() {
  return (
    <div>
      <SignUpHeader />
      <Outlet />
    </div>
  );
}
