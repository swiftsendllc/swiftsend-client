'use client';

import usePaymentAPI from '@/hooks/api/usePaymentAPI';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import { LoadingButton } from '@mui/lab';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';

import { UserContext } from '@/hooks/context/user-context';
import { CardsEntity } from '@/hooks/entities/payments.entity';
import { ENV } from '@/library/constants';
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
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AddCardModal from './AddCardModal';

function PaymentModal({
  onClose,
  selectedPost,
  cardData
}: {
  isOpen: boolean;
  onClose: () => unknown;
  selectedPost: PostsEntity;
  cardData: CardsEntity | null;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { createPayment, attachPaymentMethod, confirmCard } = usePaymentAPI();
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [cardModal, setCardModal] = useState<boolean>(false);
  const [user] = useContext(UserContext);

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
      if (!paymentMethodId) {
        const newCard = elements.getElement(CardElement);
        const { paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: newCard!,
          metadata: {
            userId: user.userId,
            creatorId: selectedPost.user.userId,
            contentId: selectedPost._id
          },
          billing_details: {
            name: 'Chris Evans'
          }
        });
        paymentMethodId = paymentMethod!.id;
      }

      const attachPayment = await attachPaymentMethod({
        paymentMethodId: paymentMethodId
      });

      if (attachPayment.nextActionUrl) {
        await stripe.confirmCardSetup(attachPayment.clientSecret, {
          payment_method: paymentMethodId
        });
      }
      await confirmCard({
        paymentMethodId: paymentMethodId
      });

      const paymentResponse = await createPayment(selectedPost.user.userId, {
        amount: selectedPost.price,
        contentId: selectedPost._id,
        payment_method: paymentMethodId,
        payment_method_types: ['card']
      });

      if (paymentResponse.requiresAction) {
        await stripe.confirmCardPayment(paymentResponse.clientSecret, {
          payment_method: paymentMethodId
        });
      }

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
      <AddCardModal isOpen={cardModal} onClose={() => setCardModal(false)} />
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
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              row
            >
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="💳 Credit Card"
              />
              <FormControlLabel
                value="link"
                control={<Radio />}
                label="🏦 Debit card"
              />
              <FormControlLabel
                value="apple_pay"
                control={<Radio />}
                label="💻 Apple Pay"
              />
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
            disabled={!(stripe && elements)}
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
  selectedPost
}: {
  isOpen: boolean;
  onClose: () => unknown;
  selectedPost: PostsEntity | null;
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
      {open && selectedPost && (
        <Elements stripe={stripePromise!}>
          <PaymentModal
            isOpen={true}
            onClose={onClose}
            selectedPost={selectedPost}
            cardData={cardData}
          />
        </Elements>
      )}
    </>
  );
};

export default PaymentModalWrapper;
