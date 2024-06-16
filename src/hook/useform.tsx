import { useState, ChangeEvent, FormEvent } from 'react';

interface FormState {
  [key: string]: string;
}

type ValidateFunction<T> = (values: T) => FormState;

const useForm = <T extends FormState>(
  initialState: T,
  validate: ValidateFunction<T>
) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<FormState>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (
    e: FormEvent,
    onSubmit: (values: T) => Promise<void>
  ) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      await onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
