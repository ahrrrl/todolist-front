import React from 'react';
import { validateSignup } from '../../utils/vailidationForm';
import useForm from '../../hook/useform';

interface SignupFormProps {
  onSubmit: (values: { username: string; password: string }) => Promise<void>;
  errorMessage: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, errorMessage }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { username: '', password: '', confirmPassword: '' },
    validateSignup
  );

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
      <div>
        <label htmlFor='username'>이메일</label>
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
      <div>
        <label htmlFor='confirmPassword'>비밀번호 확인</label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          value={values.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
        )}
      </div>
      <button type='submit'>회원가입</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default SignupForm;
