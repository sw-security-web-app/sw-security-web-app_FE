import { ChangeEvent, FormEvent, useState } from "react";
import changePwStyle from "../css/changePw.module.css";
import { useOutletContext } from "@remix-run/react";
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

  const [formData, setFormData] = useState({
    email: "",
    prevPassword: "",
    newPassword: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const changePw = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(BASE_URL + "비밀번호 변경", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (response.ok) {
        setModalTitle("비밀번호 변경");
        setModalText("비밀번호가 변경됐습니다!");
        setIsOpen(true);
      } else {
        const error = await response.json();
        setModalTitle("비밀번호 변경 오류");
        setModalText(`${error.message}`);
        setIsOpen(true);
      }
    } catch (error: any) {
      console.error("에러 발생:", error);
      alert(error.message);
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
              이메일<span style={{ color: "red", marginLeft: "5px" }}>*</span>
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
            <label htmlFor="prevPassword" className={changePwStyle.label}>
              기존 비밀번호
              <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            </label>
            <div>
              <div className={changePwStyle.inputContainer}>
                <input
                  type="password"
                  id="prevPassword"
                  placeholder="기존 비밀번호를 입력해주세요"
                  name="prevPassword"
                  value={formData.prevPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className={changePwStyle.newPwDiv}>
            <label htmlFor="newPassword" className={changePwStyle.label}>
              새 비밀번호
              <span style={{ color: "red", marginLeft: "5px" }}>*</span>
            </label>
            <div>
              <div className={changePwStyle.inputContainer}>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="새 비밀번호를 입력해주세요"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>
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
