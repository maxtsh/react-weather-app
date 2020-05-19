import React from "react";

import { loadCitiesFromLs } from "../../actions/index";

// Images
import berlin from "../../images/cities/berlin.jpg";
import france from "../../images/cities/france.jpg";
import newyork from "../../images/cities/newyork.jpg";
import london from "../../images/cities/london.jpg";

import "./CitiesList.css";

function CitiesList({ current, submit }) {
  const { city, lon, lat } = current;
  const cities = loadCitiesFromLs();

  const isSaved = cities.find((item) => item.lon === lon) ? true : false;

  const style = {
    border: isSaved ? "1px solid #ff3838" : "1px solid #110e3c",
  };

  return (
    <div className="cities-list">
      <div className="city-item">
        <img className="city-img" src={berlin} alt="berlin" />
        <p className="city-name">Berlin, Germany</p>
      </div>
      <div className="city-item">
        <img className="city-img" src={france} alt="france" />
        <p className="city-name">Paris, France</p>
      </div>
      <div className="city-item">
        <img className="city-img" src={newyork} alt="newyork" />
        <p className="city-name">New York, USA</p>
      </div>
      <div className="city-item">
        <img className="city-img" src={london} alt="london" />
        <p className="city-name">London, Britain</p>
      </div>
      <div style={style} className="city-item">
        <div className="city-add">
          <i className="fas fa-plus"></i>
          <form onSubmit={submit}>
            <input
              className="city-add-text"
              type="submit"
              value={isSaved ? "Delete city" : "Save city"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CitiesList);
