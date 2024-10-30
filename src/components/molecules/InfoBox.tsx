import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface InfoBoxProps {
  title?: string;
  children: ReactNode;
}

export const InfoBox = ({ title, children }: InfoBoxProps) => {
  return <InfoBoxWrapper>{children}</InfoBoxWrapper>;
};
const InfoBoxWrapper = styled.div`
  width: 100%;
  margin: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 0.3rem;
`;
