"use client";

import useWeatherAPI from "@/hooks/api/useWeatherAPI";
import { WeatherExplorerEntity } from "@/hooks/weatherTypes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Fab,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";

export function WeatherPage() {
  const router = useRouter();
  const { getWeatherExplorer } = useWeatherAPI();
  const [weatherData, setWeatherData] = useState<WeatherExplorerEntity | null>(
    null
  );
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);

  const handleLocationRequest = () => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to retrieve location!");
    }
  };

  useEffect(() => {
    const handleWeather = async () => {
      try {
        if (latitude && longitude) {
          const data = await getWeatherExplorer(latitude, longitude);
          setWeatherData(data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load weather...");
      }
    };
    handleWeather();
  }, [latitude, longitude]); //eslint-disable-line

  // useEffect(() => {
  //   const handleWeather = async () => {
  //     try {
  //       if (latitude && longitude) {
  //         const data = await getWeather(latitude, longitude);
  //         setWeatherData(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Failed to load weather...");
  //     }
  //   };
  //   handleWeather();
  // }, [latitude, longitude]); //eslint-disable-line

  return (
    <>
      <Stack direction="row" mt={2} justifyContent="space-between">
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography fontWeight={200} color="primary">
          WEATHER
        </Typography>
        <IconButton onClick={handleLocationRequest}>
          <SearchIcon />
        </IconButton>
      </Stack>
      <Divider />
      {weatherData && (
        <Fragment>
          <Stack>
            <Card style={{ color: "#2196f3" }}>
              <CardHeader
                avatar={
                  <Avatar>
                    <NightsStayIcon />
                  </Avatar>
                }
                title={<Typography>{weatherData.location?.name}</Typography>}
                subheader={moment().format("LLL")}
                action={
                  <Fab color="primary">
                    <SearchIcon />
                  </Fab>
                }
              />
            </Card>
          </Stack>
          <Stack>
            <Card>
              <CardHeader
                avatar={
                  <Avatar>
                    <NightsStayIcon />
                  </Avatar>
                }
                title={<Typography>TODAY&apos;S WEATHER</Typography>}
                action={<Typography>{weatherData.location?.region}</Typography>}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Currently
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                ></Typography>
              </CardContent>
            </Card>
          </Stack>
        </Fragment>
      )}
    </>
  );
}
