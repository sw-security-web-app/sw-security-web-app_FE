import { Link, Outlet } from "@remix-run/react";
import defaultStyle from "../css/default.module.css";
import NickNameHeader from "~/components/nickNameHeader";
import "../css/styles.module.css";
import { useStore } from "../store/store";
export default function Join() {
  const { isLogin } = useStore();
  return (
    <div className={defaultStyle.container}>
      <NickNameHeader color="#0d0d0d" />
      <div className={defaultStyle.content}>
        <Outlet />
      </div>
    </div>
  );
}
