import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('https://todolist-back-454q.onrender.com/api/register', {
        username,
        password,
      });
      alert('회원가입이 완료되었습니다.');
    } catch (error) {
      console.error(error);
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='아이디'
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='비밀번호'
      />
      <button type='submit'>회원가입</button>
    </form>
  );
};

export default Register;
