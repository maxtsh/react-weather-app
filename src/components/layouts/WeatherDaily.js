import React from "react";
import { Bar } from "react-chartjs-2";

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
    labels: [1, 2, 3, 4],
    datasets: [
      {
        label: "Temp °C",
        data: [21, 22, 23, 24],
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
          {data.map((day, index) => (
            <tr key={index}>
              <td>{weekDays[index]}</td>
              {/* <td>
              {country.provinceState
                ? country.provinceState
                : country.countryRegion}
            </td>
            <td>{country.confirmed}</td>
            <td className="deaths">{country.deaths}</td>
            <td>{country.recovered}</td>
            <td>{country.active}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="chart-wrapper">
        <Bar data={allData} />
      </div>
    </div>
  );
}

export default WeatherDaily;
