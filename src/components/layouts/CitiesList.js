import React from "react";

// Images
import berlin from "../../images/cities/berlin.jpg";
import france from "../../images/cities/france.jpg";
import newyork from "../../images/cities/newyork.jpg";
import london from "../../images/cities/london.jpg";

import "./CitiesList.css";

function CitiesList({ submit }) {
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
      <div className="city-item">
        <div className="city-add">
          <i className="fas fa-plus"></i>
          <form onSubmit={submit}>
            <input className="city-add-text" type="submit" value="Save City" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CitiesList);
