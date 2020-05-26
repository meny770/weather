export interface DailyForecast {
    day: string,
    date: string,
    minTemperature: string,
    maxTemperature: string,
    unit: 'F' | 'C';
    dayText: string,
    nightText: string,
}
