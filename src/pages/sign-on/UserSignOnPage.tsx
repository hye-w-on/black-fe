import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';

interface IForm {
  occupation: string;
  id: string;
  name: string;
  pwd: string;
  email: string;
  phone: string;
}

const UserSignOnPage = () => {
  const {
    register,
    formState: { errors, isSubmitting, isSubmitted },
    watch,
    reset,
    handleSubmit,
    getValues,
    setError,
    setFocus,
  } = useForm<IForm>({
    mode: 'onSubmit',
    defaultValues: {
      occupation: 'student',
      id: '',
      name: '',
      pwd: '',
      email: '',
      phone: '',
    },
  });
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Box>
          <label>name: </label>
          <input
            type="text"
            {...register('name', {
              required: '해당 필드는 필수입니다.',
              minLength: {
                value: 3,
                message: '3글자 이상 입력해주세요.',
              },
            })}
          />
          {isSubmitted && errors?.name ? <p className="error">{errors.name?.message}</p> : null}
        </Box>
        <Box>
          <label>email: </label>
          <input
            type="text"
            {...register('email', {
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '이메일 형식에 맞지 않습니다.',
              },
            })}
          />
          {isSubmitted && errors?.email ? <p className="error">{errors.email?.message}</p> : null}
        </Box>
        <button type="submit" disabled={isSubmitting}>
          로그인
        </button>
      </form>
    </>
  );
};
export default UserSignOnPage;
