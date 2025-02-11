import {
  Link,
  Form,
  useActionData,
  redirect,
  useNavigate,
} from "@remix-run/react";
import loginStyle from "../css/login.module.css";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axios.post("http://localhost:5000/users", {
      email,
      password,
    });

    const { accessToken, refreshToken, role } = res.data;

    return Response.json(
      { success: true, accessToken, role },
      {
        headers: {
          "Set-Cookie": `refreshToken=${refreshToken}; HttpOnly; Path=/; Secure; SameSite=Strict`,
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        return Response.json(
          { error: "아이디 또는 비밀번호가 잘못되었습니다." },
          { status: 401 }
        );
      }
    }
    return Response.json(
      { error: "알 수 없는 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export default function Login() {
  const navigate = useNavigate();
  const actionData = useActionData<typeof action>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // 로그인 성공 시 액세스 토큰을 localStorage에 저장
  useEffect(() => {
    if (actionData && "success" in actionData && actionData.success) {
      localStorage.setItem("accessToken", actionData.accessToken);
      localStorage.setItem("role", actionData.role);
      navigate("/main");
    }
  }, [actionData]);

  return (
    <div className={loginStyle.formContainer}>
      <div className={loginStyle.titleContainer}>
        <span className={loginStyle.title}>로그인</span>
      </div>
      <Form method="post" className={loginStyle.loginForm}>
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
        {actionData && "error" in actionData && (
          <span className={loginStyle.error}>{actionData.error}</span>
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
