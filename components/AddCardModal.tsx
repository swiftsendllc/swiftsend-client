'use client';

import usePaymentAPI from '@/hooks/api/usePaymentAPI';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Stack,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AddCardModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose?: () => unknown;
}) {
  const [open, setOpen] = useState<boolean>(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [card_number, setCard_number] = useState<string>('');
  const [expiry_date, setExpiry_date] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [postal_code, setPostal_code] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [line1, setLine1] = useState<string>('');

  const { createCard } = usePaymentAPI();

  const handleAdd = async () => {
    setLoading(true);
    try {
      await createCard({
        card_number,
        city,
        country,
        cvc,
        email,
        expiry_date,
        name,
        postal_code,
        state,
        line1
      });
      toast.success('CARD ADDED');
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('FAILED TO ADD!');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        keepMounted
        PaperProps={{
          style: {
            margin: 0,
            width: '100%'
          }
        }}
        aria-describedby="card-modal"
      >
        <FormControl
          variant="standard"
          fullWidth
          component={'form'}
          sx={{ p: 0, m: 0 }}
        >
          <DialogTitle sx={{ pb: 1 }}>Card details</DialogTitle>
          <Stack direction={'column'} spacing={3} ml={1}>
            <TextField
              id="card-name"
              type="text"
              placeholder="Name on your credit card"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 1.5 }}
            />
            <TextField
              id="card-number"
              type="text"
              placeholder="Enter card number"
              fullWidth
              variant="standard"
              value={card_number}
              onChange={(e) => setCard_number(e.target.value)}
              sx={{ mb: 1.5 }}
            />
            <Stack direction={'row'} spacing={1}>
              <TextField
                id="cvc"
                type="text"
                placeholder="CVC"
                fullWidth
                variant="standard"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                sx={{ mb: 1.5 }}
              />
              <TextField
                id="exp-date"
                type="text"
                placeholder="EXPIRY DATE"
                fullWidth
                variant="standard"
                value={expiry_date}
                onChange={(e) => setExpiry_date(e.target.value)}
                sx={{ mb: 1.5 }}
              />
            </Stack>
            <Stack direction={'row'} spacing={1}>
              <TextField
                id="country-name"
                type="text"
                placeholder="Country code"
                fullWidth
                variant="standard"
                value={country}
                onChange={(e) => setCountry(e.target.value.toUpperCase())}
                sx={{ mb: 1.5 }}
              />
              <TextField
                id="city-name"
                type="text"
                placeholder="City"
                fullWidth
                variant="standard"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                sx={{ mb: 1.5 }}
              />
            </Stack>
            <Stack direction={'row'} spacing={1}>
              <TextField
                id="state-name"
                type="text"
                placeholder="State"
                fullWidth
                variant="standard"
                value={state}
                onChange={(e) => setState(e.target.value)}
                sx={{ mb: 1.5 }}
              />
              <TextField
                id="postal-code"
                type="text"
                placeholder="Postal code"
                fullWidth
                variant="standard"
                value={postal_code}
                onChange={(e) => setPostal_code(e.target.value)}
                sx={{ mb: 1.5 }}
              />
            </Stack>
            <TextField
              id="email"
              type="text"
              placeholder="Email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 1.5 }}
            />
            <TextField
              id="address_line"
              type="text"
              placeholder="Address"
              fullWidth
              variant="standard"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              sx={{ mb: 1.5 }}
            />
          </Stack>
          <DialogActions>
            <Button onClick={handleClose}>CANCEL</Button>
            <LoadingButton
              variant="contained"
              onClick={handleAdd}
              loading={loading}
              disabled={
                !name &&
                !card_number &&
                !expiry_date &&
                !city &&
                !country &&
                !state &&
                !cvc &&
                !country &&
                !postal_code &&
                !email
              }
            >
              CONFIRM
            </LoadingButton>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
}
