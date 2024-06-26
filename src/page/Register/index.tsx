import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SignupForm from '../../components/SignupForm';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.scss';

interface RegisterFormValues {
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSignUp = async (values: RegisterFormValues) => {
    const { username, password } = values;

    try {
      await axios.post('https://todolist-back-454q.onrender.com/api/register', {
        username,
        password,
      });
      setErrorMessage('회원가입이 완료되었습니다.');
    } catch (error) {
      console.error(error);
      setErrorMessage('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.form_container}>
        <h1 className={styles.form_title}>회원가입</h1>
        <SignupForm onSubmit={handleSignUp} errorMessage={errorMessage} />
      </div>
    </div>
  );
};

export default Register;
