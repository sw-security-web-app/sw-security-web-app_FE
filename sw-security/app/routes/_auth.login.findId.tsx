import { ChangeEvent, FormEvent, useState } from "react";
import findIdStyle from "../css/findid.module.css";
import { useNavigate, useOutletContext } from "@remix-run/react";

export default function findId() {
  const navigate = useNavigate();
  const [onId, setOnId] = useState(true);
  const [onPw, setOnPw] = useState(false);
  const [isPhoneConfirm, setIsPhoneConfirm] = useState(false);
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

  const [idFormData, setIdFormData] = useState({
    name: "",
    phoneNumber: "",
  });

  const [pwFormData, setPwFormData] = useState({
    email: "",
    phoneNumber: "",
  });

  //checkData:확인 필요한 정보들!
  const [checkData, setCheckData] = useState({
    phoneCodeConfirm: "",
  });

  //check가 필요한 것들 체크하는 함수
  const contentCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIdChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIdFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePwChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPwFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //비밀번호 재발급-핸드폰번호 전송
  async function sendPhoneCode() {
    if (!pwFormData.phoneNumber) {
      setModalTitle("핸드폰 인증");
      setModalText("핸드폰 번호를 먼저 입력해주세요.");
      setIsOpen(true);
      return;
    }
    try {
      const response = await fetch(BASE_URL + "/api/sms-certification/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: pwFormData.phoneNumber,
          certificationCode: null,
        }),
      });
      if (response.ok) {
        setModalTitle("핸드폰 인증");
        setModalText("인증번호를 전송했습니다!");
        setIsOpen(true);
      } else {
        const error = await response.json();
        setModalTitle("핸드폰 인증 오류");
        setModalText(`${error.message}`);
        setIsOpen(true);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  //비밀번호 재발급-휴대폰 인증번호 확인
  async function confirmPhoneCode() {
    if (!checkData.phoneCodeConfirm) {
      setModalTitle("인증번호 확인");
      setModalText("인증번호를 입력해주세요!");
      setIsOpen(true);
      return;
    }
    try {
      const response = await fetch(
        BASE_URL + "/api/sms-certification/confirm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber: pwFormData.phoneNumber,
            certificationCode: checkData.phoneCodeConfirm,
          }),
        }
      );
      if (response.ok) {
        setIsPhoneConfirm(true);
        setModalTitle("인증번호 확인");
        setModalText("인증번호 확인이 완료됐습니다.");
        setIsOpen(true);
      } else {
        const error = await response.json();
        setModalTitle("인증번호 오류");
        setModalText(`${error.message}`);
        setIsOpen(true);
      }
    } catch (error: any) {
      setModalTitle("인증번호 오류");
      setModalText(`${error.message}`);
      setIsOpen(true);
    }
  }

  //아이디찾기 form 제출
  const findId = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(BASE_URL + "/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...idFormData,
        }),
      });

      if (response.ok) {
        setModalTitle("아이디 찾기");
        setModalText("아이디가 전송되었습니다!");
        setIsOpen(true);
        navigate("/login");
      } else {
        const error = await response.json();
        setModalTitle("아이디 찾기 오류");
        setModalText(`${error.message}`);
        setIsOpen(true);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  //비밀번호찾기 form 제출
  const findPw = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(BASE_URL + "/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...pwFormData,
        }),
      });

      if (response.ok) {
        setModalTitle("임시 비밀번호 재발급");
        setModalText("임시 비밀번호가 전송되었습니다!");
        setIsOpen(true);
        navigate("/login");
      } else {
        const error = await response.json();
        setModalTitle("임시 비밀번호 재발급 오류");
        setModalText(`${error.message}`);
        setIsOpen(true);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <div className={findIdStyle.container}>
      <div className={findIdStyle.selectContainer}>
        <div
          className={`${findIdStyle.findId} ${
            onId ? findIdStyle.active : findIdStyle.default
          }`}
          onClick={() => {
            setOnId(true);
            setOnPw(false);
          }}
        >
          <span>아이디 찾기</span>
        </div>
        <div
          className={`${findIdStyle.findPw} ${
            onPw ? findIdStyle.active : findIdStyle.default
          }`}
          onClick={() => {
            setOnPw(true);
            setOnId(false);
          }}
        >
          <span>임시 비밀번호 발급</span>
        </div>
      </div>
      {onId ? (
        <form onSubmit={findId} className={findIdStyle.findIdForm}>
          <div className={findIdStyle.nameDiv}>
            <label htmlFor="name" className={findIdStyle.label}>
              이름<span style={{ color: "red", marginLeft: "0.28rem" }}>*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={idFormData.name}
              placeholder="이름을 입력해주세요"
              onChange={handleIdChange}
              required
            />
          </div>
          <div className={findIdStyle.phoneNumberDiv}>
            <label htmlFor="phoneNumber" className={findIdStyle.label}>
              핸드폰 번호
              <span style={{ color: "red", marginLeft: "0.28rem" }}>*</span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              value={idFormData.phoneNumber}
              pattern="010[0-9]{8}"
              placeholder="숫자만 입력해주세요"
              onChange={handleIdChange}
              required
            />
          </div>
          <button className={findIdStyle.idBtn} type="submit">
            확인
          </button>
        </form>
      ) : (
        <form onSubmit={findPw} className={findIdStyle.findPwForm}>
          <div className={findIdStyle.phoneNumberDiv}>
            <label htmlFor="phoneNumber">
              핸드폰 번호
              <span style={{ color: "red", marginLeft: "0.28rem" }}>*</span>
            </label>
            <div>
              <div className={findIdStyle.inputContainer}>
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={pwFormData.phoneNumber}
                  pattern="010[0-9]{8}"
                  placeholder="숫자만 입력해주세요"
                  onChange={handlePwChange}
                  required
                />
              </div>
              <button
                className={findIdStyle.btn}
                type="button"
                onClick={sendPhoneCode}
              >
                인증번호 전송
              </button>
            </div>
          </div>
          <div className={findIdStyle.phoneAuthDiv}>
            <label htmlFor="phoneAuth">
              핸드폰 인증번호
              <span style={{ color: "red", marginLeft: "0.28rem" }}>*</span>
            </label>
            <div>
              <div className={findIdStyle.inputContainer}>
                <input
                  id="phoneAuth"
                  type="text"
                  name="phoneCodeConfirm"
                  placeholder="핸드폰 인증번호를 입력해주세요"
                  value={checkData.phoneCodeConfirm}
                  onChange={contentCheck}
                  required
                />
              </div>
              <button
                className={findIdStyle.btn}
                type="button"
                onClick={confirmPhoneCode}
                disabled={isPhoneConfirm}
              >
                {!isPhoneConfirm ? (
                  "인증번호 확인"
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ color: "#00FF80", fontSize: "0.78rem" }}>
                      인증 완료
                    </span>
                    <img src="/img/confirmCheck.svg" alt="confirmCheck" />
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className={findIdStyle.emailDiv}>
            <label htmlFor="email">
              이메일
              <span style={{ color: "red", marginLeft: "0.28rem" }}>*</span>
            </label>
            <div>
              <div className={findIdStyle.inputContainer}>
                <input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해주세요"
                  name="email"
                  value={pwFormData.email}
                  onChange={handlePwChange}
                  required
                />
              </div>
            </div>
          </div>
          <button className={findIdStyle.pwBtn} type="submit">
            임시 비밀번호 전송
          </button>
        </form>
      )}
    </div>
  );
}
