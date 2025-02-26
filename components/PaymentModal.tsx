'use client';

import usePaymentAPI from '@/hooks/api/usePaymentAPI';
import { PostsEntity } from '@/hooks/entities/posts.entities';
import { LoadingButton } from '@mui/lab';
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';

import { ENV } from '@/library/constants';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function PaymentModal({
  onClose,
  post
}: {
  isOpen: boolean;
  onClose: () => unknown;
  post: PostsEntity;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { createPayment } = usePaymentAPI();
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

  const handlePayment = async () => {
    setLoading(true);
    try {
      if (!stripe || !elements) {
        console.log('stripe is loading');
      }
      const { clientSecret } = await createPayment(post.user.userId, {
        amount: post.price,
        contentId: post._id,
        payment_method_type: [paymentMethod]
      });
      const card = elements?.getElement(CardElement);
      if (stripe && elements && card) {
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: 'Chris Evans'
            }
          }
        });
      }
      console.log();
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
                value="Apple pay"
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
                  mt: 2,
                }}
              >
                <Typography variant="subtitle2" gutterBottom color="primary">
                  Card Number
                </Typography>
                <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      color="primary"
                    >
                      Expiration Date
                    </Typography>
                    <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      color="primary"
                    >
                      Security Code
                    </Typography>
                    <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                  </Box>
                </Box>
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
          >
            PAY
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
const stripePromise = loadStripe(ENV('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'));

const PaymentModalWrapped = ({
  isOpen,
  onClose,
  post
}: {
  isOpen: boolean;
  onClose: () => unknown;
  post: PostsEntity;
}) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);

  return (
    <>
      {open && (
        <Elements stripe={stripePromise!}>
          <PaymentModal isOpen={true} onClose={onClose} post={post} />
        </Elements>
      )}
    </>
  );
};

export default PaymentModalWrapped;
