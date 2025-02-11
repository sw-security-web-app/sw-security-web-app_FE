import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "베이스",
  withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    const navigate = useNavigate();
    // 액세스 토큰 만료
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        // 액세스 토큰 갱신 요청
        const res = await axios.post(
          "액세스 토큰 갱신 엔드포인트트",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // 새 액세스 토큰으로 원래 요청 다시 보내기
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패", refreshError);
        navigate("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
