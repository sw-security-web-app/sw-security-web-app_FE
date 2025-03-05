import { useEffect } from "react";
import { useStore } from "../store/store"; // Zustand store import
import { useNavigate } from "@remix-run/react";

export const useAuthRedirect = () => {
  const isLogin = useStore((state) => state.isLogin()); // 로그인 상태 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login", { replace: true });
    }
  }, [isLogin, navigate]);
};
