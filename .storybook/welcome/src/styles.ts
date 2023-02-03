import { styled } from '@linaria/react';

export const Wrapper = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${props => props.height}%;
  width: 100%;
`;
