import { Link } from "@remix-run/react";
import logoStyle from "../../public/css/logo.module.css";

export default function Logo() {
  return (
    <div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className={logoStyle.container}>
          <div className={logoStyle.img}></div>
          <div className={logoStyle.text}>LOGO</div>
        </div>
      </Link>
    </div>
  );
}
