import React from 'react';
import { Box, Text } from '@codeday/topo/Atom'
import { Slides } from '@codeday/topo/Molecule'

export default function ThemeNotifier({ event, ...props }) {
  const { theme, themeBackgrounds } = event || {};

  if (!themeBackgrounds || themeBackgrounds?.items?.length === 0) return <></>;

  return (
    <Box position="relative" height="300px" {...props}>
      {themeBackgrounds.items.length > 0 && (
        <Slides
          height="300px"
          borderRadius="md"
          position="absolute"
          top={0}
          left={0}
          right={0}
          style={{ filter: 'brightness(50%)' }}
          duration={5}
        >
          {themeBackgrounds.items.map((bg) => (
            <Box
              key={bg.url}
              backgroundImage={`url(${bg.url})`}
              backgroundPosition="50% 50%"
              backgroundSize="cover"
              h="300px"
            />
          ))}
        </Slides>
      )}
      <Box
        position="absolute"
        top={{ base: 4, md: 12 }}
        left={0}
        right={0}
        pl={2}
        pr={2}
        color="white"
      >
        {theme ? (
          <>
            <Text textAlign="center" mt={{ base: 4, md: 0 }} fontSize="2xl" bold>
              The theme is...
            </Text>
            <Text textAlign="center" fontSize={{ base: '5xl', md: '6xl' }} lineHeight={1} fontFamily="accent" bold>
              &ldquo;{theme}&rdquo;
            </Text>
            <Text textAlign="center" fontSize="lg" mt={8} bold>
              (But it's optional!)
            </Text>
          </>
        ) : (
          <>
            <Text textAlign="center" fontSize={{ base: '5xl', md: '6xl' }} mt={{ base: 0, md: 8 }} lineHeight={1} fontFamily="accent" bold>
              Theme will be revealed soon.
            </Text>
            <Text textAlign="center" fontSize="2xl" mt={8} bold>
              Send your guesses to @codeday_org on Instagram for a chance to win a prize.
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
}
