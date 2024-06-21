import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { useLogin } from '../../hook/useLogin';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await loginMutation.mutateAsync(values);
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
