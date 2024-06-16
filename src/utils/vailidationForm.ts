export const validateLogin = (values: { [key: string]: string }) => {
  const errors: { [key: string]: string } = {};
  if (!values.username) {
    errors.username = '유저이름을 입력하세요.';
  } else if (!/^[a-zA-Z0-9가-힣]+$/.test(values.username)) {
    errors.username = '유저이름에 특수문자를 사용할 수 없습니다.';
  }
  if (!values.password) {
    errors.password = '비밀번호를 입력하세요.';
  } else if (values.password.length < 6) {
    errors.password = '비밀번호는 최소 6자리여야 합니다.';
  }
  return errors;
};

export const validateSignup = (values: { [key: string]: string }) => {
  const errors: { [key: string]: string } = {};
  if (!values.username) {
    errors.username = '이메일을 입력하세요.';
  } else if (!/^[a-zA-Z0-9가-힣]+$/.test(values.username)) {
    errors.username = '유저이름에 특수문자를 사용할 수 없습니다.';
  }
  if (!values.password) {
    errors.password = '비밀번호를 입력하세요.';
  } else if (values.password.length < 6) {
    errors.password = '비밀번호는 최소 6자리여야 합니다.';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = '비밀번호를 다시 입력하세요.';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
  }
  return errors;
};
