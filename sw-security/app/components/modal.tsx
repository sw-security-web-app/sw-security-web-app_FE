import modalStyle from "../css/modal.module.css";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
  text: string;
  title: string;
  btnColor: string;
};

export default function Modal({ setIsOpen, text, title, btnColor }: Props) {
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
          className={modalStyle.modalBtn}
          style={{ backgroundColor: btnColor }}
          onClick={() => setIsOpen(false)}
        >
          확인
        </button>
      </div>
    </div>
  );
}
