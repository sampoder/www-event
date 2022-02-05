/* eslint-disable react/prop-types */
import React, {
  useEffect, useReducer, useRef,
} from 'react';
import {
  Grid, Box, TextInput, Text,
} from '@codeday/topo/Atom';

export default function GuardianBox({ /* event, */ onChange, ...rest }) {
  const [guardianData, setGuardianData] = useReducer(
    (prev, next) => (Array.isArray(next) ? { ...prev, [next[0]]: next[1] } : next), {},
  );

  const initialRender = useRef(true);
  useEffect(() => {
    const isValid = Boolean(
      guardianData?.firstName
      && guardianData?.lastName
      && (guardianData?.email || guardianData?.phone),
    );

    if (initialRender.current) initialRender.current = false;
    else onChange(guardianData, isValid);
  }, [guardianData]);

  return (
    <Box borderWidth={1} {...rest}>
      <Box bg="gray.300" p={2} color="black" fontWeight="bold" fontSize="lg">
        Parent/Guardian Info
        <Text fontSize="sm" mb={0}>Required when any participant is a minor.</Text>
      </Box>
      <Box p={2}>
        <Text fontSize="sm" fontWeight="bold" mb={0}>Name</Text>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} mb={4}>
          <TextInput
            w="100%"
            placeholder="First (Given) Name"
            value={guardianData.firstName}
            onChange={
              (e) => setGuardianData(['firstName', e.target.value])
            }
          />
          <TextInput
            w="100%"
            placeholder="Last (Family) Name"
            value={guardianData.lastName}
            onChange={
              (e) => setGuardianData(['lastName', e.target.value])
            }
          />
        </Grid>
        <Grid
          mb={4}
          templateColumns={{ base: '1fr', md: 'minmax(0, 100%) 1fr minmax(0, 100%)' }}
          alignItems="center"
          gap={4}
        >
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={0}>Email</Text>
            <TextInput
              w="100%"
              placeholder="Email Address"
              value={guardianData.email}
              onChange={
                (e) => setGuardianData(['email', e.target.value])
              }
            />
          </Box>

          <Box color="current.textLight" fontSize="sm" textAlign="center">&mdash;&nbsp;OR&nbsp;&mdash;</Box>

          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={0}>Phone Number</Text>
            <TextInput
              w="100%"
              placeholder="Phone Number"
              value={guardianData?.phone?.replace(/[^0-9]/g, '')}
              onChange={
                (e) => setGuardianData(['phone', e.target.value])
              }
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
