import React, { useState } from 'react';
import {
  Grid, Box, Button, TextInput,
} from '@codeday/topo/Atom';
import { DataCollection } from '@codeday/topo/Molecule';
import { apiFetch, useToasts } from '@codeday/topo/utils';
import { print } from 'graphql';
import { SubscribeMutation } from './EventMailingListSubscribe.gql';

export default function EventMailingListSubscribe({ event, children, ...props }) {
  const [email, setEmail] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useToasts();
  return (
    <Box w={['auto', 'md']} ml="auto" mr="auto" {...props}>
      {children}
      <Grid templateColumns="1fr min-content">
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          borderRightWidth={0}
        />
        <Button
          isLoading={isSubmitting}
          colorScheme="green"
          onClick={async () => {
            setIsSubmitting(true);
            try {
              await apiFetch(print(SubscribeMutation), {
                email,
                eventWhere: {
                  id: event.id,
                },
              });
              success('Confirmed!');
            } catch (e) {
              error(e.toString());
            }
            setIsSubmitting(false);
          }}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
        >
          Submit
        </Button>
      </Grid>
      <DataCollection message="pii" />
    </Box>
  );
}
