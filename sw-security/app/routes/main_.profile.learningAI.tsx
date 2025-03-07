import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import adminStyle from "../css/admin.module.css";
import api from "../api/api";
import { useOutletContext } from "@remix-run/react";
import { FiAlertTriangle } from "react-icons/fi";

export default function LearningAI() {
  const [fileName, setFileName] = useState<string>("");
  const [text, setText] = useState<string>("");

  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const { setIsOpen } = useOutletContext<{
    setIsOpen: (open: boolean) => void;
  }>();
  const { setModalText } = useOutletContext<{
    setModalText: (text: string) => void;
  }>();
  const { setModalTitle } = useOutletContext<{
    setModalTitle: (title: string) => void;
  }>();
  const { setLoading } = useOutletContext<{
    setLoading: (loading: boolean) => void;
  }>();

  // 파일 선택 시 이름 띄우는 함수
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (text !== "") {
        setCanSubmit(true);
      } else {
        setCanSubmit(false);
        setFileName(file.name);
      }
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    if (event.target.value !== "") {
      if (fileName) {
        setCanSubmit(true);
      } else {
        setCanSubmit(false);
      }
    }
    if (event.target.value == "") {
      if (fileName) {
        setCanSubmit(false);
      } else {
        setCanSubmit(true);
      }
    }
  };
  const openInformation = () => {
    setIsOpen(true);
    setModalTitle("주의 사항");
    setModalText(
      "1. 텍스트, 파일 중 한가지만 제출할 수 있습니다.\n2. 파일은 txt, pdf파일만 가능하고, 코드는 학습이 불가능합니다.\n3. 학습할 데이터가 적으면 성능이 좋지 않을 수 있습니다."
    );
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
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
        setIsOpen(true);
        setModalTitle(response.data.message);
        setModalText("최대 하루 정도 시간이 걸릴 수 있습니다.");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류 발생";
      setIsOpen(true);
      setModalTitle("학습 데이터 전송 오류");
      setModalText(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={adminStyle.content}>
      <div className={adminStyle.inner}>
        <div className={adminStyle.learningConatainer}>
          <div className={adminStyle.titleContainer}>
            <div className={adminStyle.titleDiv}>
              <div className={adminStyle.mainTitle}>
                <img src="../../img/learning.svg" alt="learning" />
                <span>AI 학습시키기</span>
              </div>
              <span className={adminStyle.subTitle}>
                검열할 데이터를 학습시키세요
              </span>
            </div>
            <div className={adminStyle.informationDiv}>
              <span>주의 사항</span>
              <FiAlertTriangle
                className={adminStyle.informationIcon}
                onClick={openInformation}
              />
            </div>
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
                  파일 업로드
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  accept=".txt, .pdf"
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
              <button
                disabled={canSubmit}
                type="submit"
                className={adminStyle.dataSubmitBtn}
              >
                학습된 AI 제출하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
