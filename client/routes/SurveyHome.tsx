import React from 'react';
import styled from 'styled-components';

import { useOrganization } from '../OrgProvider';
import Text from '../components/Text';
import Button from '../components/Button';

const Col = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 12px;
`;

const BtnRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, max-content);
  justify-content: end;
`;

const SurveyHome = () => {
  const { org } = useOrganization();

  return (
    <Col>
      <h1>👋&nbsp;&nbsp;Hey there!</h1>
      <Text>
        Thank you so much for taking some time to take our survey. At {org?.name} we believe one of
        our highest callings is discipleship.
      </Text>
      <Text>
        We want to make sure we're helping you and our {org?.shortName || org?.name} community to
        grow, and to measure our effectiveness, we want to ask you a few questions periodically to
        gauge how we're doing.
      </Text>
      <Text>
        This survey will cover questions about your personal practice, key areas of knowledge, and
        community flourishing. We expect it will take no more than <strong>20 minutes</strong> to
        complete.
      </Text>
      <Text>
        <em>All answers are completely anonymous.</em>
      </Text>
      {/* Add mention of rewards from survey fetch */}
      <BtnRow>
        <Button>Get Started</Button>
      </BtnRow>
    </Col>
  );
};

export default SurveyHome;
