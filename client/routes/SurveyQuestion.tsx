import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Col = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 12px;

  h1 {
    width: 100%;
    display: block;
    text-align: center;
    max-width: 650px;
    margin: 0 auto;
  }
`;

const SurveyQuestion = () => {
  const params = useParams();

  return (
    <Col>
      <h1>Those in authority at Flatland Church can be relied on to do what is right.</h1>
    </Col>
  );
};

export default SurveyQuestion;
