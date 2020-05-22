import React, { useState, useCallback } from "react";

// Components
import Modal from "../modal/Modal";

// Actions
import { loadCitiesFromLs } from "../../actions/index";

// Images
import berlin from "../../images/cities/berlin.jpg";
import france from "../../images/cities/france.jpg";
import newyork from "../../images/cities/newyork.jpg";
import london from "../../images/cities/london.jpg";

function CitiesList({ currentCityLon, saveCity, deleteCity }) {
  console.log("CITIES LIST RENDER");
  const [toggleModal, setToggleModal] = useState(false);
  const cities = loadCitiesFromLs();
  const isSaved =
    cities && cities.find((item) => item.lon === currentCityLon) ? true : false;
  const style = {
    border: isSaved ? "1px solid #ff3838" : "1px solid #110e3c",
  };

  function handleClearCities(e) {
    e.preventDefault();
    setToggleModal(!toggleModal);
  }

  return (
    <div className="cities-list">
      <div className="city-item">
        <a className="city-item-link" href="/weather/Berlin/13.41&52.52">
          <img className="city-img" src={berlin} alt="berlin" />
          <p className="city-name">Berlin, Germany</p>
        </a>
      </div>

      <div className="city-item">
        <a className="city-item-link" href="/weather/Paris/2.35&48.85">
          <img className="city-img" src={france} alt="france" />
          <p className="city-name">Paris, France</p>
        </a>
      </div>
      <div className="city-item">
        <a className="city-item-link" href="/weather/New%20York/-74.01&40.71">
          <img className="city-img" src={newyork} alt="newyork" />
          <p className="city-name">New York, USA</p>
        </a>
      </div>
      <div className="city-item">
        <a className="city-item-link" href="/weather/London/-0.13&51.51">
          <img className="city-img" src={london} alt="london" />
          <p className="city-name">London, Britain</p>
        </a>
      </div>
      <div style={style} className="city-item">
        <div className="city-add">
          {!isSaved ? (
            <>
              <i className="fas fa-plus"></i>
              <button className="city-add-btn" onClick={handleClearCities}>
                Clear cities
              </button>
              <button className="city-add-btn" onClick={saveCity}>
                Save city
              </button>
            </>
          ) : (
            <>
              <i className="fas fa-trash"></i>
              <button className="city-add-btn" onClick={handleClearCities}>
                Clear cities
              </button>
              <button
                className="city-add-btn"
                onClick={(e) =>
                  deleteCity(
                    e,
                    cities.find((item) => item.lon === currentCityLon).id
                  )
                }
              >
                Delete city
              </button>
            </>
          )}
        </div>
      </div>
      {toggleModal ? <Modal toggleModal={setToggleModal} /> : null}
    </div>
  );
}

export default React.memo(CitiesList);
