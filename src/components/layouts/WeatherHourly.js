import React from "react";
import { Bar } from "react-chartjs-2";

// Styles
import "./WeatherHourly.css";

// Get The Next 24 Hours From Current Time
import getHours from "../../utils/getHours";

function WeatherHourly({ data }) {
  console.log("Hourly Render");

  const next24Hours = getHours();

  const hourlyTemp = data.slice(0, 24).map((each) => each.temp);

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

export default React.memo(WeatherHourly);
