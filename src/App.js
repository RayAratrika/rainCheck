import React from 'react';
import WeatherCard from './weatherCard';
import './App.css';

function convertToMinutes(time) {
    return Number(time.split(':')[0]) * 60;
}

const WeatherInfo = (props) => {
    const data0 = props.response.list[0];
    const data1 = props.response.list[1];
    const data2 = props.response.list[2];
    const hours = (new Date().getHours() * 60) + (new Date().getMinutes());

    if (hours > convertToMinutes(data0.dt_txt.split(" ")[1])) {

        if (hours <= convertToMinutes(data1.dt_txt.split(" ")[1])) {
            return (
                <div>
                    <p>{new Date().toLocaleTimeString().replace(/:\d+ /, ' ')}, {new Date().toLocaleDateString('es-CL')}</p>
                    <p>Temperature: {Math.floor((data0.main.temp + data1.main.temp) / 2)} °C</p>
                    <p>Min: {Math.floor((data0.main.temp_min + data1.main.temp_min) / 2)} °C</p>
                    <p>Max: {Math.floor((data0.main.temp_max + data1.main.temp_max) / 2)} °C</p>
                    <p>Rain: {data0.weather[0].description}</p>
                </div>
            );
        }

        if (hours >= convertToMinutes(data1.dt_txt.split(" ")[1]) + 105) {
            return (
                <div>
                    <p>{new Date().toLocaleTimeString().replace(/:\d+ /, ' ')}, {new Date().toLocaleDateString('es-CL')}</p>
                    <p>Temperature: {Math.floor((data1.main.temp + data2.main.temp) / 2)} °C</p>
                    <p>Min: {Math.floor((data1.main.temp_min + data2.main.temp_min) / 2)} °C</p>
                    <p>Max: {Math.floor((data1.main.temp_max + data2.main.temp_max) / 2)} °C</p>
                    <p>Rain: {data2.weather[0].description}</p>
                </div>
            );
        }

        if (hours >= convertToMinutes(data1.dt_txt.split(" ")[1])) {
            return (
                <div>
                    <p>{new Date().toLocaleTimeString().replace(/:\d+ /, ' ')}, {new Date().toLocaleDateString('es-CL')}</p>
                    <p>Temperature: {(data1.main.temp)} °C</p>
                    <p>Min: {(data1.main.temp_min)} °C</p>
                    <p>Max: {(data1.main.temp_max)} °C</p>
                    <p>Rain: {data1.weather[0].description}</p>
                </div>
            );
        }

    }
    else if(hours < convertToMinutes(data0.dt_txt.split(" ")[1]) && (convertToMinutes(data0.dt_txt.split(" ")[1]) === 1260)) {
        return (
            <div>
                <p>{new Date().toLocaleTimeString().replace(/:\d+ /, ' ')}, {new Date().toLocaleDateString('es-CL')}</p>
                <p>Temperature: {(data1.main.temp)} °C</p>
                <p>Min: {(data1.main.temp_min)} °C</p>
                <p>Max: {(data1.main.temp_max)} °C</p>
                <p>Rain: {data1.weather[0].description}</p>
            </div>
        );
    }
    else return null;
}


class App extends React.Component {

    state = {
        res: []
    }

    async componentDidMount() {
        const api = 'b1ed46552dc89999f5a3e717d5316c4f';
        const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?id=1277333&units=metric&appid=' + api);
        const data = await res.json();
        this.setState({ res: data });
        console.log(data);
    }

    render() {
        if (this.state.res.length === 0) return null;
        const hours = new Date('2020-06-08 09:00:00').getHours();
        const name = (hours < new Date(this.state.res.city.sunrise * 1000).getHours()) ||
            (hours > new Date(this.state.res.city.sunset * 1000).getHours()) ? 'night' : 'day';
        console.log(hours > new Date(this.state.res.city.sunset * 1000).getHours());
            return (
            <div className={name}>
                <div className='topCard'>
                    <WeatherInfo response={this.state.res} />
                </div>
                <div className='weathers'>
                    <WeatherCard response={this.state.res} />
                </div>
            </div>
        );
    }
}

export default App;