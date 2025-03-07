// import { useEffect, useState } from "react";
// import { create } from "zustand";

// // 상태 타입 정의
// interface Store {
//   accessToken: string | null;
//   userName: string | null;
//   role: string | null;

//   login: (accessToken: string, userName: string, role: string) => void;
//   logout: () => void;
//   isLogin: () => boolean;
// }

// // zustand 스토어 생성
// const useStore = create<Store>((set, get) => ({
//   accessToken: null,
//   userName: null,
//   role: null,

//   login: (accessToken, userName, role) => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("userName", userName);
//       localStorage.setItem("role", role);
//     }

//     set(() => ({
//       accessToken,
//       userName,
//       role,
//     }));
//   },

//   logout: () => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("userName");
//       localStorage.removeItem("role");
//     }

//     set(() => ({
//       accessToken: null,
//       userName: null,
//       role: null,
//     }));
//   },

//   isLogin: () => get().accessToken !== null,
// }));

// // 클라이언트 측에서만 localStorage 값을 읽어오는 useEffect
// const useLocalStorage = () => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true); // 클라이언트 측에서만 실행
//   }, []);

//   useEffect(() => {
//     if (isClient) {
//       const accessToken = localStorage.getItem("accessToken");
//       const userName = localStorage.getItem("userName");
//       const role = localStorage.getItem("role");

//       useStore.setState({
//         accessToken,
//         userName,
//         role,
//       });
//     }
//   }, [isClient]);
// };

// export { useStore, useLocalStorage };
import { useNavigate } from "@remix-run/react";
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
const useLocalStorage = () => {
  const navigate = useNavigate(); // 리디렉션을 위한 navigate 훅 사용
  const { accessToken, login } = useStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedUserName = localStorage.getItem("userName");
      const storedRole = localStorage.getItem("role");

      if (storedAccessToken && storedUserName && storedRole) {
        // localStorage에서 값이 있으면 상태에 반영
        login(storedAccessToken, storedUserName, storedRole);
      } else {
        // 로그인하지 않은 경우 로그인 페이지로 리디렉션
        navigate("/login"); // 또는 로그인 페이지로 이동하는 경로 설정
      }
    }
  }, [login, navigate]); // 로그인 상태 변경 시 다시 실행
};

export { useStore, useLocalStorage };
