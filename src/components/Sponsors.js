/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box, Image, Heading, Link,
} from '@codeday/topo/Atom';
import { Content } from '@codeday/topo/Molecule';

export default function Sponsors({ globalSponsors, localSponsors }) {
  if (!globalSponsors) return <></>;

  return (
    <Content paddingBottom={8} textAlign="center">
      <Heading as="h3" color="current.textLight" fontSize="2xl" pb={8}>
        With Support From:
      </Heading>
      <Box mb={8}>
        {localSponsors
          .filter((sponsor) => sponsor.logoImageUri)
          .map((sponsor, i) => (
            <Link key={sponsor.name} to={sponsor.link}>
              <Image
                bg="white"
                padding={1}
                d="inline-block"
                maxHeight={48}
                maxWidth={64}
                p={8}
                src={sponsor.logoImageUri}
              />
            </Link>
          ))}
        {globalSponsors
          .filter((sponsor) => sponsor.type === 'major' && sponsor.logo?.url)
          .map((sponsor, i) => (
            <Link key={sponsor.name} href={sponsor.link}>
              <Image
                bg="white"
                padding={1}
                d="inline-block"
                maxHeight={48}
                maxWidth={64}
                p={8}
                src={sponsor.logo.url}
              />
            </Link>
          ))}
      </Box>
      <Box>
        {globalSponsors
          .filter((sponsor) => sponsor.type === 'minor' && sponsor.logo?.url)
          .map((sponsor, i) => (
            <Link key={sponsor.name} to={sponsor.link}>
              <Image
                bg="white"
                padding={1}
                d="inline-block"
                src={sponsor.logo.small}
                p={4}
              />
            </Link>
          ))}
      </Box>
    </Content>
  );
}
