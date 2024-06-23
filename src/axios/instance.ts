import axios, { AxiosResponse, AxiosError } from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'https://todolist-back-454q.onrender.com/api',
  withCredentials: true, // 쿠키를 포함한 요청을 허용
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
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
  async (error: AxiosError) => {
    // 응답이 실패한 경우
    if (error.response && error.response.status === 401) {
      // 401 에러가 발생하면 리프레시 토큰으로 새로운 액세스 토큰을 요청
      try {
        const refreshResponse = await apiClient.post('/refresh-token');
        const { accessToken } = refreshResponse.data as { accessToken: string };
        localStorage.setItem('accessToken', accessToken);

        // 원래의 요청을 새로운 액세스 토큰으로 재시도
        if (error.config && error.config.headers) {
          error.config.headers['Authorization'] = `Bearer ${accessToken}`;
          return apiClient(error.config);
        }
      } catch (refreshError) {
        // 리프레시 토큰 갱신 실패 시
        localStorage.removeItem('accessToken');
        return Promise.reject(refreshError);
      }
    }
    // 다른 오류는 그대로 던짐
    return Promise.reject(error);
  }
);

export default apiClient;
