import { Link, useNavigate } from "@remix-run/react";
import mainStyle from "../css/main.module.css";
import api from "~/api/api";

type Prop = { aiName: string };

export default function AISelect({ aiName }: Prop) {
  const navigate = useNavigate();
  const confirmLearning = async () => {
    try {
      const response = await api.get("/api/company-check");
      if (response.status === 200) {
        navigate(`/main/chatMain?ai=${aiName}`);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      alert(errorMessage);
    }
  };

  return (
    // <Link
    //   to={`/main/chatMain?ai=${aiName}`}
    //   style={{ textDecoration: "none" }}
    //   className={mainStyle.aiSelect}
    // >
    //   <div className={mainStyle.imgContainer}>
    //     <img
    //       src={`/img/${aiName}.svg`}
    //       className={mainStyle.img}
    //       alt={aiName}
    //     />
    //   </div>
    //   <div className={mainStyle.tagContainer}>
    //     <span className={mainStyle.tag}>{aiName}</span>
    //   </div>
    // </Link>
    <div className={mainStyle.aiSelect} onClick={confirmLearning}>
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
    </div>
  );
}
