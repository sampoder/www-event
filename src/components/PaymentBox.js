/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Button } from '@codeday/topo/Atom'
import { apiFetch } from '@codeday/topo/utils'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { print } from 'graphql';
import { useToast } from '@chakra-ui/react';
import { RegisterMutation, FinalizePaymentMutation, WithdrawFailedPaymentMutation } from './RegisterForm.gql';

export default function PaymentBox({
  event, ticketsData, guardianData, promoCode, finalPrice, isValid, onComplete, ...rest
}) {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const [isStripeReady, setIsStripeReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ready = (finalPrice === 0 || isStripeReady) && isValid;
  const expectedPrice = finalPrice * ticketsData.length;

  return (
    <Box shadow="md" rounded="sm" borderWidth={1} p={4} {...rest}>
      {finalPrice > 0 && (
        <Box mb={8}>
          <CardElement onChange={(e) => setIsStripeReady(e.complete)} />
        </Box>
      )}
      <Button
        rounded={0}
        w="100%"
        colorScheme={ready ? 'green' : 'gray'}
        disabled={!ready}
        isLoading={isLoading}
        onClick={async () => {
          setIsLoading(true);
          try {
            const result = await apiFetch(print(RegisterMutation), {
              eventId: event.id,
              ticketsData,
              guardianData: guardianData || undefined,
              promoCode,
            });

            if (expectedPrice > 0) {
              const intentSecret = result.clear.registerForEvent;
              const intent = await stripe.retrievePaymentIntent(intentSecret);
              if (Math.abs(intent.paymentIntent.amount - expectedPrice * 100) >= 1) {
                throw new Error(
                  `The total changed since the page was loaded (this usually means a discount expired), and you were`
                    + ` NOT charged. The new total is ${intent.paymentIntent.amount / 100}. Please refresh the page.`,
                );
              }

              // eslint-disable-next-line no-unused-vars
              const { error: stripeError } = await stripe.confirmCardPayment(intentSecret, {
                payment_method: {
                  card: elements.getElement(CardElement),
                },
              });

              if (stripeError) {
                await apiFetch(print(WithdrawFailedPaymentMutation), { paymentIntentId: intent.paymentIntent.id });
                throw new Error(stripeError.message);
              }

              await apiFetch(print(FinalizePaymentMutation), { paymentIntentId: intent.paymentIntent.id });
            }

            onComplete();
          } catch (ex) {
            toast({
              status: 'error',
              title: 'Error',
              description: ex.response?.errors
                ? ex.response.errors.map(error => error.message).join(' ')
                : ex.toString(),
            });
          }
          setIsLoading(false);
        }}
      >
        {ready
          ? (expectedPrice === 0 ? 'Complete Free Registration' : `Pay Now ($${expectedPrice.toFixed(2)})`)
          : '(fill all required fields)'}
      </Button>
    </Box>
  );
}
