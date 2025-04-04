import usePaymentAPI from '@/hooks/api/usePaymentAPI';
import { SubscriptionPlansEntity } from '@/hooks/entities/payments.entity';
import { UserProfilesEntity } from '@/hooks/entities/users.entities';
import { Box, Button, Card, CardActions, CardContent, Container, FormControl, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function SubscriptionPlans({
  onSubscribe,
  creator,
  setSubscriptionPlan
}: {
  onSubscribe: () => unknown;
  creator: UserProfilesEntity;
  setSubscriptionPlan: React.Dispatch<React.SetStateAction<SubscriptionPlansEntity | null>>;
}) {
  const { getSubscriptionPlans } = usePaymentAPI();
  const [plans, setPlans] = useState<SubscriptionPlansEntity[]>([]);
  const loadSubscriptionPlans = async () => {
    try {
      const plans = await getSubscriptionPlans(creator.userId);
      setPlans(plans);
    } catch (error) {
      console.log(error);
      toast.error('FAILED TO LOAD SUBSCRIPTION PLANS!');
    }
  };
  useEffect(() => {
    if (plans.length !== 0) loadSubscriptionPlans();
  }, []); //eslint-disable-line
  return (
    <>
      <Container maxWidth="xs" disableGutters>
        <Typography variant="h4" textAlign={'center'} alignContent={'center'}>
          {plans.length === 0 ? 'Coming soon' : 'Choose a subscription Plan'}
        </Typography>
        <Box marginBottom={10}>
          {plans.map((plan) => (
            <Stack direction={'column'} key={plan._id} justifyContent={'space-between'} mb={2}>
              <FormControl>
                <Box textAlign="center" mt={0}>
                  <Card sx={{ maxWidth: 300, mx: 'auto', p: 2, borderRadius: 2, boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6">{plan.tier}</Typography>
                      <Typography variant="h4" color="primary">
                        ${plan.price}
                      </Typography>
                      <Typography variant="body2">{plan.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                          onSubscribe();
                          setSubscriptionPlan(plan);
                        }}
                      >
                        SUBSCRIBE
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </FormControl>
            </Stack>
          ))}
        </Box>
      </Container>
    </>
  );
}
