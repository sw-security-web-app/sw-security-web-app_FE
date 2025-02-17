import { useSearchParams, Link } from "@remix-run/react";

export default function ChatMain() {
  const [searchParams] = useSearchParams();
  const ai = searchParams.get("ai") || "AI"; // 기본값 설정

  return (
    <div>
      <div>{ai}와의 채팅</div>
      <p>대화를 시작하려면 아래 버튼을 눌러주세요.</p>
      <Link to={`/main/chatMain/${ai}`}>대화 시작</Link>
    </div>
  );
}
