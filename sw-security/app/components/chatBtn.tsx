import chatBtnStyle from "../css/chatBtn.module.css";

type Props = {
  onClick: () => void;
};

export default function ChatBtn({ onClick }: Props) {
  return (
    <button className={chatBtnStyle.btnContainer} onClick={onClick}>
      <img src="../../img/chatSubmit.svg" alt="chatSubmit" />
    </button>
  );
}
