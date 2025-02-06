import { Link, Outlet } from "@remix-run/react";
import mainStyle from "../../public/css/main.module.css";
import defaultStyle from "../../public/css/default.module.css";
import NickNameHeader from "~/components/nickNameHeader";
import AISelect from "~/components/aiSelect";

export default function Join() {
  return (
    <div className={defaultStyle.container}>
      <NickNameHeader />

      <div className={defaultStyle.content}>
        <Outlet />
      </div>
    </div>
  );
}
