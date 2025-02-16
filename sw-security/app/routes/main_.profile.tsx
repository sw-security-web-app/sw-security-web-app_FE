import { Outlet } from "@remix-run/react";
import NickNameHeader from "~/components/nickNameHeader";
import adminStyle from "../css/admin.module.css";
import "../css/styles.module.css";

export default function ProfileLayout() {
  return (
    <div className={adminStyle.container}>
      <NickNameHeader color="#FFFFFF" />
      <Outlet />
    </div>
  );
}
