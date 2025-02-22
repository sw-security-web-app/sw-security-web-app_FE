import { Link } from "@remix-run/react";
import logoStyle from "../css/logo.module.css";

type Props = {
  to: string;
};

export default function Logo({ to = "/" }: Props) {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <div className={logoStyle.container}>
        <img
          src="../../img/logo.svg"
          alt="logo"
          className={logoStyle.img}
        ></img>
        <div className={logoStyle.text}>VERO</div>
      </div>
    </Link>
  );
}
