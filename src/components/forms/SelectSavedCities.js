import React, { useState, useCallback } from "react";
import { loadCitiesFromLs } from "../../actions/index";

function SelectSavedCities() {
  const [selectedCity, setSelectedCity] = useState({});

  const handleSelectChange = useCallback((e) => {
    e.preventDefault();
    const cityId = e.target.value;
    const selectedCityData = loadCitiesFromLs().find(
      (item) => item.id === cityId
    );
    setSelectedCity(selectedCityData);
  }, []);
  const handleFindSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (selectedCity) {
        window.location.assign(
          `/weather/${selectedCity.city}/${selectedCity.lon}&${selectedCity.lat}`
        );
      }
    },
    [selectedCity]
  );

  const savedCities = loadCitiesFromLs();

  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleFindSubmit}>
        <div className="input-group">
          <i className="fas fa-search-location"></i>
          <select
            className="search-input"
            name="cities"
            onChange={handleSelectChange}
            defaultValue="DEFAULT"
            disabled={savedCities ? false : true}
          >
            <option value="DEFAULT" disabled>
              {savedCities ? "Select a city" : "There is no saved cities yet"}
            </option>
            {savedCities
              ? savedCities.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.city}
                  </option>
                ))
              : null}
          </select>
          <input
            className="search-submit"
            type="submit"
            value="Get weather"
            disabled={selectedCity.id ? false : true}
          />
        </div>
      </form>
    </div>
  );
}

export default SelectSavedCities;
