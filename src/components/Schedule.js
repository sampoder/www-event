/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Box, Heading, Link, Text } from '@codeday/topo/Atom'
import { useColorModeValue } from '@codeday/topo/Theme'
import { DateTime } from 'luxon';

export default function Schedule({ event, timezone, ...props }) {
  if (!event.schedule || event.schedule.length === 0) return <></>;
  const days = event.schedule
    .map((e) => ({
      ...e,
      start: DateTime.fromISO(e.start).setZone(timezone),
    }))
    .map((e) => ({
      ...e,
      day: e.start.toLocaleString({ weekday: 'long' }),
    }))
    .sort((a, b) => { if (a.start < b.start) return -1; return 1; })
    .reduce((accum, e) => ({ ...accum, [e.day]: [...(accum[e.day] || []), e] }), []);

  return (
    <Box {...props}>
      <Heading textAlign="center" as="h3" fontSize="3xl" fontWeight="bold" mb={4}>Schedule</Heading>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
        {Object.keys(days).map((dayName) => (
          <Box key={dayName}>
            <Heading as="h4" fontSize="xl" mb={4}>{dayName}</Heading>
            {days[dayName].map((e) => (
              <Box key={e.id} mb={4} borderWidth={2}>
                <Box bg={useColorModeValue("gray.200", "gray.850")} p={1} mb={0} fontSize="sm">
                  {e.link ? (
                    <Link d="inline-block" fontWeight="bold" fontSize="lg" href={e.link} target="_blank">
                      {e.name}
                    </Link>
                  ) : <Text d="inline-block" fontWeight="bold" fontSize="lg" mb={0}>{e.name}</Text>}
                  <Text d="inline-block" ml={4} mb={0}>{e.displayTime}</Text>
                </Box>
                {e.description && (<Text mb={0} p={2} fontSize="sm">{e.description}</Text>)}
              </Box>
            ))}
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
