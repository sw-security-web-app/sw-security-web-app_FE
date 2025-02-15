import { useEffect, useState } from "react";
import { create } from "zustand";

// 상태 타입 정의
interface Store {
  accessToken: string | null;
  userIndex: string | null;
  email: string | null;
  role: string | null;

  login: (
    accessToken: string,
    userIndex: string,
    email: string,
    role: string
  ) => void;
  logout: () => void;
  isLogin: () => boolean;
}

// zustand 스토어 생성
const useStore = create<Store>((set, get) => ({
  accessToken: null,
  userIndex: null,
  email: null,
  role: null,

  login: (accessToken, userIndex, email, role) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userIndex", userIndex);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
    }

    set(() => ({
      accessToken,
      userIndex,
      email,
      role,
    }));
  },

  // 로그아웃 함수
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userIndex");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
    }

    set(() => ({
      accessToken: null,
      userIndex: null,
      email: null,
      role: null,
    }));
  },

  // 로그인 여부 확인 함수
  isLogin: () => get().accessToken !== null,
}));

// 클라이언트 측에서만 localStorage 값을 읽어오는 useEffect
const useLocalStorage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 클라이언트 측에서만 실행
  }, []);

  useEffect(() => {
    if (isClient) {
      const accessToken = localStorage.getItem("accessToken");
      const userIndex = localStorage.getItem("userIndex");
      const email = localStorage.getItem("email");
      const role = localStorage.getItem("role");

      useStore.setState({
        accessToken,
        userIndex,
        email,
        role,
      });
    }
  }, [isClient]);
};

export { useStore, useLocalStorage };
