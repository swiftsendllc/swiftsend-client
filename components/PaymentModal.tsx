'use client';

import usePaymentAPI from '@/hooks/api/usePaymentAPI';
import { CardsEntity } from '@/hooks/entities/payments.entity';
import { ENV } from '@/library/constants';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, MetadataParam } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function PaymentModal({
  onClose,
  metadata,
  cardData,
  onSuccess,
  makePayment
}: {
  makePayment: (paymentMethodId: string) => Promise<{ requiresAction: boolean; clientSecret: string }>;
  isOpen: boolean;
  onClose: () => unknown;
  metadata: MetadataParam;
  cardData: CardsEntity | null;
  onSuccess?: () => unknown;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { attachPaymentMethod, confirmCard } = usePaymentAPI();
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const handleClose = () => {
    onClose?.();
  };
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        '::placeholder': {
          color: '#aab7c4'
        },
        backgroundColor: '#f8f9fa'
      },
      invalid: {
        color: '#fa755a'
      }
    }
  };

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (!stripe || !elements) {
        throw new Error('Payment is still loading.Try again');
      }
      let paymentMethodId = cardData?.id;
      console.log('.....');
      if (!paymentMethodId) {
        const newCard = elements.getElement(CardElement);
        const { paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: newCard!,
          metadata,
          billing_details: {
            name: 'Chris Evans'
          }
        });
        paymentMethodId = paymentMethod!.id;
      }
      console.log('.....card...');

      const attachPayment = await attachPaymentMethod({
        paymentMethodId: paymentMethodId
      });
      console.log('.....card...attached...');

      if (attachPayment.nextActionUrl) {
        await stripe.confirmCardSetup(attachPayment.clientSecret, {
          payment_method: paymentMethodId
        });
      }
      console.log('.....card...attached...confirming');
console.log(paymentMethodId)
      await confirmCard({
        paymentMethodId: paymentMethodId
      });
      console.log('.....card...attached...confirming....confirm');
      console.log(paymentMethodId)

      const paymentResponse = await makePayment(paymentMethodId);
      console.log('.....card...attached...confirming....confirmed...paymentResponse');
      console.log(paymentMethodId)

      const d = await stripe.confirmCardPayment(paymentResponse.clientSecret, {
        payment_method: paymentMethodId
      });
      console.log('.....card...attached...confirming....confirmed....confirmed...');

      if (d.paymentIntent?.status === 'succeeded') onSuccess?.();
      console.log('.....card...attached...confirming....confirmed....confirmed......status');

      toast.success('PURCHASED');
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO PURCHASE!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={handleClose}
        fullWidth
        keepMounted
        maxWidth="xs"
        PaperProps={{
          style: {
            margin: 0,
            width: '100%'
          }
        }}
        aria-describedby="payment-modal-page"
      >
        <DialogTitle>Complete Your Payment</DialogTitle>
        {cardData === null ? null : (
          <Card sx={{ width: '100%' }}>
            <CardHeader
              title={cardData.card.brand}
              subheader={cardData.card.last4}
              action={
                <IconButton onClick={handlePayment}>
                  <Chip label="Pay" color="success" />
                </IconButton>
              }
            />
          </Card>
        )}

        <DialogContent>
          <Box component="form" onSubmit={handlePayment} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Payment Method
            </Typography>
            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} row>
              <FormControlLabel value="card" control={<Radio />} label="💳 Credit Card" />
              <FormControlLabel value="link" control={<Radio />} label="🏦 Debit card" />
              <FormControlLabel value="apple_pay" control={<Radio />} label="💻 Apple Pay" />
            </RadioGroup>
            {paymentMethod === 'card' && (
              <Box
                sx={{
                  p: 2,
                  border: '1px solid #ccd7e2',
                  borderRadius: '4px',
                  mt: 2
                }}
              >
                <Typography variant="subtitle2" color="primary">
                  Card Number
                </Typography>
                <CardElement options={CARD_ELEMENT_OPTIONS} />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center'
          }}
        >
          <LoadingButton
            loading={loading}
            onClick={handlePayment}
            variant="contained"
            sx={{ width: '100%' }}
            disabled={!(stripe && elements && paymentMethod)}
          >
            PAY
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
const stripePromise = loadStripe(ENV('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'));

const PaymentModalWrapper = ({
  isOpen,
  onClose,
  metadata,
  onSuccess,
  makePayment
}: {
  isOpen: boolean;
  onClose: () => unknown;
  metadata: MetadataParam;
  onSuccess: () => unknown;
  makePayment: (paymentMethodId: string) => Promise<{ requiresAction: boolean; clientSecret: string }>;
}) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { getCard } = usePaymentAPI();
  const [cardData, setCardData] = useState<CardsEntity | null>(null);
  const handleCard = async () => {
    if (cardData) return;
    try {
      const cardData = await getCard();
      if (cardData) setCardData(cardData);
    } catch (error) {
      console.error(error);
      setCardData(null);
    }
  };
  useEffect(() => {
    if (isOpen) handleCard();
  }, [isOpen]); //eslint-disable-line

  return (
    <>
      {open && (
        <Elements stripe={stripePromise!}>
          <PaymentModal
            isOpen={true}
            onClose={onClose}
            metadata={metadata}
            cardData={cardData}
            onSuccess={onSuccess}
            makePayment={makePayment}
          />
        </Elements>
      )}
    </>
  );
};

export default PaymentModalWrapper;
