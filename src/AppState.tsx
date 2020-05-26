import { observable, action, decorate } from "mobx";
import { Weather } from "./types/weather.interface";
import { getCurrentWeather, get5DaysDailyForecast, searchLocation } from "./shared/weather-api";
import { DailyForecast } from "./types/daily-forecast.interface";
import { LocationResult } from "./types/location-result.interface";
import { FavoriteCity } from "./types/favorite-sity.interface";
import { json } from "express";

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
    favoriteCities: FavoriteCity[] = localStorage.getItem("favoriteCities")?.split(';').map(city => JSON.parse(city)) || [];
    WeatherForFavoriteCities: Weather[] = [];
    color: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" = "success"

    selectCity = (cityName: string, cityCode: string) => {
        this.cityName = cityName;
        this.cityCode = cityCode;
        this.getWeather()
    }

    async init() {
        await this.getWeather()
        await this.getWeatherForFavoriteCities()
    }

    getWeather = async (cityCode?:string) => {
        console.log(this.cityCode)
        try {
            this.loading = true
            this.currentWeather = await getCurrentWeather(cityCode || this.cityCode);
            this.dailyForecasts = await get5DaysDailyForecast(cityCode || this.cityCode, (this.temperatureType === 'Metric'));
        } catch (error) {
            console.log('Error on getWeather', error);
            this.error = true
        } finally {
            this.loading = false
            console.log(this.currentWeather)

        }
    }

    search = async (query: string)  => {
        if (query){
            this.searchAutocomplete = await searchLocation(query)
            console.log(this.searchAutocomplete);
        }
       
    }


    getWeatherForFavoriteCities = async () => {
        let WeatherCity;
        Promise.all(this.favoriteCities?.map(async city => {
            WeatherCity = await getCurrentWeather(city.cityCode)
            WeatherCity.cityName = city.cityName
            WeatherCity.cityCode = city.cityCode
            return WeatherCity
        }))
        .then(WeatherForFavoriteCities =>
            this.WeatherForFavoriteCities = WeatherForFavoriteCities
        )
    }

    setNewCityToFavorite = async () => {
        const newCity = {cityName: this.cityName, cityCode: this.cityCode}
        let cityAlreadyExists = this.favoriteCities.find(city => city.cityName == newCity.cityName)
        if(!cityAlreadyExists) {
            this.favoriteCities.push(newCity)
            this.getWeatherForFavoriteCities()
            let favoriteCities =this.favoriteCities.map(city => JSON.stringify(city)).join(';')
            console.log(favoriteCities)
            localStorage.setItem("favoriteCities", favoriteCities)
        }
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
    color: observable,
    getWeather: action,
    search: action,
    getWeatherForFavoriteCities: action,
});