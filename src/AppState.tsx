import { observable, action, decorate } from "mobx";
import { Weather } from "./types/weather.interface";
import { getCurrentWeather, get5DaysDailyForecast, searchLocation } from "./shared/weather-api";
import { DailyForecast } from "./types/daily-forecast.interface";
import { LocationResult } from "./types/location-result.interface";

export class AppState {

    loading: boolean = false;
    homeErrorMassage: string = "";
    favoriteErrorMassage: string = "";
    temperatureType: 'Metric' | 'Imperial' = 'Metric';
    cityName: string = 'Tel Aviv';
    cityCode: string = '215854';
    currentWeather: Weather;
    dailyForecasts: DailyForecast[] = [];
    searchAutoComplete: LocationResult[] = [];
    searchQuery: string = '';
    favoriteCities: LocationResult[] = localStorage.getItem("favoriteCities")?.split(';').map(city => JSON.parse(city)) || [];
    WeatherForFavoriteCities: Weather[] = [];
    color: string = "success"

    async init() {
        await this.getWeather()
        await this.getWeatherForFavoriteCities()
    }

    getWeather = async (cityCode?:string) => {
        try {
            this.loading = true;;
            this.currentWeather = await getCurrentWeather(cityCode || this.cityCode);
            this.dailyForecasts = await get5DaysDailyForecast(cityCode || this.cityCode, (this.temperatureType === 'Metric'));
        } catch (error) {
            this.homeErrorMassage = `Sorry, we have a server connection problem, we didn't get the weather information for "${this.cityName}".`;
        } finally {
            this.loading = false;
        }
    }

    get5DaysWeather = async (cityCode?:string) => {
        try {
            this.loading = true;
            this.dailyForecasts = await get5DaysDailyForecast(cityCode || this.cityCode, (this.temperatureType === 'Metric'));
        } catch (error) {
            this.homeErrorMassage = `Sorry, we have a server connection problem, we didn't get the weather information for "${this.cityName}".`;
        } finally {
            this.loading = false;
        }
    }

    search = async (query: string)  => {
        if (query){
            try {
                this.searchAutoComplete = await searchLocation(query);
            } catch (error) {
                this.homeErrorMassage = `Sorry, we have a server connection problem, we did not get cities to complete the possible names for "${query}".`;
            }        
        }
       
    }

    selectCity = (cityName: string, cityCode: string) => {
        this.cityName = cityName;
        this.cityCode = cityCode;
        this.getWeather();
    }


    getWeatherForFavoriteCities = async () => {
        let WeatherCity;
        Promise.all(this.favoriteCities?.map(async city => {
            WeatherCity = await getCurrentWeather(city.cityCode);
            WeatherCity.cityName = city.cityName;
            WeatherCity.cityCode = city.cityCode;
            return WeatherCity;
        }))
        .then(WeatherForFavoriteCities =>
            this.WeatherForFavoriteCities = WeatherForFavoriteCities
        ).catch(error=> {
            this.favoriteErrorMassage = "Sorry, we have a server connection problem, we didn't get the weather information for your favorite cities."
        })
    }

    setNewCityToFavorite = async () => {
        const newCity = {cityName: this.cityName, cityCode: this.cityCode};
        let cityAlreadyExists = this.favoriteCities.find(city => city.cityName === newCity.cityName);
        if(!cityAlreadyExists) {
            this.favoriteCities.push(newCity);
            this.getWeatherForFavoriteCities();
            const localStorageFavoriteCities =this.favoriteCities.map(city => JSON.stringify(city)).join(';');
            localStorage.setItem("favoriteCities", localStorageFavoriteCities);
        }
    }

    deleteCityFromFavorite = async () => {
        const cityToDelete = {cityName: this.cityName, cityCode: this.cityCode};
        let cityAlreadyExists = this.favoriteCities.find(city => city.cityName === cityToDelete.cityName);
        if(cityAlreadyExists) {
            this.favoriteCities = this.favoriteCities.filter(city => city.cityName !== cityToDelete.cityName);
            this.getWeatherForFavoriteCities();
            const localStorageFavoriteCities = this.favoriteCities.map(city => JSON.stringify(city)).join(';');
            localStorage.setItem("favoriteCities", localStorageFavoriteCities);
        }
    }
}


decorate(AppState, {
    cityName: observable,
    cityCode: observable,
    currentWeather: observable,
    dailyForecasts: observable,
    searchAutoComplete: observable,
    searchQuery: observable,
    favoriteCities: observable,
    temperatureType: observable,
    WeatherForFavoriteCities: observable,
    color: observable,
    homeErrorMassage: observable,
    favoriteErrorMassage: observable,
    getWeather: action,
    search: action,
    getWeatherForFavoriteCities: action,
    get5DaysWeather: action,
});