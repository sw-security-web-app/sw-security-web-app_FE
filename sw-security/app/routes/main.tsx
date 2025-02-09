import { Link, Outlet } from "@remix-run/react";
import defaultStyle from "../css/default.module.css";
import NickNameHeader from "~/components/nickNameHeader";
import "../css/styles.module.css";

export default function Join() {
  return (
    <div className={defaultStyle.container}>
      <NickNameHeader color="#0d0d0d" />
      <div className={defaultStyle.content}>
        <Outlet />
      </div>
    </div>
  );
}
