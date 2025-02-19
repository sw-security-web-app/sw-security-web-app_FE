import signupStyle from "../css/signup.module.css";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
  text: string;
  title: string;
};

export default function Modal({ setIsOpen, text, title }: Props) {
  return (
    <div className={signupStyle.modalContainer}>
      <div className={signupStyle.modalHeader}>
        <span className={signupStyle.headerText}>{title}</span>
        <button
          className={signupStyle.closeBtn}
          onClick={() => setIsOpen(false)}
        >
          <img
            src="../../img/modalClose.svg"
            alt="close"
            onClick={() => setIsOpen(false)}
          />
        </button>
      </div>
      <div className={signupStyle.modalContent}>
        <span className={signupStyle.contentText}>{text}</span>
      </div>
      <div className={signupStyle.modalBtnDiv}>
        <button
          className={signupStyle.modalBtn}
          onClick={() => setIsOpen(false)}
        >
          확인
        </button>
      </div>
    </div>
  );
}
