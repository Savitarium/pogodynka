import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import {useCallback, useState} from "react";
import ErrorBox from "../ErrorBox/ErrorBox";

const WeatherBox = props => {
    const [weatherData, setWeatherData] = useState('');
    const [connecting, setConnecting] = useState(false);
    const [error, setError] = useState(false);
    const handleCityChange = useCallback(cityName => {
        setConnecting(true);
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b36ea99a96b6b7040b6500fd5e896f96&units=metric`)
            .then(res => {
                if(res.status === 200) {
                    return res.json()
                        .then(data => {
                            console.log(data);
                            const weatherData = {
                                city: data.name,
                                temp: data.main.temp,
                                icon: data.weather[0].icon,
                                description: data.weather[0].main
                            };
                            setWeatherData(weatherData);
                            setConnecting(false);
                            console.log(weatherData);
                            setError(false);
                        })
                } else {
                    setError(true);
                }
            })
    }, []);
    return (
        <section>
            <PickCity action={handleCityChange}/>
            { (weatherData && !error) && <WeatherSummary weatherData={weatherData}/> }
            { (!weatherData && connecting && !error) && <Loader /> }
            { error && <ErrorBox /> }
        </section>
    )
}
export default WeatherBox;
