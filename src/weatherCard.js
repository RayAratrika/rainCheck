import React from 'react';
import './weatherCard.css';

const WeatherDeatils = (props) => {
    const data = props.data;
    //<p>At time: {new Date().toLocaleTimeString().replace(/:\d+ /, ' ')}</p>
    const tomorrow = props.tomorrow === false ?
                    <p>At: {new Date(props.time).toLocaleTimeString().replace(/:\d+ /, ' ')}</p> :
                    <p>Tomorrow at: {new Date(props.time).toLocaleTimeString().replace(/:\d+ /, ' ')}</p>;
    return (
        <div>
            {tomorrow}
            <p>Temperature: {data.main.temp} °C</p>
            <p>Min: {data.main.temp_min} °C</p>
            <p>Max: {data.main.temp_max} °C</p>
            <p>Rain: {data.weather[0].description}</p>
        </div>
    );
}

const WeatherCard = (props) => {
    var arrayList = props.response.list.slice(1, 5);
    console.log(arrayList);
    return arrayList.map((list) => {
        var tmrw = (new Date().getDate() === new Date(list.dt_txt).getDate()) ? false:true;
        return (
            <div className='card'>
                <WeatherDeatils key={list.dt} data={list} time={list.dt_txt} tomorrow={tmrw} />
            </div>
        );
    });

}
export default WeatherCard;