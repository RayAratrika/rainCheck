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
                    <p>In: {props.response.city.name}</p>
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
                    <p>In: {props.response.city.name}</p>
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
                    <p>In: {props.response.city.name}</p>
                    <p>{new Date().toLocaleTimeString().replace(/:\d+ /, ' ')}, {new Date().toLocaleDateString('es-CL')}</p>
                    <p>Temperature: {(data1.main.temp)} °C</p>
                    <p>Min: {(data1.main.temp_min)} °C</p>
                    <p>Max: {(data1.main.temp_max)} °C</p>
                    <p>Rain: {data1.weather[0].description}</p>
                </div>
            );
        }

    }
    else if (hours < convertToMinutes(data0.dt_txt.split(" ")[1]) && (convertToMinutes(data0.dt_txt.split(" ")[1]) === 1260)) {
        return (
            <div>
                <p>In: {props.response.city.name}</p>
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

var UserCoords = { lat: '', lon: '', data: '' };

async function makeRequest() {
    const api = 'b1ed46552dc89999f5a3e717d5316c4f';
    const temp_res = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + 12.917857 + '&lon=' + 77.673211 + '&units=metric&appid=' + api);
    const temp_data = await temp_res.json();
    const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?id=' + temp_data.id + '&units=metric&appid=' + api);
    const data = await res.json();
    return data;
}

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            res: [],
        }
        this.showPosition = this.showPosition.bind(this);

    }
    
    async showPosition(position) {
        UserCoords.lat = position.coords.latitude;
        UserCoords.lon = position.coords.longitude;
        this.setState({res: await makeRequest()}, () => console.log(this.state.res));
    } 

    async componentDidMount() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);

        } else {
            alert("Geolocation is not supported by this browser.");
        }
  
    }

    render() {
        if (this.state.res.length === 0) return null;
        const hours = new Date().getHours();
        const name = (hours < new Date(this.state.res.city.sunrise * 1000).getHours()) ||
            (hours > new Date(this.state.res.city.sunset * 1000).getHours()) ? 'night' : 'day';
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