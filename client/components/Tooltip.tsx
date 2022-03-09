import styled from 'styled-components';
import React, { FC } from 'react';

const TooltipStyled = styled.div`
  --shadow-color: 0deg 0% 0%;
  background: #0f1921;
  color: #fff;
  position: absolute;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  top: calc(100% + 12px);
  z-index: 1000;
  left: 12px;
  max-width: 250px;
  width: max-content;
  box-shadow: 0 0.8px 0.9px hsl(var(--shadow-color) / 0.23),
    -0.1px 3.5px 3.9px -0.4px hsl(var(--shadow-color) / 0.23),
    -0.1px 6.3px 7.1px -0.7px hsl(var(--shadow-color) / 0.23),
    -0.2px 10.3px 11.6px -1.1px hsl(var(--shadow-color) / 0.23),
    -0.4px 16.2px 18.2px -1.4px hsl(var(--shadow-color) / 0.23),
    -0.6px 25.3px 28.5px -1.8px hsl(var(--shadow-color) / 0.23),
    -0.9px 38.3px 43.1px -2.1px hsl(var(--shadow-color) / 0.23),
    -1.3px 56.3px 63.4px -2.5px hsl(var(--shadow-color) / 0.23);

  p {
    font-weight: 500;
    line-height: 1.5;

    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }

  a {
    --link-underline-color: #0f1921;
    color: #fff;
    text-shadow: 0 0.05em var(--link-underline-color), 0.05em 0.05em var(--link-underline-color),
      -0.05em 0.05em var(--link-underline-color), 0.17em 0.05em var(--link-underline-color),
      -0.17em 0.05em var(--link-underline-color), 0.17em 0 var(--link-underline-color),
      -0.17em 0 var(--link-underline-color);
  }
`;

const Tooltip: FC = (props) => {
  return <TooltipStyled>{props.children}</TooltipStyled>;
};

export default Tooltip;
