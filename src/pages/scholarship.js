import React from 'react';
import { CognitoForm, Content } from '@codeday/topo/Molecule';
import Page from '../components/Page';

export default function Scholarship() {
  return (
    <Page darkHeader={false}>
      <Content>
        <CognitoForm formId={101} />
      </Content>
    </Page>
  );
}
