import React from 'react';
import { sign, verify } from 'jsonwebtoken';
import { Box } from '@codeday/topo/Atom';
import { CognitoForm, Content } from '@codeday/topo/Molecule';
import { apiFetch } from '@codeday/topo/utils';
import getConfig from 'next/config';
import { print } from 'graphql';
import Page from '../../components/Page';
import { GetTicketDetailsQuery } from './token.gql';
import ErrorPage from '../../components/ErrorPage';

const { serverRuntimeConfig } = getConfig();
export default function WaiverPage({ token, ticket, error }) {
  if (error) return <ErrorPage details={error} />;
  return (
    <Page>
      <Content>
        <Box borderWidth={1} shadow="md" rounded="md" overflow="hidden">
          <Box
            bg="brand.700"
            color="brand.50"
            fontSize="xl"
            p={4}
            fontWeight="bold"
            rounded="md"
            borderBottomLeftRadius={0}
            borderBottomRightRadius={0}
          >
            CodeDay Participation Waiver
          </Box>
          <Box p={8}>
            <CognitoForm
              formId={5}
              prefill={{
                JWT: token,
                Minor: (ticket.age >= ticket.event.majorityAge ? 'no' : 'yes'),
                Ticket: ticket.id,
                ParticipantName: `${ticket.firstName} ${ticket.lastName}`,
                EventName: ticket.event.name,
                SignerEmail: ticket.guardian?.email,
              }}
            />
          </Box>
        </Box>

      </Content>
    </Page>
  );
}

export async function getServerSideProps({ params: { token } }) {
  let jwt;
  try {
    jwt = verify(token, serverRuntimeConfig.clear_gql.secret, { audience: serverRuntimeConfig.audience });
    if (!jwt) {
      return {
        props: {
          error: 'JWT verification failed',
        },
      };
    }
  } catch (e) {
    return {
      props: {
        error: e.toString(),
      },
    };
  }
  const clearToken = sign(
    { t: 'A' },
    serverRuntimeConfig.clear_gql.secret,
    { audience: serverRuntimeConfig.clear_gql.audience, expiresIn: '10s' },
  );

  const { clear } = await apiFetch(
    print(GetTicketDetailsQuery),
    { ticketId: jwt.tid },
    { 'X-Clear-Authorization': `Bearer ${clearToken}` },
  );
  const { ticket } = clear;
  if (!ticket) {
    return {
      props: {
        error: 'Ticket not found',
      },
    };
  }

  return {
    props: {
      token,
      ticket,
    },
  };
}
