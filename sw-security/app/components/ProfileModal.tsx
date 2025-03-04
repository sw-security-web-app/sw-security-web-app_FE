// ProfileModal.tsx
import React from "react";
import nickNameHeader from "../css/nickNameHeader.module.css";
import { Link } from "@remix-run/react";

const ProfileModal: React.FC = () => {
  return (
    <div className={nickNameHeader.modal}>
      <div className={nickNameHeader.modalContent}>
        <ul>
          <li className={nickNameHeader.li}>
            <Link
              to="/main/profile"
              style={{ textDecoration: "none", color: "white" }}
            >
              프로필 보기
            </Link>
          </li>
          <li className={nickNameHeader.li}>
            <Link
              to="/main/changePw"
              style={{ textDecoration: "none", color: "white" }}
            >
              비밀번호 변경
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileModal;
