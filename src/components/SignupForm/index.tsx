import React from 'react';
import { validateSignup } from '../../utils/vailidationForm';
import useForm from '../../hook/useform';
import styles from './SignupForm.module.scss';

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
    <form
      className={styles.formContainer}
      onSubmit={(e) => handleSubmit(e, onSubmit)}
    >
      <div className={styles.form_group}>
        <label className={styles.input_label} htmlFor='username'>
          이메일
        </label>
        <input
          className={styles.form_input}
          type='text'
          id='username'
          name='username'
          value={values.username}
          onChange={handleChange}
        />
        {errors.username && (
          <p className={styles.error_message}>{errors.username}</p>
        )}
      </div>
      <div className={styles.form_group}>
        <label className={styles.input_label} htmlFor='password'>
          비밀번호
        </label>
        <input
          className={styles.form_input}
          type='password'
          id='password'
          name='password'
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className={styles.error_message}>{errors.password}</p>
        )}
      </div>
      <div className={styles.form_group}>
        <label className={styles.input_label} htmlFor='confirmPassword'>
          비밀번호 확인
        </label>
        <input
          className={styles.form_input}
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          value={values.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className={styles.error_message}>{errors.confirmPassword}</p>
        )}
      </div>
      <button className={styles.form_button} type='submit'>
        회원가입
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default SignupForm;
