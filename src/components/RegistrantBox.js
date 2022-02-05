/* eslint-disable react/prop-types */
import React, {
  useEffect, useReducer, useRef,
} from 'react';
import { Grid, Box, NumberInput, TextInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text } from '@codeday/topo/Atom'
import { UiError } from '@codeday/topocons/Icon';

export default function RegistrantBox({ event, onChange, ...rest }) {
  const [ticketData, setTicketData] = useReducer(
    (prev, next) => (Array.isArray(next) ? { ...prev, [next[0]]: next[1] } : next), {},
  );

  const initialRender = useRef(true);
  useEffect(() => {
    const isValid = Boolean(ticketData?.firstName && ticketData?.lastName
      && (ticketData?.email || ticketData?.phone)
      && ticketData?.age && ticketData.age > event.minAge && ticketData.age < event.maxAge);

    if (initialRender.current) initialRender.current = false;
    else onChange(ticketData, isValid);
  }, [ticketData]);

  return (
    <Box borderWidth={1} {...rest}>
      <Box bg="gray.300" p={2} color="black" fontWeight="bold" fontSize="lg">
        Participant Info
      </Box>
      <Box p={4}>
        <Text fontSize="sm" fontWeight="bold" mb={0}>Name</Text>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} mb={4}>
          <TextInput
            w="100%"
            placeholder="First (Given) Name"
            value={ticketData.firstName}
            onChange={
              (e) => setTicketData(['firstName', e.target.value])
            }
          />
          <TextInput
            w="100%"
            placeholder="Last (Family) Name"
            value={ticketData.lastName}
            onChange={
              (e) => setTicketData(['lastName', e.target.value])
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
              value={ticketData.email}
              onChange={
                (e) => setTicketData(['email', e.target.value])
              }
            />
          </Box>
          <Box color="current.textLight" fontSize="sm" textAlign="center">&mdash;&nbsp;OR&nbsp;&mdash;</Box>
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={0}>Phone Number</Text>
            <TextInput
              w="100%"
              placeholder="Phone Number"
              value={ticketData?.phone?.replace(/[^0-9]/g, '')}
              onChange={
                (e) => setTicketData(['phone', e.target.value])
              }
            />
          </Box>
        </Grid>

        <Text fontSize="sm" fontWeight="bold" mb={0}>
          {ticketData.firstName ? `${ticketData.firstName}'s` : 'Participant'} Age
        </Text>
        <NumberInput
          w="3xs"
          min={0}
          keepWithinRange
          value={ticketData.age}
          onChange={
            (value) => setTicketData(['age', value ? Number.parseInt(value) : null])
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        {ticketData.age < event.minAge || ticketData.age > event.maxAge
          ? (
            <Box bg="red.50" borderColor="red.500" color="red.800" borderWidth={1} mt={4} p={4}>
              <Text bold><UiError /> Sorry, you won&apos;t be able to register.</Text>
              <Text mb={0}>
                CodeDay is mostly targeted to high school students, and isn&apos;t a good fit for those{' '}
                who are {ticketData.age > event.maxAge ? `over ${event.maxAge}` : `under ${event.minAge}`}.
              </Text>
            </Box>
          ) : null}
      </Box>
    </Box>
  );
}
