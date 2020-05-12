import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { languageContext } from "../../context/languageContext";

// Header Styles
import "./header.css";

const languages = {
  English: {
    title: "Weather App",
    menus: {
      home: "Home",
      about: "About",
      api: "API",
    },
  },
  Persian: {
    title: "اَپ آب و هوا",
    menus: {
      home: "صفحه اصلی",
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
      payload: e.target.value,
    });
  }

  return (
    <header className="header-container">
      <nav className="navigation container">
        <h1 className="main-title">{languages[language.current].title}</h1>
        <ul className="list">
          <li className="list-item">
            <select
              className="language-select"
              name="language"
              onChange={handleChange}
            >
              <option value="English">English</option>
              <option value="Persian">فارسی</option>
            </select>
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
