import { animated } from 'react-spring';

import { shade, lighten } from 'polished';
import styled, { css, keyframes } from 'styled-components';

interface ToastProps {
  type?: 'success' | 'error' | 'info';
  hasDescription: number;
}

const toastTypeVariations = {
  info: css`
    background: #a5defb;
    color: #024e75;
  `,
  success: css`
    background: #bafebe;
    color: #027509;
  `,
  error: css`
    background: #febaba;
    color: #940202;
  `,
};

const timeGradient = {
  info: css`
    background: ${`linear-gradient(130deg, ${shade(0.3, '#024e75')}, ${lighten(
      0.3,
      '#024e75',
    )})}`};
  `,
  success: css`
    background: ${`linear-gradient(130deg, ${shade(0.3, '#027509')}, ${lighten(
      0.3,
      '#027509',
    )})}`};
  `,
  error: css`
    background: ${`linear-gradient(130deg, ${shade(0.3, '#940202')}, ${lighten(
      0.3,
      '#940202',
    )})}`};
  `,
};

export const Container = styled(animated.div)<ToastProps>`
  width: 360px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);

  display: flex;

  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    top: 16px;
    right: 12px;
    opacity: 0.6;
    color: inherit;
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;

const growthRight = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

export const Time = styled.div<{ type?: 'success' | 'error' | 'info' }>`
  position: absolute;
  bottom: 0;
  left: 0;

  animation: ${growthRight} 5s ease-in-out;
  width: 100%;

  border-radius: 0 0 10px 10px;
  height: 8px;

  ${props => timeGradient[props.type || 'info']}
`;
