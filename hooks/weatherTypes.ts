export interface WeatherEntity {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
  };
  minutely: [
    {
      dt: number;
      precipitation: number;
    }
  ];
  hourly: [
    {
      dt: number;
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
      dew_point: number;
      uvi: number;
      clouds: number;
      visibility: number;
      wind_speed: number;
      wind_deg: number;
      wind_gust: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
      pop: number;
    }
  ];
  daily: [
    {
      dt: number;
      sunrise: number;
      sunset: number;
      moonrise: number;
      moonset: number;
      moon_phase: number;
      summary: string;
      temp: {
        day: number;
        min: number;
        max: number;
        night: number;
        eve: number;
        morn: number;
      };
      feels_like: {
        day: number;
        night: number;
        eve: number;
        morn: number;
      };
      pressure: number;
      humidity: number;
      dew_point: number;
      wind_speed: number;
      wind_deg: number;
      wind_gust: number;
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
      clouds: number;
      pop: number;
      rain: number;
      uvi: number;
    }
  ];
  alerts: [
    {
      sender_name: string;
      event: string;
      start: number;
      end: number;
      description: string;
    }
  ];
}
//alternative method
export interface WeatherInput {
  lat: number;
  lon: number;
}
export interface WeatherExplorerEntity {
  location: {
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    tz_id: string,
    localtime_epoch: number,
    localtime: string
  },
  current: {
    last_updated_epoch: number,
    last_updated: string,
    temp_c: number,
    temp_f: number,
    is_day: number,
    condition: {
      text: string,
      icon: string,
      code: number
    },
    wind_mph: number,
    wind_kph: number,
    wind_degree: number,
    wind_dir: string,
    pressure_mb: number,
    pressure_in: number,
    precip_mm: number,
    precip_in: number,
    humidity: number,
    cloud: number,
    feelslike_c: number,
    feelslike_f: number,
    windchill_c: number,
    windchill_f: number,
    heatindex_c: number,
    heatindex_f: number,
    dewpoint_c: number,
    dewpoint_f: number,
    vis_km: number,
    vis_miles: number,
    uv: number,
    gust_mph: number,
    gust_kph: number,
    air_quality: {
      co: number,
      no2: number,
      o3: number,
      so2: number,
      pm2_5: number,
      pm10: number,
    }
  }
}

