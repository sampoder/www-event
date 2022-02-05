import { Heading, Link, Text } from "@codeday/topo/Atom"
import { Content } from "@codeday/topo/Molecule"
import { DisappointedFace } from '@codeday/topocons/Emoji/People';
import React from 'react';
import Page from './Page';

export default function ErrorPage({ details }) {
  return (
    <Page title="Error">
      <Content>
        <Heading textAlign="center">
          <DisappointedFace height="5em" width="5em" /><br />An unexpected error occurred
        </Heading>
        <Heading textAlign="center" as="h2">
          Please <Link href="mailto:team@codeday.org">contact CodeDay staff</Link> for help
        </Heading>
        <Text textAlign="center" color="gray.500"> { details }</Text>
      </Content>
    </Page>
  )
}
