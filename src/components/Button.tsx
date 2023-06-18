import { ReactNode } from 'react';
import styled from 'styled-components';

const Btn = styled.button<{ accent?: string }>`
  background-color: ${(props) =>
    props.accent ? 'rgba(255,255,255,0.95)' : 'rgba(120,120,120,0.9)'};
  color: ${(props) => (props.accent ? ' #000' : ' #fff')};
  padding: 10px 30px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  font-size: 22px;
  font-weight: 300;
  svg {
    margin-right: 5px;
  }

  &:hover {
    background-color: ${(props) =>
      props.accent ? 'rgba(255,255,255,0.8)' : 'rgba(120,120,120,0.8)'};
  }
`;

interface IBtn {
  children: ReactNode;
  accent?: string;
}

export default function Button({ accent, children }: IBtn) {
  return <Btn accent={accent}>{children}</Btn>;
}
