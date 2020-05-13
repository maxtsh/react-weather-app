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
  const maxTemps = data
    .slice(1, 8)
    .map((eachMax) => Math.round(eachMax.temp.max));
  const minTemps = data
    .slice(1, 8)
    .map((eachMin) => Math.round(eachMin.temp.min));
  const weekDaysShort = weekDays.map((weekDay) => weekDay.slice(0, 3));

  const allData = {
    labels: weekDaysShort,
    datasets: [
      {
        label: "Max Temp °C",
        data: maxTemps,
        backgroundColor: "#302E63",
        borderColor: "#302E90",
        borderWidth: 1,
        barThickness: "flex",
      },
      {
        label: "Min Temp °C",
        data: minTemps,
        backgroundColor: "#f57f17",
        borderColor: "#f57f50",
        borderWidth: 1,
        barThickness: "flex",
      },
    ],
  };

  return (
    <div className="weather-daily">
      <table className="table">
        {/* <thead className="table-head">
          <tr>
            <th>Day</th>
            <th>Humidity</th>
            <th>Status</th>
            <th>Temp</th>
          </tr>
        </thead> */}
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
        <HorizontalBar
          data={allData}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}

export default WeatherDaily;
