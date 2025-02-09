import styles from "../css/defaultBtn.module.css";

type ButtonProps = {
  text: string;
  fontSize?: number;
  size?: "small" | "medium" | "large";
  fontWeight?: number;
  onClick: () => void;
};

export default function DefaultButton({
  text,
  size = "medium",
  onClick,
  fontSize = 17,
  fontWeight = 400, // 기본값을 500으로 설정
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[size]}`}
      onClick={onClick}
      style={{ fontSize: `${fontSize}px`, fontWeight }}
    >
      {text}
    </button>
  );
}
