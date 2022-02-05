import React from 'react';
import { ThemeProvider } from '@codeday/topo/Theme'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const stripePromise = loadStripe(publicRuntimeConfig.stripeKey);

export default ({ Component, pageProps }) => (
  <ThemeProvider brandColor="red" withChat>
    <Elements stripe={stripePromise}>
      <Component {...pageProps} />
    </Elements>
  </ThemeProvider>
);
