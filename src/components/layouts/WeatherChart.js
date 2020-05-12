import React from "react";
import { Bar } from "react-chartjs-2";

// Get The Next 24 Hours From Current Time
import getDailyHours from "../../utils/getDailyHours";

import "./WeatherChart.css";

function WeatherChart({ data }) {
  const next24Hours = getDailyHours();
  console.log(next24Hours);

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
      <Bar data={allData} />
    </div>
  );
}

export default WeatherChart;
