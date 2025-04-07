'use client';

import { AccountPostPage } from '@/app/[username]/components/Account';
import UnFollowModal from '@/app/[username]/components/UnFollowModal';
import UploadModal from '@/app/[username]/components/UploadModal';
import useAPI from '@/hooks/api/useAPI';
import useMessageAPI from '@/hooks/api/useMessageAPI';
import usePaymentAPI from '@/hooks/api/usePaymentAPI';
import { CreatorContext } from '@/hooks/context/creator-context';
import { UserContext } from '@/hooks/context/user-context';
import { SubscriptionPlansEntity } from '@/hooks/entities/payments.entity';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import GridOnSharpIcon from '@mui/icons-material/GridOnSharp';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import MovieSharpIcon from '@mui/icons-material/MovieSharp';
import NavigationIcon from '@mui/icons-material/Navigation';
import PersonPinRoundedIcon from '@mui/icons-material/PersonPinRounded';
import ShoppingBasketSharpIcon from '@mui/icons-material/ShoppingBasketSharp';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Avatar, Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { MusicModal } from './MusicModal';
import PaymentModalWrapper from './PaymentModal';
import { StyledBadge } from './SearchComponents';
import { SubscriptionPlans } from './SubscriptionPlans';

interface FollowButtonProps {
  isFollowedByMe: boolean;
  setUnFollowModal: (following: boolean) => unknown;
  handleFollow: () => unknown;
}

const FollowButton = (props: FollowButtonProps) => {
  const [isFollowedByMe, setIsFollowedByMe] = useState<boolean>(props.isFollowedByMe);
  useEffect(() => setIsFollowedByMe(props.isFollowedByMe), [props.isFollowedByMe]);

  return (
    <Button
      variant="contained"
      aria-label="add"
      sx={{
        width: '100%',
        borderRadius: '30px'
      }}
      color="inherit"
      onClick={() => {
        if (isFollowedByMe) {
          props.setUnFollowModal(true);
        } else {
          props.handleFollow();
        }
      }}
    >
      <Typography color="primary">{isFollowedByMe ? 'Connected' : 'Connect'}</Typography>
    </Button>
  );
};

export default function AccountPage() {
  const [user] = useContext(UserContext);
  const [creator, setCreator] = useContext(CreatorContext);
  const { followProfile } = useAPI();
  const { createChannel } = useMessageAPI();
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const [createModal, setCreateModal] = useState(false);
  const [unFollowModal, setUnFollowModal] = useState(false);
  const [musicModal, setMusicModal] = useState(false);
  const isViewer = user.userId !== creator.userId;
  const { createPayment } = usePaymentAPI();
  const [subscribeModal, setSubscribeModal] = useState<boolean>(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlansEntity | null>(null);

  const stats = [
    {
      title: 'entries',
      count: creator.postCount
    },
    {
      title: 'connections',
      count: creator.followerCount,
      path: `/${creator.username}/connections`
    },
    {
      title: 'connected',
      count: creator.followingCount,
      path: `/${creator.username}/connected`
    }
  ];

  const grid = [
    {
      path: `/${creator.username}`,
      icon: <GridOnSharpIcon />
    },
    {
      path: `/${creator.username}/subscribers`,
      icon: <ShoppingBasketSharpIcon />
    },
    {
      path: `/${creator.username}/reels`,
      icon: <MovieSharpIcon />
    },
    {
      path: `/${creator.username}/tags`,
      icon: <PersonPinRoundedIcon />
    }
  ];

  const pathName = pathname === `/${creator.username}/${id}` ? `${creator.username}` : pathname;

  const handleFollow = async (userId: string) => {
    try {
      await followProfile(userId);
      setCreator((previous) => ({ ...previous, isFollowedByMe: true, followerCount: previous.followerCount + 1 }));
    } catch (error) {
      console.log(error);
    }
  };

  const loadChannel = async (userId: string) => {
    try {
      const { _id } = await createChannel(userId);
      router.push(`/channels/${_id}`);
    } catch (error) {
      console.log(error);
    }
  };

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
    <>
      {subscriptionPlan && (
        <PaymentModalWrapper
          isOpen={subscribeModal}
          metadata={{ userId: user.userId, creatorId: creator.userId, contentId: subscriptionPlan._id }}
          onClose={() => setSubscribeModal(false)}
          makePayment={makePayment}
          onSuccess={() => router.refresh()}
        />
      )}
      <Box sx={{ pl: { xs: 0, md: 32 } }} paddingRight={0}>
        <Stack mb={1} direction="row" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={0} width="50%" marginRight={0}>
            {isViewer && (
              <Button onClick={() => router.back()}>
                <ArrowBackIcon />
              </Button>
            )}
            <Typography
              variant="h5"
              fontWeight={50}
              color="inherit"
              textAlign="left"
              sx={{
                display: 'inline-block',
                overflow: 'hidden'
              }}
            >
              {creator.username}
              {!isViewer && (
                <Button>
                  <ExpandMoreOutlinedIcon />
                </Button>
              )}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" href="/" aria-label="share">
              <NavigationIcon sx={{ width: 30, height: 30 }} />
            </Button>
            <Button color="secondary" aria-label="add" onClick={() => setCreateModal(true)} variant="contained">
              <AddIcon sx={{ width: 30, height: 30 }} />
            </Button>
            {isViewer ? (
              <Button variant="contained">
                <MoreVertOutlinedIcon />
              </Button>
            ) : (
              <Button variant="contained" color="inherit" onClick={() => router.push(`/${user.username}/settings`)}>
                <ViewListIcon sx={{ width: 30, height: 30 }} />
              </Button>
            )}
          </Stack>
        </Stack>
        <Box display="flex" alignItems="center">
          <Stack direction="column" spacing={2} width="100%" mb={10}>
            <Stack direction="row" spacing={1} justifyContent="space-between" alignContent="center" alignItems="center">
              <>
                <StyledBadge
                  isOnline={creator.isOnline}
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent
                  variant="dot"
                >
                  <Avatar
                    aria-label="recipe"
                    src={creator.avatarURL}
                    alt={creator.fullName}
                    sx={{ width: 80, height: 80 }}
                  />
                </StyledBadge>
              </>

              <Stack direction="column" spacing={1}>
                <Stack direction="row" spacing={4} justifyContent="flex-end" flexGrow={1}>
                  {stats.map((item, idx) => (
                    <Stack key={idx} direction="column" alignContent="center" alignItems="center">
                      {item.path ? (
                        <Link href={item.path}>
                          <Typography variant="h6" fontWeight={100}>
                            {item.count}
                          </Typography>
                        </Link>
                      ) : (
                        <Typography variant="h6" fontWeight={100}>
                          {item.count}
                        </Typography>
                      )}

                      <Typography variant="body2" fontWeight={100}>
                        {item.title}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
                <Card
                  sx={{
                    backgroundImage: "url('/photos/f49y3HRM_400x400.png')",
                    backgroundSize: 'contain',
                    backgroundPosition: 'right',
                    backgroundRepeat: 'no-repeat',
                    height: 50,
                    width: '100%'
                  }}
                >
                  <CardContent sx={{ p: 0, width: '100%' }}>
                    <Button onClick={() => setMusicModal(true)} variant="contained">
                      <Typography variant="subtitle2" fontWeight={100} color="text.secondary" textAlign="center">
                        Live From Space
                      </Typography>
                    </Button>
                  </CardContent>
                </Card>
              </Stack>
            </Stack>
            <Stack direction="column">
              <Typography variant="h6" fontWeight={200}>
                {creator.fullName}
              </Typography>
              <Link
                href={creator.websiteURL ?? '/'}
                target="_blank"
                style={{
                  color: 'var(--success)',
                  display: 'inline-block',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {creator.websiteURL}
              </Link>

              <Typography variant="body2" fontWeight={300}>
                {creator.bio}
              </Typography>
            </Stack>
            {isViewer ? (
              creator.hasSubscribed && (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  alignContent="center"
                  width="100%"
                  spacing={2}
                >
                  <FollowButton
                    handleFollow={() => handleFollow(creator.userId)}
                    isFollowedByMe={creator.isFollowedByMe}
                    setUnFollowModal={setUnFollowModal}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: '100%', borderRadius: '30px' }}
                    color="secondary"
                    onClick={() => loadChannel(creator.userId)}
                  >
                    <MessageOutlinedIcon sx={{ width: 20, height: 30 }} />
                    Message
                  </Button>
                </Stack>
              )
            ) : (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                alignContent="center"
                width="100%"
                spacing={2}
              >
                <Button
                  variant="contained"
                  aria-label="edit"
                  href={`/${user.username}/profile`}
                  LinkComponent={Link}
                  sx={{ width: '100%', borderRadius: '30px' }}
                >
                  <EditIcon sx={{ width: 30, height: 30 }} />
                  Profile{' '}
                </Button>
                <Button sx={{ width: '100%', borderRadius: '30px' }} variant="contained">
                  <DashboardIcon sx={{ width: 20, height: 30 }} />
                  Dashboard
                </Button>
              </Stack>
            )}
            <Divider />
            {creator.hasSubscribed ? (
              <>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignContent="center"
                  alignItems="center"
                >
                  {grid.map((item, idx) => (
                    <Box key={idx}>
                      <Button
                        href={item.path}
                        LinkComponent={Link}
                        variant="outlined"
                        sx={{ width: 25 }}
                        color={pathName === item.path ? 'inherit' : 'info'}
                      >
                        {item.icon}
                      </Button>
                    </Box>
                  ))}
                </Stack>
                <Divider sx={{ display: { xs: 'block', md: 'none' } }} />
                <AccountPostPage />
              </>
            ) : (
              <SubscriptionPlans
                creator={creator}
                onSubscribe={() => setSubscribeModal(true)}
                setSubscriptionPlan={setSubscriptionPlan}
              />
            )}
          </Stack>
        </Box>
      </Box>

      <MusicModal isOpen={musicModal} onClose={() => setMusicModal(false)} />
      <UnFollowModal isOpen={unFollowModal} onClose={() => setUnFollowModal(false)} />
      <UploadModal isOpen={createModal} onClose={() => setCreateModal(false)} />
    </>
  );
}
