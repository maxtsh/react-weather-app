import React from "react";
import { HorizontalBar } from "react-chartjs-2";

import "./WeatherDaily.css";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function WeatherDaily({ data }) {
  const allData = {
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [
      {
        label: "Temp °C",
        data: [21, 22, 23, 24, 20, 19, 18],
        backgroundColor: "#302E63",
        borderColor: "#302E90",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="weather-daily">
      <table className="table">
        <thead className="table-head">
          <tr>
            <th>Day</th>
            <th>Humidity</th>
            <th>Status</th>
            <th>Temp</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {data.slice(1, 8).map((eachDay, index) => (
            <tr key={index}>
              <td>{weekDays[index]}</td>
              <td>
                <i className="fas fa-tint"></i>
                {` ${eachDay.humidity}%`}
              </td>
              <td>
                <img
                  src={`https://openweathermap.org/img/w/${eachDay.weather[0].icon}.png`}
                  alt=""
                />
              </td>
              <td className="deaths">{`${Math.round(eachDay.temp.day)} °C`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="chart-wrapper">
        <HorizontalBar data={allData} />
      </div>
    </div>
  );
}

export default WeatherDaily;
