import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      <div>로고</div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        veritatis minus libero quaerat aperiam quam iure ut explicabo fugit,
        corrupti asperiores soluta neque magni, sint laborum maiores quia
        eligendi iste.
      </p>
      <Link to="/join">Start!!</Link>
    </div>
  );
}
