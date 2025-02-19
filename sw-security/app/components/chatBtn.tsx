import chatBtnStyle from "../css/chatBtn.module.css";

type Props = {
  onClick: () => void;
  loading: boolean;
};

export default function ChatBtn({ onClick, loading }: Props) {
  return (
    <button
      className={`${chatBtnStyle.btnContainer} ${
        loading ? chatBtnStyle.loading : ""
      }`}
      onClick={onClick}
      disabled={loading}
    >
      <img src="../../img/chatSubmit.svg" alt="chatSubmit" />
    </button>
  );
}
