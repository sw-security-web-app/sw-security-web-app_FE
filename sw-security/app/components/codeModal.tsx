import modalStyle from "../css/modal.module.css";

type Props = {
  setCodeOpen: (isOpen: boolean) => void;
  text: string;
  title: string;
  // btnColor: string;
};

export default function CodeModal({ setCodeOpen, text, title }: Props) {
  return (
    <div className={modalStyle.modalContainer}>
      <div className={modalStyle.modalHeader}>
        <span className={modalStyle.headerText}>{title}</span>
        <button
          className={modalStyle.closeBtn}
          onClick={() => setCodeOpen(false)}
        >
          <img
            src="../../img/modalClose.svg"
            alt="close"
            onClick={() => setCodeOpen(false)}
          />
        </button>
      </div>
      <div className={modalStyle.modalContent2}>
        <span className={modalStyle.contentText2}>{text}</span>
      </div>
      <div className={modalStyle.modalBtnDiv}>
        <button
          className={modalStyle.modalBtn}
          // style={{ backgroundColor: btnColor }}
          onClick={() => setCodeOpen(false)}
        >
          확인
        </button>
      </div>
    </div>
  );
}
