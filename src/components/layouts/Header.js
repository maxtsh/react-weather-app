import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { languageContext } from "../../context/languageContext";

// Header Styles
import "./header.css";

const languages = {
  English: {
    title: "Weather App",
    direction: "ltr",
    menus: {
      home: "Home",
      about: "About",
      api: "API",
    },
  },
  Persian: {
    title: "اَپ آب و هوا",
    direction: "rtl",
    menus: {
      home: "خانه",
      about: "درباره ما",
      api: "ای پی آی",
    },
  },
};

function Header() {
  const { language, dispatch } = useContext(languageContext);

  console.log("HEADER");

  function handleChange(e) {
    dispatch({
      type: "CHANGE_LANGUAGE",
      payload: e.target.checked ? "Persian" : "English",
    });
  }

  return (
    <header className="header-container">
      <nav className="navigation container">
        <h1 className="main-title">{languages[language.current].title}</h1>
        <ul className="list">
          <li className="list-item">
            <div className="button r" id="button-3">
              <input
                type="checkbox"
                className="checkbox"
                onChange={handleChange}
              />
              <div className="knobs"></div>
              <div className="layer"></div>
            </div>
          </li>
          <li className="list-item">
            <Link to="/">{languages[language.current].menus.home}</Link>
          </li>
          <li className="list-item">
            <Link to="/about">{languages[language.current].menus.about}</Link>
          </li>
          <li className="list-item">
            <Link to="#">{languages[language.current].menus.api}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default React.memo(Header);
