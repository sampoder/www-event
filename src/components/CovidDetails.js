import React from 'react';
import {
  Grid, Box, Button, Image, Heading, Link, Text,
} from '@codeday/topo/Atom';
import { useColorMode } from '@codeday/topo/Theme';

function Highlight({ children }) {
  return <Text as="span" bold color="brand.700">{children}</Text>;
}

export default function CovidDetails({ ...props }) {
  const { colorMode } = useColorMode();
  const bg = colorMode === 'light' ? 'gray.50' : 'black';
  return (
    <Box {...props}>
      <Heading>
        COVID-19 Safety Precautions
      </Heading>
      <Text>
        We are adhering to <Highlight>the same or better safety measures as most schools</Highlight> to keep you safe.
      </Text>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} alignItems="center" gap={16}>
        <Box bg={bg} rounded="md" p={4} h="100%">
          <Image src="twemoji/mask.svg" width={24} alt="Face Mask" display="block" ml="auto" mr="auto" mb={5} />
          <Text bold>
            We&apos;ll provide you with a <Highlight>high-flow N95 mask</Highlight> which you must wear{' '}
            <Highlight>at all times.</Highlight>
          </Text>
          <Text>To minimize transmission risks, we&apos;re not allowing regular cloth masks.</Text>
        </Box>
        <Box bg={bg} rounded="md" p={4} h="100%">
          <Image src="twemoji/vaccine.svg" width={24} alt="Vaccine" display="block" ml="auto" mr="auto" mb={5} />
          <Text bold>
            Documentation of full COVID-19 vaccination is <Highlight>required</Highlight> to attend in-person.
          </Text>
          <Text>
            If you aren&apos;t able to get vaccinated, you can still{' '}
            <Link href="https://virtual.codeday.org/">attend online!</Link>
          </Text>
          <Button as="a" href="https://vaccines.gov/" size="sm">Get Vaccinated</Button>
        </Box>
        <Box bg={bg} rounded="md" p={4} h="100%">
          <Image src="twemoji/sick.svg" width={24} alt="Sick" display="block" ml="auto" mr="auto" mb={5} />
          <Text bold>We&apos;re checking for symptoms of COVID-19 at check-in.</Text>
          <Text>
            If you are running a fever or have other symptoms of COVID-19, you&apos;ll need to participate virtually
            for safety.
          </Text>
        </Box>
      </Grid>
    </Box>
  );
}
