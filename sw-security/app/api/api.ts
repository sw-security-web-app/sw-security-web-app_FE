import axios from "axios";
import { useStore } from "../store/store";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // const logout = useStore((state) => state.logout);
    // 액세스 토큰 만료
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        // 액세스 토큰 갱신 요청
        const res = await axios.post(
          "/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        if (res.status === 200) {
          const newAccessToken = res.data;
          localStorage.setItem("accessToken", newAccessToken);
          // 새 액세스 토큰으로 원래 요청 다시 보내기
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } else {
          const error = res.data;
          console.error("토큰 갱신 실패");
          alert(error.message);
          // logout();
        }
      } catch (refreshError) {
        console.error("토큰 갱신 실패", refreshError);
        // logout();
      }
    }

    return Promise.reject(error); //또 error이면 인터셉터 호출한 곳에서 에러처리 하도록!
  }
);

export default api;
