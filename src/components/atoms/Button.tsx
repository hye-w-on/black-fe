import styled from '@emotion/styled';
import Button, { ButtonProps } from '@mui/material/Button';
//icon
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const StyledBasicButton = styled.button`
  margin: 5px;
  padding: 3px 10px;
  border-radius: 0.3rem;
  border: 1px solid transparent;
  background-color: #eee;
`;

//const BasicButton: React.FC<> = ({ children }) => { //react/prop-types Lint error
export const BasicButton = (props: React.HtmlHTMLAttributes<HTMLButtonElement>) => {
  return <StyledBasicButton {...props}>{props.children}</StyledBasicButton>;
};

export const ActionButton = (props: ButtonProps) => {
  return (
    <StyledActionButton variant="outlined" size="small" {...props}>
      {props.children}
    </StyledActionButton>
  );
};

const StyledActionButton = styled(Button)`
  min-width: 0px;
  padding: 5px;
  margin: 1px;
`;

export const ActionDeleteButton = (props: ButtonProps) => {
  return (
    <StyledActionDeleteButton variant="outlined" size="small" {...props}>
      <DeleteForeverRoundedIcon />
    </StyledActionDeleteButton>
  );
};
const StyledActionDeleteButton = styled(Button)`
  min-width: 0px;
  padding: 1px;
  margin: 1px;
`;
