import React from 'react';
import {
  Grid, Box, Image, Text,
} from '@codeday/topo/Atom';

const steps = [
  'Come up with ideas.',
  'Find a team.',
  'Start building it! (Beginner workshops - no experience needed!)',
  'Get help from mentors as needed.',
  'Join fun activities and competitions... with prizes!',
  'Show off what you made.',
];

export default function Explainer({ ...props }) {
  return (
    <Box {...props}>
      <Text textAlign="center" mb={12} fontSize="xl" bold color="gray.600">Here&apos;s how it works:</Text>
      <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }} gap={8} alignItems="top">
        {steps.map((text, i) => (
          <Box key={text}>
            <Image rounded="sm" shadow="md" mb={4} src={`/explainer/${i + 1}.png`} alt="" />
            <Text textAlign="center" fontSize="md" bold mb={0}>{i + 1}. {text}</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
