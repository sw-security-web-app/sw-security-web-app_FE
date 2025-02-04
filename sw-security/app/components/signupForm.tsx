import { useLocation } from "@remix-run/react";
import signupStyle from "../../public/css/signup.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function SignUpForm() {
  const location = useLocation(); // 현재 경로 가져오기
  const [role, setRole] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // 경로에 따라서서 폼을 렌더링
  const isAdmin = location.pathname.startsWith("/adminSignUp");
  const isEmployee = location.pathname.startsWith("/employeeSignUp");

  useEffect(() => {
    if (location.pathname.startsWith("/adminSignUp")) {
      setRole("MANAGER");
    } else if (location.pathname.startsWith("/employeeSignUp")) {
      setRole("EMPLOYEE");
    } else {
      setRole("GENERAL");
    }
  }, [location.pathname]);

  //formData:회원가입 시 서버로 보낼 정보들!
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    companyName: "", // 관리자 폼에서 회사명
    companyDept: "", // 관리자 폼에서 부서명
    companyPosition: "", // 직책
    invitationCode: "", // 직원 폼에서 회사 코드
  });

  //checkData:확인 필요한 정보들!
  const [checkData, setChechData] = useState({
    passwordConfirm: "",
    emailCodeConfirm: "",
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

  const contentCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChechData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validPassword = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleChange(e);
    const password = e.target.value;
    // 비밀번호 조건 체크 (숫자, 영어, 특수문자, 8자 이상)
    const isValid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(
      password
    );
    setPasswordValid(isValid);
    setIsTouched(true); // 비밀번호 입력 시작 시 상태 변경
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //빈문자열 null로 변환
    const transformedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );

    // 비밀번호 확인
    if (formData.password !== checkData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 서버로 데이터 전송
      const response = await fetch("회원가입 엔드포인트", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...transformedData,
          role: role,
        }),
      });

      if (response.ok) {
        alert("회원가입이 완료되었습니다!");
      } else {
        const error = await response.json();
        alert(`${error.code}\n${error.message}`); //서버에서 보내주는 오류값 알림창으로 띄우기
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  function sendCode() {
    //서버랑 통신해서 이메일 보내는 코드 !
  }
  function confirmCode() {
    //서버랑 통신해서 인증번호 확인하는 코드 !
  }

  return (
    <div className={signupStyle.formContainer}>
      <div className={signupStyle.titleContainer}>
        <span className={signupStyle.title}>회원가입</span>
      </div>
      <form onSubmit={handleSubmit} className={signupStyle.form}>
        <div className={signupStyle.nameDiv}>
          <label htmlFor="name">
            이름<span style={{ color: "red", marginLeft: "5px" }}>*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            placeholder="이름을 입력해주세요"
            onChange={handleChange}
            required
          />
        </div>
        <div className={signupStyle.emailDiv}>
          <label htmlFor="email">
            이메일<span style={{ color: "red", marginLeft: "5px" }}>*</span>
          </label>
          <div>
            <div className={signupStyle.inputContainer}>
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
            <button
              className={signupStyle.btn}
              type="button"
              onClick={sendCode}
            >
              인증번호 전송
            </button>
          </div>
        </div>
        <div className={signupStyle.emailAuthDiv}>
          <label htmlFor="emailAuth">
            이메일 인증번호
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>
          </label>
          <div>
            <div className={signupStyle.inputContainer}>
              <input
                id="emailAuth"
                type="text"
                name="emailCodeConfirm"
                placeholder="이메일 인증번호를 입력해주세요"
                value={checkData.emailCodeConfirm}
                onChange={contentCheck}
                required
              />
            </div>
            <button
              className={signupStyle.btn}
              type="button"
              onClick={confirmCode}
            >
              인증번호 확인
            </button>
          </div>
        </div>

        <div className={signupStyle.passwordDiv}>
          <label htmlFor="password">
            비밀번호<span style={{ color: "red", marginLeft: "5px" }}>*</span>
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            placeholder="비밀번호를 입력해주세요"
            onChange={validPassword}
            required
          />
          {/* 조건부 렌더링 */}
          <div>
            {isTouched &&
              (passwordValid ? (
                <span style={{ color: "green", fontSize: "12px" }}>
                  사용 가능한 비밀번호입니다.
                </span>
              ) : (
                <span style={{ color: "red", fontSize: "12px" }}>
                  비밀번호는 숫자, 영어, 특수문자를 포함하여 8자 이상이어야
                  합니다.
                </span>
              ))}
          </div>
        </div>
        <div className={signupStyle.passwordConfirmDiv}>
          <label htmlFor="passwordConfirm">
            비밀번호 확인
            <span style={{ color: "red", marginLeft: "5px" }}>*</span>
          </label>
          <input
            id="passwordConfirm"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            name="passwordConfirm"
            value={checkData.passwordConfirm}
            onChange={contentCheck}
            required
          />
        </div>
        {/* 관리자 폼 추가 필드 */}
        {isAdmin && (
          <>
            <div className={signupStyle.companyDiv}>
              <label htmlFor="companyName">
                회사명 입력
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </label>
              <input
                id="companyName"
                type="text"
                name="companyName"
                value={formData.companyName}
                placeholder="회사명을 입력해주세요"
                onChange={handleChange}
                required
              />
            </div>
            <div className={signupStyle.departmentDiv}>
              <label htmlFor="departmentName">
                부서명 입력
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </label>
              <input
                id="departmentName"
                type="text"
                placeholder="부서명을 입력해주세요"
                name="companyDept"
                value={formData.companyDept}
                onChange={handleChange}
                required
              />
            </div>
            <div className={signupStyle.positionDiv}>
              <label htmlFor="position">
                직책 선택
                <span style={{ color: "red", marginLeft: "5px" }}>*</span>
              </label>
              <select
                id="position"
                name="companyPosition"
                value={formData.companyPosition}
                onChange={handleChange}
                required
              >
                <option value="">직책을 선택하세요</option>
                <option value="manager">매니저</option>
                <option value="developer">개발자</option>
                <option value="designer">디자이너</option>
                <option value="intern">인턴</option>
              </select>
            </div>
          </>
        )}
        {/* 직원 폼 추가 필드 (직원 직책은 관리자랑 다르게 뜨나??????확인필요)*/}
        {isEmployee && (
          <>
            <div className={signupStyle.companyCodeDiv}>
              <label htmlFor="companyCode">
                회사 코드 입력<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="companyCode"
                type="text"
                name="invitationCode"
                value={formData.invitationCode}
                placeholder="회사 코드를 입력해주세요"
                onChange={handleChange}
                required
              />
            </div>
            <div className={signupStyle.positionDiv}>
              <label htmlFor="position">
                직책 선택<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="position"
                name="companyPosition"
                value={formData.companyPosition}
                onChange={handleChange}
                required
              >
                <option value="">직책을 선택하세요</option>
                <option value="manager">매니저</option>
                <option value="developer">개발자</option>
                <option value="designer">디자이너</option>
                <option value="intern">인턴</option>
              </select>
            </div>
          </>
        )}
        <button className={signupStyle.signUpBtn} type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
}
