import { Link } from "@remix-run/react";
import nickNameHeader from "../css/nickNameHeader.module.css";
import Logo from "./logo";
import Profile from "./profile";

type Props = { color: string };
export default function NickNameHeader({ color = "#0d0d0d" }: Props) {
  const logoColor: "white" | string = color === "#0d0d0d" ? "white" : "#484B50";
  const nickNameColor: "#B7BDC7" | string =
    color === "#0d0d0d" ? "#B7BDC7" : "#484B50";
  const profileColor: "#FFFFFF" | string =
    color === "#0d0d0d" ? "#FFFFFF" : "#8C919B";

  return (
    <div className={nickNameHeader.header} style={{ backgroundColor: color }}>
      <div className={nickNameHeader.headerItems}>
        <Logo color={logoColor} />
        <Profile nickNameColor={nickNameColor} profileColor={profileColor} />
      </div>
    </div>
  );
}
