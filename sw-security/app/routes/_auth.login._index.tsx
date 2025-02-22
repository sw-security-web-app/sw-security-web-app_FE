import { Link, Form, useNavigate } from "@remix-run/react";
import loginStyle from "../css/login.module.css";

import { ChangeEvent, useState, FormEvent } from "react";
import { useStore } from "../store/store";

export default function Login() {
  const login = useStore((state) => state.login);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await fetch(BASE_URL + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
        credentials: "include",
      });

      if (response.ok) {
        console.log(response);
        const data = await response.json();
        const { accessToken } = data;
        login(accessToken); //zustand store에 상태 저장
        navigate("/main");
      } else {
        const error = await response.json();
        setErrorMessage(error.message);
        // alert(`${error.message}`); //서버에서 보내주는 오류값 알림창으로 띄우기
      }
    } catch (error: any) {
      console.error("에러 발생:", error);
      setErrorMessage(error.message);
      // alert(`${error.message}`);
    }
  };

  return (
    <div className={loginStyle.formContainer}>
      <div className={loginStyle.titleContainer}>
        <span className={loginStyle.title}>로그인</span>
      </div>
      <Form onSubmit={handleSubmit} className={loginStyle.loginForm}>
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
              required
            />
          </div>
        </div>
        {errorMessage && (
          <span className={loginStyle.error}>{errorMessage}</span>
        )}

        <button className={loginStyle.loginBtn} type="submit">
          로그인
        </button>
        <div className={loginStyle.findIdDiv}>
          <Link to="/login/findId" className={loginStyle.findId}>
            아이디를 잊으셨나요?
          </Link>
        </div>
      </Form>
    </div>
  );
}
