import api from "~/api/api";
import modalStyle from "../css/modal.module.css";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
  text: string;
  title: string;
};

export default function CautionModal({ setIsOpen, text, title }: Props) {
  const handleDelete = async () => {
    try {
      const response = await api.post("/api/delete");
      if (response.status === 200) {
        alert("탈퇴가 완료됐습니다.");
      } else {
        const error = await response.data;
        alert(error.message);
      }
    } catch (error) {
      console.error("Error");
    } finally {
      setIsOpen(false);
    }
  };
  return (
    <div className={modalStyle.modalContainer}>
      <div className={modalStyle.modalHeader}>
        <span className={modalStyle.headerText}>{title}</span>
        <button
          className={modalStyle.closeBtn}
          onClick={() => setIsOpen(false)}
        >
          <img
            src="../../img/modalClose.svg"
            alt="close"
            onClick={() => setIsOpen(false)}
          />
        </button>
      </div>
      <div className={modalStyle.modalContent}>
        <span className={modalStyle.contentText}>{text}</span>
      </div>
      <div className={modalStyle.modalBtnDiv}>
        <button
          className={modalStyle.cancelModalBtn}
          onClick={() => setIsOpen(false)}
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
