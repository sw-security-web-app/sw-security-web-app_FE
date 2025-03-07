import { ChangeEvent, FormEvent, useState } from "react";
import changePwStyle from "../css/changePw.module.css";
import { useOutletContext } from "@remix-run/react";
import api from "~/api/api";
export default function ChangePwForm() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { setIsOpen } = useOutletContext<{
    setIsOpen: (open: boolean) => void;
  }>();
  const { setModalText } = useOutletContext<{
    setModalText: (text: string) => void;
  }>();
  const { setModalTitle } = useOutletContext<{
    setModalTitle: (title: string) => void;
  }>();
  const [passwordValid, setPasswordValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newPassword: "",
  });

  //비밀번호 유효성 검사
  const validPassword = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const password = e.target.value;
    // 비밀번호 조건 체크 (숫자, 영어, 특수문자, 8자 이상)
    const isValid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(
      password
    );
    setPasswordValid(isValid);
    setIsTouched(true); // 비밀번호 입력 시작 시 상태 변경
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const changePw = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.put("/api/auth/change-password", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setModalTitle("비밀번호 변경");
        setModalText("비밀번호가 변경됐습니다!");
        setIsOpen(true);
      } else {
        const error = await response.data;
        setModalTitle("비밀번호 변경 오류");
        setModalText(`${error.message}`);
        setIsOpen(true);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      setModalTitle("비밀번호 변경 오류");
      setModalText(errorMessage);
      setIsOpen(true);
    }
  };
  return (
    <div className={changePwStyle.changeContainer}>
      <div className={changePwStyle.content}>
        <div className={changePwStyle.titleContainer}>
          <span className={changePwStyle.title}>비밀번호 변경</span>
        </div>
        <form onSubmit={changePw} className={changePwStyle.changeForm}>
          <div className={changePwStyle.emailDiv}>
            <label htmlFor="email" className={changePwStyle.label}>
              이메일
              <span style={{ color: "red", marginLeft: "0.28rem" }}>*</span>
            </label>
            <div>
              <div className={changePwStyle.inputContainer}>
                <input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해주세요"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className={changePwStyle.prevPwDiv}>
            <label htmlFor="password" className={changePwStyle.label}>
              기존 비밀번호
              <span style={{ color: "red", marginLeft: "0.28rem" }}>*</span>
            </label>
            <div>
              <div className={changePwStyle.inputContainer}>
                <input
                  type="password"
                  id="password"
                  placeholder="기존 비밀번호를 입력해주세요"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className={changePwStyle.newPwDiv}>
            <label htmlFor="newPassword" className={changePwStyle.label}>
              새 비밀번호
              <span style={{ color: "red", marginLeft: "0.28rem" }}>*</span>
            </label>
            <div>
              <div className={changePwStyle.inputContainer}>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="새 비밀번호를 입력해주세요"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={validPassword}
                  required
                />
              </div>
            </div>
            <div>
              {isTouched &&
                (passwordValid ? (
                  <span style={{ color: "green", fontSize: "0.67rem" }}>
                    사용 가능한 비밀번호입니다.
                  </span>
                ) : (
                  <span style={{ color: "red", fontSize: "0.67rem" }}>
                    비밀번호는 숫자, 영어, 특수문자를 포함하여 8자 이상이어야
                    합니다.
                  </span>
                ))}
            </div>
          </div>
          <button className={changePwStyle.btn} type="submit">
            비밀번호 변경
          </button>
        </form>
      </div>
    </div>
  );
}
