import React from "react";
import { Bar } from "react-chartjs-2";

// Get The Next 24 Hours From Current Time
import getHours from "../../utils/getHours";

import "./WeatherHourly.css";

function WeatherHourly({ data }) {
  const next24Hours = getHours();

  const hourlyTemp = data.map((each) => each.temp);

  const allData = {
    labels: next24Hours,
    datasets: [
      {
        label: "Temp °C",
        data: hourlyTemp,
        backgroundColor: "#302E63",
        borderColor: "#302E90",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="temp-chart">
      <Bar data={allData} options={{ maintainAspectRatio: true }} />
    </div>
  );
}

export default WeatherHourly;