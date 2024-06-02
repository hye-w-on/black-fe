type FormControlElement = HTMLInputElement | HTMLTextAreaElement;
interface BasicInputProps {
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<FormControlElement>;
  ref?: any;
}

const BasicInput = (props: BasicInputProps) => {
  const { placeholder, value, onChange, ref, ...rest } = { ...props };

  return (
    <input value={value ?? ''} placeholder={placeholder} onChange={onChange} ref={ref} {...rest} />
  );
};

export default BasicInput;
