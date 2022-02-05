import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { Box, Button, CodeDay, Text } from '@codeday/topo/Atom'
import { Footer, SiteLogo, Menu, Header, Main } from '@codeday/topo/Organism'
import { useColorMode } from '@chakra-ui/react';

const DOMAIN = 'https://event.codeday.org';

export default ({ children, title, darkHeader, slug, region }) => {
  return (
    <Box overflow="hidden">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <DefaultSeo
        title={[title, region?.name, `CodeDay`].filter((s) => s).join(' ~ ')}
        description="CodeDay is a 24-hour event where students get together to build apps and games and have a lot of fun."
        canonical={`${DOMAIN}${slug}`}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          site_name: 'CodeDay',
          url: `${DOMAIN}${slug}`,
        }}
        twitter={{
          handle: '@codeday',
          site: '@codeday',
          cardType: 'summary_large_image',
        }}
      />
      <Box position="relative">
        <Header darkBackground={darkHeader} gradAmount={darkHeader && 'lg'} color={darkHeader && "white"} underscore position="relative" zIndex={1000}>
          <SiteLogo>
            <a href="https://www.codeday.org/">
              <CodeDay color={darkHeader && "white"} withText />
            </a>
            {region ? (
              <a href={`/${region.webname}`}>
                <Text
                  as="span"
                  d="inline"
                  letterSpacing="-2px"
                  fontFamily="logo"
                  position="relative"
                  top={1}
                  ml={1}
                  textDecoration="underline"
                  bold
                >
                  {region.name}
                </Text>
              </a>
            ) : <></>}
          </SiteLogo>
          <Menu>
            <Button as="a" href="https://www.codeday.org/help/codeday" variant="ghost" target="_blank">FAQ</Button>
            <Button as="a" href="https://www.codeday.org/edu/codeday" variant="ghost" target="_blank">Schools</Button>
            <Button as="a" href="https://www.codeday.org/volunteer" variant="ghost" target="_blank">Volunteer</Button>
            <Button as="a" href="https://virtual.codeday.org" variant="ghost" target="_blank">Virtual CodeDay</Button>
          </Menu>
        </Header>
        <Main>
          {children}
        </Main>
        <Footer />
      </Box>
    </Box>
  )
};
