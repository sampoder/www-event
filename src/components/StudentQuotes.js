import {
  Grid, Box, Image, Heading, Text,
} from '@codeday/topo/Atom';
import { useSlideshow } from '../providers/slideshow';

const SIZE = 40;

function Highlight({ children }) {
  return <Text as="span" bold color="brand.700">{children}</Text>;
}

export default function StudentQuotes({ quotes, ...props }) {
  const i = useSlideshow(quotes.length, 6000);

  if (quotes.length === 0) return <></>;

  return (
    <Box {...props}>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} alignItems="center" gap={16}>
        <Box textAlign="center">
          <Heading as="h3" fontSize="2xl" pb={4}>
            Welcome to our friendly &amp; creative community of <Highlight>50,000+ students</Highlight> who have made{' '}
            <Highlight>10,000+ projects!</Highlight>
          </Heading>
        </Box>
        <Box position="relative" height={SIZE} ml={-4}>
          {quotes.map((quote, j) => (
            <Grid
              key={j}
              position="absolute"
              top={0}
              templateColumns="1px 100%"
              alignItems="center"
              opacity={i === j ? 1 : 0}
              transition="all 0.5s ease-in-out"
            >
              <Box borderRightWidth={2} borderRightColor="purple.300" height={SIZE} />
              <Box pl={8}>
                <Text textStyle="italic">{quote.quote}</Text>
                <Text mb={0} bold>
                  {quote.image && (
                    <Image src={quote.image.url} d="inline-block" mr={4} alt="" rounded="full" height={8} />
                  )}
                  {quote.firstName ? `${quote.firstName} ${quote.lastName || ''}` : 'Anonymous'},{' '}
                  {quote.experience?.toLowerCase() || 'beginner'} coder
                </Text>
              </Box>
            </Grid>
          ))}
        </Box>
      </Grid>
    </Box>
  );
}
