import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: ${(props) => props.color};
  padding: 96px 0;
  min-height: 100%;
`;

const CardWrapper = styled.div`
  width: 95%;
  max-width: 900px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: space-between;
  padding-bottom: 24px;
`;

const HeaderFieldWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  grid-gap: 8px;
  align-items: center;

  span:not(.material-icons-outlined) {
    font-size: 14px;
    font-weight: 600;
  }

  .material-icons-outlined {
    font-size: 18px;
  }
`;

const Card = styled.div`
  --shadow-color: ${(props) => props.color};
  padding: 48px;
  display: block;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0.5px 0.5px hsl(var(--shadow-color) / 0.53),
    0 1.5px 1.5px -1.2px hsl(var(--shadow-color) / 0.46),
    0 4.2px 4.1px -2.3px hsl(var(--shadow-color) / 0.38),
    0 11px 10.7px -3.5px hsl(var(--shadow-color) / 0.3);
`;

type ColorMap = {
  [color: string]: {
    bg: string;
    shadow: string;
  };
};

const COLORS: ColorMap = {
  yellow: {
    bg: '#fff7ed',
    shadow: '34deg 30% 59%',
  },
  gray: {
    bg: '#e9ebed',
    shadow: '211deg 4% 56%',
  },
  kale: {
    bg: '#f5fcfc',
    shadow: '180deg 15% 59%',
  },
  blue: {
    bg: '#edf7ff',
    shadow: '207deg 30% 59%',
  },
  green: {
    bg: '#edf8f4',
    shadow: '159deg 14% 58%',
  },
  red: {
    bg: '#fff0f1',
    shadow: '356deg 28% 59%',
  },
};

const SurveyWrapper = () => {
  const [questionsLeft, setQuestionsLeft] = useState(2);
  const [color, setColor] = useState('gray');

  return (
    <Wrapper color={COLORS[color].bg}>
      <CardWrapper>
        <Row>
          <HeaderFieldWrapper>
            <span className="material-icons-outlined">visibility_off</span>
            <span>You are anonymous</span>
          </HeaderFieldWrapper>
          <HeaderFieldWrapper>
            <span>
              {questionsLeft} question{questionsLeft > 1 ? 's' : ''} left
            </span>
          </HeaderFieldWrapper>
        </Row>
        <Card color={COLORS[color].shadow}>
          <Outlet />
        </Card>
      </CardWrapper>
    </Wrapper>
  );
};

export default SurveyWrapper;
