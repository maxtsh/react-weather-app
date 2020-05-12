import React from "react";
import { Bar } from "react-chartjs-2";

import "./WeatherChart.css";

function WeatherChart({ data }) {
  console.log(data);

  const hourlyTemp = data.map((each) => each.temp);

  const allData = {
    labels: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
    ],
    datasets: [
      {
        label: "Next 24 hours temp °C",
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
