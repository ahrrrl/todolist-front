import axios, { AxiosResponse, AxiosError } from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'https://todolist-back-454q.onrender.com/api',
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 응답이 성공적인 경우 그대로 반환
    return response;
  },
  (error: AxiosError) => {
    // 응답이 실패한 경우
    if (error.response && error.response.status === 401) {
      // 401 에러가 발생하면 로컬스토리지에서 토큰 삭제
    }
    // 오류를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
    return Promise.reject(error);
  }
);

export default apiClient;
