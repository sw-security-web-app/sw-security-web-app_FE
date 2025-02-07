import { json, Link, redirect } from "@remix-run/react";
import loginStyle from "../css/login.module.css";
import { Form, useActionData } from "@remix-run/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { ActionFunctionArgs } from "@remix-run/node";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  // const actionData = useActionData<typeof action>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value); // 콘솔 로그 추가하여 값 확인
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 로그인 요청
    try {
      const res = await axios.post("로그인 엔드포인트", {
        ...formData,
      });

      // 서버로부터 받은 액세스 토큰과 리프레시 토큰
      const { accessToken, refreshToken } = res.data;

      // 액세스 토큰을 localStorage에 저장
      localStorage.setItem("accessToken", accessToken);

      // 리프레시 토큰은 HttpOnly 쿠키에 저장
      // 클라이언트에서 접근할 수 없도록 쿠키에 저장하므로, 보안을 강화할 수 있음.
      document.cookie = `refreshToken=${refreshToken}; path=/; HttpOnly; Secure; SameSite=Strict`;

      navigate("/main");
    } catch (error) {
      console.error("로그인 실패", error);
      alert("로그인 실패");
    }
  };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   try {
  //     // 서버로 로그인 정보 전송
  //     const response = await fetch("로그인 엔드포인트", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         ...formData,
  //       }),
  //     });

  //     if (response.ok) {
  //       return redirect("/main");
  //     } else {
  //       const error = await response.json();
  //       alert(`${error.code}\n${error.message}`); //서버에서 보내주는 오류값 알림창으로 띄우기
  //     }
  //   } catch (error) {
  //     console.error("에러 발생:", error);
  //     alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
  //   }
  // };
  return (
    <div className={loginStyle.formContainer}>
      <div className={loginStyle.titleContainer}>
        <span className={loginStyle.title}>로그인</span>
      </div>
      <form onSubmit={handleSubmit} className={loginStyle.loginForm}>
        <div className={loginStyle.emailDiv}>
          <label htmlFor="email">이메일</label>
          <div className={loginStyle.inputContainer}>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요"
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div className={loginStyle.passwordDiv}>
          <label htmlFor="password">비밀번호</label>
          <div className={loginStyle.inputContainer}>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
              autoComplete="off"
              required
            />
          </div>
        </div>
        {/* <button className={loginStyle.loginBtn} type="submit">
          로그인
        </button> */}
        <button
          className={loginStyle.loginBtn}
          type="button"
          onClick={() => {
            navigate("/main");
          }}
        >
          로그인
        </button>
        <div className={loginStyle.findIdDiv}>
          <Link to="/login/findId" className={loginStyle.findId}>
            아이디를 잊으셨나요?
          </Link>
        </div>
      </form>
    </div>
  );
}
