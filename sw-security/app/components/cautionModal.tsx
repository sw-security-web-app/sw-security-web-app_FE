import api from "~/api/api";
import modalStyle from "../css/modal.module.css";
import { useNavigate } from "@remix-run/react";
type Props = {
  setCautionOpen: (isOpen: boolean) => void;
  text: string;
  title: string;
};

export default function CautionModal({ setCautionOpen, text, title }: Props) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await api.delete("/api/auth/secession");
      if (response.status === 200) {
        alert("탈퇴가 완료됐습니다.");
        navigate("/login");
      } else {
        const error = await response.data;
        alert(error.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      alert(errorMessage);
    } finally {
      setCautionOpen(false);
    }
  };
  return (
    <div className={modalStyle.modalContainer}>
      <div className={modalStyle.modalHeader}>
        <span className={modalStyle.headerText}>{title}</span>
        <button
          className={modalStyle.closeBtn}
          onClick={() => setCautionOpen(false)}
        >
          <img
            src="../../img/modalClose.svg"
            alt="close"
            onClick={() => setCautionOpen(false)}
          />
        </button>
      </div>
      <div className={modalStyle.modalContent}>
        <span className={modalStyle.contentText}>{text}</span>
      </div>
      <div className={modalStyle.modalBtnDiv}>
        <button
          className={modalStyle.cancelModalBtn}
          onClick={() => setCautionOpen(false)}
        >
          취소
        </button>
        <button className={modalStyle.deleteModalBtn} onClick={handleDelete}>
          탈퇴
        </button>
      </div>
    </div>
  );
}
