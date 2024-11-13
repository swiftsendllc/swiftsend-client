const useWeatherAPI = () => {
  const getWeather = async (latitude: number, longitude: number) => {
    const accessToken = process.env.NEXT_PUBLIC_WEATHER_API_KEY_1;
    const res = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${accessToken}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };
  return {
    getWeather,
  };
};
export default useWeatherAPI;
