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
import { Avatar, Box, Card, CardContent, Divider, Fab, IconButton, Stack, Typography } from '@mui/material';
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
    <IconButton
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
    </IconButton>
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
      icon: <GridOnSharpIcon color="inherit" />
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
      <Stack mb={1} direction="row" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={0} width="50%" marginRight={0}>
          {isViewer && (
            <IconButton onClick={() => router.back()}>
              <ArrowBackIcon />
            </IconButton>
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
              <IconButton edge="end">
                <ExpandMoreOutlinedIcon />
              </IconButton>
            )}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <IconButton color="primary" href="/" aria-label="share">
            <NavigationIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
          <IconButton color="secondary" aria-label="add" onClick={() => setCreateModal(true)}>
            <AddIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
          {isViewer ? (
            <IconButton>
              <MoreVertOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton color="inherit" onClick={() => router.push(`/${user.username}/settings`)}>
              <ViewListIcon sx={{ width: 30, height: 30 }} />
            </IconButton>
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
                  <IconButton onClick={() => setMusicModal(true)}>
                    <Typography variant="subtitle2" fontWeight={100} color="text.secondary" textAlign="center">
                      Live From Space
                    </Typography>
                  </IconButton>
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
                <IconButton
                  sx={{ width: '100%', borderRadius: '30px' }}
                  color="secondary"
                  onClick={() => loadChannel(creator.userId)}
                >
                  <MessageOutlinedIcon sx={{ width: 20, height: 30 }} />
                  Message
                </IconButton>
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
              <IconButton
                aria-label="edit"
                href={`/${user.username}/profile`}
                LinkComponent={Link}
                sx={{ width: '100%', borderRadius: '30px' }}
              >
                <EditIcon sx={{ width: 30, height: 30 }} />
                Profile{' '}
              </IconButton>
              <IconButton sx={{ width: '100%', borderRadius: '30px' }}>
                <DashboardIcon sx={{ width: 20, height: 30 }} />
                Dashboard
              </IconButton>
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
                  <Stack key={idx}>
                    <IconButton href={item.path} LinkComponent={Link}>
                      <Fab variant="extended" color={pathName === item.path ? 'primary' : 'inherit'}>
                        {item.icon}
                      </Fab>
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
              <Divider />
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

      <MusicModal isOpen={musicModal} onClose={() => setMusicModal(false)} />
      <UnFollowModal isOpen={unFollowModal} onClose={() => setUnFollowModal(false)} />
      <UploadModal isOpen={createModal} onClose={() => setCreateModal(false)} />
    </>
  );
}
