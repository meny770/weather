import { observable, computed, action, decorate } from "mobx";
import { Weather } from "./types/weather.interface";
import { getCurrentWeather, get5DaysDailyForecast, searchLocation } from "./shared/weather-api";
import { DailyForecast } from "./types/daily-forecast.interface";
import { LocationResult } from "./types/location-result.interface";
import { FavoriteCity } from "./types/favorite-sity.interface";

export class AppState {
    loading: boolean = false;
    error: boolean = false;
    temperatureType: 'Metric' | 'Imperial' = 'Metric';
    cityName: string = 'Tel Aviv';
    cityCode: string = '215854';
    currentWeather: Weather;
    dailyForecasts: DailyForecast[] = [];
    searchAutocomplete: LocationResult[] = [];
    searchQuery: string = '';
    favoriteCities: FavoriteCity[] = [{ cityName: 'Tel Aviv', cityCode: '215854' }];
    WeatherForFavoriteCities: Weather[] = [];

    selectCity(cityName: string, cityCode: string) {
        this.cityName = cityName;
        this.cityCode = cityCode;
        this.getWeather()
    }

    async init() {
        await this.getWeather()
        await this.getWeatherForFavoriteCities()
    }

    async getWeather() {
        try {
            this.loading = true
            this.currentWeather = await getCurrentWeather(this.cityCode);
            this.dailyForecasts = await get5DaysDailyForecast(this.cityCode, (this.temperatureType === 'Imperial'));
        } catch (error) {
            console.log('Error on getWeather', error);
            this.error = true
        } finally {
            this.loading = false
        }
    }

    async search(query: string) {
        this.searchAutocomplete = await searchLocation(query)
        console.log(this.searchAutocomplete);
    }


    async getWeatherForFavoriteCities() {
        let WeatherCity;
        Promise.all(this.favoriteCities?.map(async city => {
            WeatherCity = await getCurrentWeather(city.cityCode)
            WeatherCity.cityName = city.cityName
            return WeatherCity
        }))
            .then(WeatherForFavoriteCities =>
                this.WeatherForFavoriteCities = WeatherForFavoriteCities
            )
    }
}


decorate(AppState, {
    cityName: observable,
    cityCode: observable,
    currentWeather: observable,
    dailyForecasts: observable,
    searchAutocomplete: observable,
    searchQuery: observable,
    favoriteCities: observable,
    temperatureType: observable,
    WeatherForFavoriteCities: observable,
    search: action,
    getWeatherForFavoriteCities: action,
});