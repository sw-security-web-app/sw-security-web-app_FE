import { Outlet } from "@remix-run/react";
import NickNameHeader from "~/components/nickNameHeader";
import "../css/styles.module.css";

export default function ProfileLayout() {
  return (
    <div>
      <NickNameHeader color="#FFFFFF" />
      <Outlet />
    </div>
  );
}
