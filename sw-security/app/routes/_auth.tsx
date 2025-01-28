import { Link, Outlet } from "@remix-run/react";
import authStyle from "../../public/css/auth.module.css";

export default function Join() {
  return (
    <div className={authStyle.container}>
      <div className={authStyle.header}>
        <div className={authStyle.logo}>
          <div>
            <Link to="/">로고</Link>
          </div>
        </div>
      </div>
      <div className={authStyle.content}>
        <Outlet />
      </div>
    </div>
  );
}
