import { useEffect, useState } from "react";
import { create } from "zustand";

// 상태 타입 정의
interface Store {
  accessToken: string | null;
  userName: string | null;
  role: string | null;

  login: (accessToken: string, userName: string, role: string) => void;
  logout: () => void;
  isLogin: () => boolean;
}

// zustand 스토어 생성
const useStore = create<Store>((set, get) => ({
  accessToken: null,
  userName: null,
  role: null,

  login: (accessToken, userName, role) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", userName);
      localStorage.setItem("role", role);
    }

    set(() => ({
      accessToken,
      userName,
      role,
    }));
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
    }

    set(() => ({
      accessToken: null,
      userName: null,
      role: null,
    }));
  },

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
      const userName = localStorage.getItem("userName");
      const role = localStorage.getItem("role");

      useStore.setState({
        accessToken,
        userName,
        role,
      });
    }
  }, [isClient]);
};

export { useStore, useLocalStorage };
