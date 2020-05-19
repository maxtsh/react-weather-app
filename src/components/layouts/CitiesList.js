import React from "react";

import { loadCitiesFromLs, deleteCityFromLs } from "../../actions/index";

// Images
import berlin from "../../images/cities/berlin.jpg";
import france from "../../images/cities/france.jpg";
import newyork from "../../images/cities/newyork.jpg";
import london from "../../images/cities/london.jpg";

import "./CitiesList.css";

function CitiesList({ currentCityLon, saveCity, deleteCity }) {
  const cities = loadCitiesFromLs();

  const isSaved =
    cities && cities.find((item) => item.lon === currentCityLon) ? true : false;

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
          {!isSaved ? (
            <>
              <i className="fas fa-trash"></i>
              <form onSubmit={saveCity}>
                <input
                  className="city-add-text"
                  type="submit"
                  value="Save city"
                />
              </form>
            </>
          ) : (
            <>
              <i className="fas fa-plus"></i>
              <form
                onSubmit={(e) =>
                  deleteCity(
                    e,
                    cities.find((item) => item.lon === currentCityLon).id
                  )
                }
              >
                <input
                  className="city-add-text"
                  type="submit"
                  value="Delete city"
                />
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(CitiesList);
