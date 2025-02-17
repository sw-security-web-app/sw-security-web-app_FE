import { useParams, useSearchParams } from "@remix-run/react";

export default function ChatMain() {
  const { ai } = useParams();

  return (
    <div>
      <h2>{ai}와의 대화</h2>
    </div>
  );
}
