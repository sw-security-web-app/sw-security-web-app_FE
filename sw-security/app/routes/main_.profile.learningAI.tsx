import { useState, ChangeEvent, FormEvent } from "react";
import adminStyle from "../css/admin.module.css";
import api from "../api/api";

export default function LearningAI() {
  const [fileName, setFileName] = useState<string>("");
  const [text, setText] = useState<string>("");

  // 파일 선택 시 이름 띄우는 함수
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (text) {
      const jsonData = JSON.stringify(text);
      const blob = new Blob([jsonData], { type: "application/json" });
      formData.append("requestDto", blob);
    }
    if (fileName) {
      const fileInput = document.getElementById(
        "fileUpload"
      ) as HTMLInputElement;
      const file = fileInput?.files?.[0];
      if (file) {
        formData.append("file", file); // 파일 추가
      }
    }
    try {
      const response = await api.post("api/company-send", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("학습 데이터 전송이 완료되었습니다!");
      } else {
        const error = await response.data;
        alert(error.message);
      }
    } catch (error) {
      console.error("학습 데이터 전송 실패", error);
    }
  };

  return (
    <div className={adminStyle.content}>
      <div className={adminStyle.inner}>
        <div className={adminStyle.learningConatainer}>
          <div className={adminStyle.titleDiv}>
            <div className={adminStyle.mainTitle}>
              <img src="../../img/learning.svg" alt="learning" />
              <span>AI 학습시키기</span>
            </div>
            <span className={adminStyle.subTitle}>
              검열할 데이터를 학습시키세요
            </span>
          </div>
          <form className={adminStyle.form} onSubmit={handleSubmit}>
            <div className={adminStyle.inputDiv}>
              <textarea
                onChange={handleTextChange}
                placeholder="텍스트를 입력해주세요"
              />
              <span
                style={{
                  color: "#484B50",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginTop: "0.83rem",
                  marginBottom: "1.1rem",
                }}
              >
                OR
              </span>
              <div className={adminStyle.uploadBtnDiv}>
                <label htmlFor="fileUpload" className={adminStyle.uploadBtn}>
                  <img src="../../img/upload.svg" />
                  텍스트 파일 업로드
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  accept=".txt"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              {fileName && (
                <div className={adminStyle.fileName}>
                  <span>{fileName}</span>
                </div>
              )}
            </div>
            <div className={adminStyle.btnContainer}>
              <button type="submit" className={adminStyle.dataSubmitBtn}>
                학습된 AI 제출하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
