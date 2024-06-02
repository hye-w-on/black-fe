import styled from '@emotion/styled';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export const BasicTextField = (props: TextFieldProps) => {
  return (
    <StyledBasicTextField variant="outlined" color="primary" {...props}>
      {props.children}
    </StyledBasicTextField>
  );
};

const StyledBasicTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    padding: '4px 10px 4px 10px',
  },
});
