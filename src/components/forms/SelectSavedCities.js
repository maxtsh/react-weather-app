import React, { useState, useCallback, useContext } from "react";
// Actions
import { loadCitiesFromLs } from "../../actions/index";
// Contexts
import { languageContext } from "../../context/languageContext";

const langs = {
  English: {
    select: {
      saved: "Select a city",
      noSaved: "There is no saved cities yet",
    },
    submit: "Get weather",
    style: {
      field: {
        borderTopLeftRadius: "0.5rem",
        borderBottomLeftRadius: "0.5rem",
        padding: "0.5rem 0.5rem 0.5rem 3rem",
      },
      borderRadiusSubmit: {
        borderTopRightRadius: "0.5rem",
        borderBottomRightRadius: "0.5rem",
      },
      iconPosition: {
        left: "10px",
      },
    },
  },
  Persian: {
    select: {
      saved: "یک شهر انتخاب کنید",
      noSaved: "هیچ شهری ذخیره نشده است",
    },
    submit: "دریافت آب و هوا",
    style: {
      field: {
        borderTopRightRadius: "0.5rem",
        borderBottomRightRadius: "0.5rem",
        padding: "0.5rem 3rem 0.5rem 0.5rem",
      },
      borderRadiusSubmit: {
        borderTopLeftRadius: "0.5rem",
        borderBottomLeftRadius: "0.5rem",
      },
      iconPosition: {
        right: "10px",
      },
    },
  },
};

function SelectSavedCities() {
  const [selectedCity, setSelectedCity] = useState({});
  const language = useContext(languageContext);

  // Handling changes of Select element
  const handleSelectChange = useCallback((e) => {
    e.preventDefault();
    const cityId = e.target.value;
    const selectedCityData = loadCitiesFromLs().find(
      (item) => item.id === cityId
    );
    setSelectedCity(selectedCityData);
  }, []);

  // Go to the selected city and load the weather data for it
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
          <i
            style={langs[language.current].style.iconPosition}
            className="fas fa-search-location"
          ></i>
          <select
            className="search-input"
            name="cities"
            style={langs[language.current].style.field}
            onChange={handleSelectChange}
            defaultValue="DEFAULT"
            disabled={savedCities ? false : true}
          >
            <option value="DEFAULT" disabled>
              {savedCities
                ? langs[language.current].select.saved
                : langs[language.current].select.noSaved}
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
            style={langs[language.current].style.borderRadiusSubmit}
            type="submit"
            value={langs[language.current].submit}
            disabled={selectedCity.id ? false : true}
          />
        </div>
      </form>
    </div>
  );
}

export default React.memo(SelectSavedCities);
