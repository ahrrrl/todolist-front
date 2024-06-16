import React from 'react';
import { validateLogin } from '../../utils/vailidationForm';
import useForm from '../../hook/useform';
import styles from './LoginForm.module.scss';

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
    <form
      className={styles.formContainer}
      onSubmit={(e) => handleSubmit(e, onSubmit)}
    >
      <div className={styles.form_group}>
        <label className={styles.input_label} htmlFor='username'>
          유저이름
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
      <button className={styles.form_button} type='submit'>
        로그인
      </button>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </form>
  );
};

export default LoginForm;
