import { Link } from "@remix-run/react";
import mainStyle from "../css/main.module.css";

type Prop = { aiName: string };

export default function AISelect({ aiName }: Prop) {
  return (
    <Link
      to={`/main/chatMain?ai=${aiName}`}
      style={{ textDecoration: "none" }}
      className={mainStyle.aiSelect}
    >
      <div className={mainStyle.imgContainer}>
        <img
          src={`/img/${aiName}.svg`}
          className={mainStyle.img}
          alt={aiName}
        />
      </div>
      <div className={mainStyle.tagContainer}>
        <span className={mainStyle.tag}>{aiName}</span>
      </div>
    </Link>
  );
}
