import {
  Controller,
  FieldValues,
  useController,
  useForm,
  Control,
  FormProvider,
  useFormContext,
  useWatch,
  SubmitHandler,
} from 'react-hook-form';
import { InfoBox } from '../../components/molecules/InfoBox';

interface MyFormValues {
  firstName: string;
  lastName: string;
  fullName: string;
  nickname: string;
  email: string;
  title: string;
  developer: string;
}

function CustomInput({
  control,
  name,
}: {
  control: Control<MyFormValues>;
  name: keyof MyFormValues;
}) {
  const {
    field, // { onChange, onBlur, value, name, ref },
    //fieldState: { invalid, isTouched, isDirty },
    //formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
  });
  return <input {...field} />;
}

function NestedInput() {
  /* FormProvider를 사용해야함, useFormContext를 Props로 전달하는 것이 불편한 깊게 중첩된 구조에서 사용*/
  const { register } = useFormContext();
  return <input {...register('test')} />;
}

function FirstNameWatched({ control }: { control: Control<MyFormValues> }) {
  const firstName = useWatch({
    control,
    name: 'firstName',
    defaultValue: 'default',
  });

  return <p>Watch: {firstName}</p>;
}

export default function RequestPage() {
  /* const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control
  } */
  const methods = useForm<MyFormValues>();

  /* errors은 form 변경마다 반영됨  */
  console.log(methods.formState.errors);
  /* Watch도 form 변경마다 반영됨 */
  console.log(methods.watch('email'));
  /* Touched 사용자가 직접 접근한 form만 추가됨(submit을 하더라도 전체가 추가되지 않음) */

  const { onChange, onBlur, name, ref } = methods.register('lastName');

  const onSubmit: SubmitHandler<MyFormValues> = (data: any) => console.log(data);
  return (
    <>
      <InfoBox>haha</InfoBox>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <input
            type="text"
            placeholder="First Name"
            {...methods.register('firstName', { required: true, maxLength: 80 })}
          />
          {/* same as above*/}
          <input
            type="text"
            placeholder="Last Name"
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            ref={ref}
          />
          <br />
          <Controller
            control={methods.control}
            name="fullName"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <input
                  onChange={(e) => onChange(parseInt(e.target.value))}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                />
              );
            }}
          />
          <CustomInput control={methods.control} name="nickname" />
          <NestedInput />
          <FirstNameWatched control={methods.control} />
          <input
            type="text"
            placeholder="Email"
            {...methods.register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          <select {...methods.register('title', { required: true })}>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
          </select>
          <input {...methods.register('developer', { required: true })} type="radio" value="Yes" />
          <input {...methods.register('developer', { required: true })} type="radio" value="No" />
          <input type="submit" />
        </form>
      </FormProvider>
    </>
  );
}
