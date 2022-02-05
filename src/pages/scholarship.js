import React from 'react';
import Page from '../components/Page';
import { CognitoForm, Content } from '@codeday/topo/Molecule'

export default function Scholarship() {
  return (
    <Page darkHeader={false}>
      <Content>
        <CognitoForm formId={101} />
      </Content>
    </Page>
  );
}
