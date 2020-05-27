
import axios from 'axios';
import moment from 'moment';
import { Weather } from '../types/weather.interface';
import { LocationResult } from '../types/location-result.interface';
import { DailyForecast } from '../types/daily-forecast.interface';

const baseUrl = 'http://localhost:4000';
// const baseUrl = 'http://dataservice.accuweather.com';
const apiKey = 'ozLN4sJCgpYaN6X9pHMgoEKFu0h3v2U3';

export async function getCurrentWeather(locationKey: string): Promise<Weather> {
    const res = await axios.get(`${baseUrl}/currentconditions/v1/${locationKey}?apikey=${apiKey}`);
    return res.data[0];
}

export async function get5DaysDailyForecast(locationKey: string, metric: boolean = false): Promise<DailyForecast[]> {
    const res = await axios.get(`${baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=${metric}`);

    return res.data.DailyForecasts.map(dayly => {
        const dailyForecast: DailyForecast = {
            date: dayly.Date,
            maxTemperature: dayly.Temperature.Maximum.Value,
            minTemperature: dayly.Temperature.Minimum.Value,
            unit: dayly.Temperature.Minimum.Unit,
            dayText: dayly.Day.IconPhrase,
            nightText: dayly.Night.IconPhrase,
            day: moment(dayly.Date).format('dddd')
        }
        return dailyForecast
    });
}

export async function searchLocation(query: string): Promise<LocationResult[]> {
    const res = await axios.get(`${baseUrl}/locations/v1/cities/autocomplete?q=${query}&apikey=${apiKey}`);
    const LocationResult = res.data.map(item => {return {cityCode: item.Key, cityName: item.LocalizedName}})
    console.log(LocationResult)
    return LocationResult;
}
