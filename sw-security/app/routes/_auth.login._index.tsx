import { Link } from "@remix-run/react";

export default function Login() {
  return (
    <div>
      <h1>로그인</h1>
      <form>
        <div className="emailDiv">
          <label htmlFor="email">이메일</label>
          <input type="email" name="email" />
        </div>
        <div className="passwordDiv">
          <label htmlFor="password">비밀번호</label>
          <input type="password" name="password" />
        </div>
        <button type="submit">로그인</button>
        <Link to="/login/findId">아이디를 잊으셨나요?</Link>
      </form>
    </div>
  );
}
