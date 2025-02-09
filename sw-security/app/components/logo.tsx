import { Link } from "@remix-run/react";
import logoStyle from "../css/logo.module.css";

type Props = { color: string };
export default function Logo({ color = "white" }: Props) {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <div className={logoStyle.container}>
        <div className={logoStyle.img} style={{ backgroundColor: color }}></div>
        <div className={logoStyle.text}>LOGO</div>
      </div>
    </Link>
  );
}
