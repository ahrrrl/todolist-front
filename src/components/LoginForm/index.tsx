import React from 'react';
import { validateLogin } from '../../utils/vailidationForm';
import useForm from '../../hook/useform';

interface LoginFormProps {
  onSubmit: (values: { username: string; password: string }) => Promise<void>;
  errorMessage: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, errorMessage }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { username: '', password: '' },
    validateLogin
  );

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
      <div>
        <label htmlFor='username'>유저이름</label>
        <input
          type='text'
          id='username'
          name='username'
          value={values.username}
          onChange={handleChange}
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
      </div>
      <div>
        <label htmlFor='password'>비밀번호</label>
        <input
          type='password'
          id='password'
          name='password'
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      <button type='submit'>로그인</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default LoginForm;
