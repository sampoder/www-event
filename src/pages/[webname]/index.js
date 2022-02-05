import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { print } from 'graphql';
import { DateTime } from 'luxon';
import { Box, Button, Heading, Link, Text } from '@codeday/topo/Atom'
import { Content, DataCollection, CognitoForm } from '@codeday/topo/Molecule'
import { MailingListSubscribe } from '@codeday/topo/Organism'
import { useColorMode } from '@codeday/topo/Theme'
import { apiFetch } from '@codeday/topo/utils'
import Page from '../../components/Page';
import { IndexStaticPathsQuery, IndexStaticPropsQuery } from './index.gql';
import IndexHeader from '../../components/IndexHeader';
import Explainer from '../../components/Explainer';
import StudentQuotes from '../../components/StudentQuotes';
import CovidDetails from '../../components/CovidDetails';
import RegisterForm from '../../components/RegisterForm';
import ThemeNotifier from '../../components/ThemeNotifier';
import Schedule from '../../components/Schedule';
import Sponsors from '../../components/Sponsors';
import EventMailingListSubscribe from '../../components/EventMailingListSubscribe';
import Scroll from 'react-scroll';

export default function EventHome({ webname, region, images, quotes, event, cmsEvent, globalSponsors }) {
  // Redirect the user to the canonical URL
  const router = useRouter();
  const { colorMode } = useColorMode();
  useEffect(() => {
    if (typeof window === 'undefined' || !region) return;
    if (webname !== region.webname) {
      router.replace(`/${region.webname}`, `/${region.webname}`, { shallow: true });
    }
  }, [typeof window, webname, region]);

  // Show a 404 if the region doesn't exist
  if (!region) {
    return (
        <Page slug={`/${webname}`}>
          <Content>
            <Heading as="h2" fontSize="5xl" textAlign="center">Sorry, we couldn't find that CodeDay.</Heading>
          </Content>
        </Page>
    );
  }

  if (!event) {
    return (
      <Page darkHeader slug={`/${webname}`} region={region}>
        <IndexHeader mt={-40} pt={32} pb={16} mb={16} heading={`CodeDay ${region.name}`} images={images} />
        <Content maxWidth="container.xl">
          <Explainer />
          <br/>
          <StudentQuotes quotes={quotes}/>
          <br/>
          <Box textAlign="center">
          <Heading >😢 We don't have a CodeDay {region.name} planned for this season...</Heading>
            <Heading as="h2" fontSize="3xl">But you can still <Link href="https://virtual.codeday.org">participate virtually!</Link></Heading>
            <Button as="a" size="lg" m={2} colorScheme="purple" href="https://virtual.codeday.org">Register for Virtual CodeDay</Button>
          </Box>
          <Box m={4} textAlign="center">
            <Text>Be notified about the next CodeDay {region.name}:</Text>
            <Box w="md" d="inline-block" >
              <MailingListSubscribe emailList="oe1GazGggJqSDv0892QivA1g" />
              <DataCollection message={"pii"} />
            </Box>
          </Box>
        </Content>
      </Page>
    )
  }
  return (
      <Page darkHeader slug={`/${region.webname}`} region={region}>
        <IndexHeader
          mt={-40}
          pt={32}
          pb={16}
          mb={16}
          heading={`CodeDay ${region.name}`}
          subHeading={event.customDisplayDate || `${event.displayDate}, noon-noon`}
          images={images}
        >
          {event.venue? <>
          Hosted @ {event.venue.name} <br/>
          <Link fontSize="md" href={event.venue.mapLink}>{event.venue.address}</Link></>:null}
          {event.canRegister? <>
            <Text mt={8}>
              {event.activeTicketPrice === 0 ? 'Free!' : `Ticket Price: $${event.activeTicketPrice}`}&nbsp;
              {event.canEarlyBirdRegister && event.activeTicketPrice > 0?
                <Text mb={4} display="inline-block" color="#ff686b"> {/* For whatever reason color="brand" didn't work here? */}
                  (Early Bird Discount!)
                </Text>: null
              }
            </Text>
            <Button colorScheme="green" mr={2} onClick={() => Scroll.scroller.scrollTo('register', {duration: 500, smooth: true, offset:-50})}>Register Now</Button>
            {event.activeTicketPrice > 0 && (
              <Button variant="outline" as="a" href="/scholarship" hover={{bg: "#ff686b"}}>Can&apos;t afford?</Button>
            )}
          </>: null

          }
        </IndexHeader>
        <Content maxWidth="container.xl" mb={12}>
          <Explainer mb={12} />
        </Content>
        <a name="quote" />
        <Content maxWidth="container.xl" mb={12}>
          <StudentQuotes quotes={quotes}/>
        </Content>
        <Sponsors globalSponsors={event.customHideSponsors ? [] : globalSponsors} localSponsors={event.sponsors}/>
        {!event.customHideCovid && (
          <>
            <a name="covid" />
            <Box backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.900'} p={4} mb={12}>
              <Content maxWidth="container.xl">
                <CovidDetails />
              </Content>
            </Box>
          </>
        )}
        <a name="theme" />
        <Content maxWidth="container.xl">
          <ThemeNotifier event={cmsEvent} mb={12} />
        </Content>
        <a name="register" />
        { event.customForm ? (
          <Content maxWidth="container.lg">
            <Heading as="h3" fontSize="4xl" textAlign="center">Register</Heading>
            <CognitoForm formId={event.customForm} fallback={true} />
          </Content>
        ) : (
          <Content maxWidth="container.xl" mb={12}>
            <Box id="register" /> {/* used for register button */}
            {event.canRegister ? <RegisterForm event={event} />: (
              <EventMailingListSubscribe event={event}>
                <Text bold textAlign="center">CodeDay {region.name} is not currently accepting registrations</Text>
                <Text textAlign="center">Enter your email to be notified when registrations go live!</Text>
              </EventMailingListSubscribe>
            )}
          </Content>
        )}
        <Content maxWidth="container.lg">
          <Schedule event={event} timezone={region.timezone} mb={12} />
        </Content>
      </Page>
  )
}

export async function getStaticPaths() {
  const allRegions = await apiFetch(print(IndexStaticPathsQuery));
  const allWebnames = allRegions?.cms?.regions?.items
      .reduce((accum, r) => [...accum, r.webname, ...(r.aliases || [])], []) || [];

  return {
    paths: allWebnames.map((webname) => ({ params: { webname } })),
    fallback: true,
  }
}

export async function getStaticProps({ params: { webname } }) {
  const result = await apiFetch(print(IndexStaticPropsQuery), {
    webname,
    endDate: DateTime.now().minus({ days: 1 }),
    cmsEndDate: DateTime.now().minus({ days: 1 }),
  });
  return {
    props: {
      webname,
      region: result?.cms?.regions?.items[0] || null,
      images: result?.cms?.pressPhotos?.items || [],
      event: result?.clear?.findFirstEvent || null,
      quotes: result?.cms?.testimonials?.items || [],
      cmsEvent: result?.cms?.events?.items[0] || null,
      globalSponsors: result?.cms?.globalSponsors.items || null,
    },
    revalidate: 900,
  }
}
