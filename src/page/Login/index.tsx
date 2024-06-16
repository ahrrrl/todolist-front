import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from '../../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (values: LoginFormValues) => {
    const { username, password } = values;
    try {
      const response = await axios.post(
        'https://todolist-back-454q.onrender.com/api/login',
        {
          username,
          password,
        }
      );
      localStorage.setItem('token', response.data.token);
      setErrorMessage('');
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrorMessage('로그인에 실패했습니다.');
    }
  };
  return (
    <div className={styles.page_container}>
      <div className={styles.form_container}>
        <h1 className={styles.form_title}>로그인</h1>
        <LoginForm onSubmit={handleLogin} errorMessage={errorMessage} />
      </div>
    </div>
  );
};

export default Login;
