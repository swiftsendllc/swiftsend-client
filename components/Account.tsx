'use client';

import usePaymentAPI from '@/hooks/api/usePaymentAPI';
import { CreatorContext } from '@/hooks/context/creator-context';
import { UserContext } from '@/hooks/context/user-context';
import { SubscriptionPlansEntity } from '@/hooks/entities/payments.entity';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import GridOnSharpIcon from '@mui/icons-material/GridOnSharp';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import MovieSharpIcon from '@mui/icons-material/MovieSharp';
import PersonPinRoundedIcon from '@mui/icons-material/PersonPinRounded';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import ShoppingBasketSharpIcon from '@mui/icons-material/ShoppingBasketSharp';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Avatar, Box, Button, Stack, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Fragment, useContext, useState } from 'react';
import { AccountAnalytics } from './AccountAnalytics';
import { AccountHeader } from './AccountHeader';
import PaymentModalWrapper from './PaymentModal';
import { StyledBadge } from './SearchComponents';
import { SubscriptionPlans } from './SubscriptionPlans';

export default function AccountPage() {
  const [user] = useContext(UserContext);
  const [creator] = useContext(CreatorContext);
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const [subscribeModal, setSubscribeModal] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlansEntity | null>(null);
  const { createPayment } = usePaymentAPI();
  const isViewer = user.userId !== creator.userId;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const grid = [
    { title: 'Profile', path: `/${creator.username}`, icon: <GridOnSharpIcon /> },
    { title: 'Subscribers', path: `/${creator.username}/subscribers`, icon: <ShoppingBasketSharpIcon /> },
    { title: 'Reels', path: `/${creator.username}/reels`, icon: <MovieSharpIcon /> },
    { title: 'Tags', path: `/${creator.username}/tags`, icon: <PersonPinRoundedIcon /> },
    { title: 'Stats', path: `/${creator.username}/stats`, icon: <TrendingUpIcon /> },
    { title: 'Collabs', path: `/${creator.username}/collabs`, icon: <Groups2OutlinedIcon /> },
    { title: 'archive', path: `/${creator.username}/archive`, icon: <ImageOutlinedIcon /> },
    { title: 'Gallery', path: `/${creator.username}/gallery`, icon: <PhotoAlbumOutlinedIcon /> }
  ];

  const pathName = pathname === `/${creator.username}/${id}` ? `${creator.username}` : pathname;

  const makePayment = async (paymentMethodId: string) => {
    const paymentResponse = await createPayment(creator.userId, 'subscription', {
      amount: subscriptionPlan!.price,
      payment_method: paymentMethodId,
      payment_method_types: ['card'],
      contentId: subscriptionPlan!._id
    });
    return {
      requiresAction: paymentResponse.requiresAction,
      clientSecret: paymentResponse.clientSecret
    };
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      {subscriptionPlan && (
        <PaymentModalWrapper
          isOpen={subscribeModal}
          metadata={{ userId: user.userId, creatorId: creator.userId, contentId: subscriptionPlan._id }}
          onClose={() => setSubscribeModal(false)}
          makePayment={makePayment}
          onSuccess={() => router.refresh()}
        />
      )}
      <Box
        sx={{
          width: '100%',
          minHeight: '200px',
          position: 'relative',
          borderBottom: '1px solid',
          background: ` url(${creator.avatarURL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#fff'
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight={600}>
            {creator.username} {!isViewer && <ExpandMoreOutlinedIcon />}
          </Typography>
        </Stack>

        <Stack direction={isMobile ? 'column' : 'row'} alignItems="center" spacing={3}>
          <StyledBadge isOnline={creator.isOnline} variant="dot">
            <Avatar src={creator.avatarURL} sx={{ width: 100, height: 100 }} />
          </StyledBadge>
          <Box>
            <Typography variant="h6">{creator.fullName}</Typography>
            {creator.websiteURL && (
              <Link href={creator.websiteURL} target="_blank" style={{ color: 'lightgreen' }}>
                {creator.websiteURL}
              </Link>
            )}
            <Typography variant="body2" mt={1}>
              {creator.bio}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ overflowY: 'scroll' }}>
        <AccountHeader />
        {creator.hasSubscribed ? (
          <Stack direction="row" justifyContent="center" flexWrap="wrap" spacing={2} my={4}>
            {grid.map((item, idx) => (
              <Fragment key={idx}>
                <Tooltip title={item.title}>
                  <Button
                    href={item.path}
                    LinkComponent={Link}
                    variant={pathName === item.path ? 'contained' : 'outlined'}
                    color={pathName === item.path ? 'primary' : 'info'}
                    sx={{ width: 64, height: 64, borderRadius: 2 }}
                  >
                    {item.icon}
                  </Button>
                </Tooltip>
              </Fragment>
            ))}
          </Stack>
        ) : (
          <SubscriptionPlans
            creator={creator}
            onSubscribe={() => setSubscribeModal(true)}
            setSubscriptionPlan={setSubscriptionPlan}
          />
        )}

        <AccountAnalytics />
      </Box>
    </Box>
  );
}
