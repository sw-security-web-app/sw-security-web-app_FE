import { useEffect, useState } from "react";
import { create } from "zustand";

// 상태 타입 정의
interface Store {
  accessToken: string | null;
  userName: string | null;

  login: (accessToken: string, userName: string) => void;
  logout: () => void;
  isLogin: () => boolean;
}

// zustand 스토어 생성
const useStore = create<Store>((set, get) => ({
  accessToken: null,
  userName: null,

  login: (accessToken, userName) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", userName);
    }

    set(() => ({
      accessToken,
      userName,
    }));
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
    }

    set(() => ({
      accessToken: null,
      userName: null,
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

      useStore.setState({
        accessToken,
        userName,
      });
    }
  }, [isClient]);
};

export { useStore, useLocalStorage };
