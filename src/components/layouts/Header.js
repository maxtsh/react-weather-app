import React, { useState, useCallback, useContext } from "react";
import { Link } from "react-router-dom";

// Language Context
import { languageContext } from "../../context/languageContext";

// Logo
import Logo from "../../images/logo.png";

// Language Data
import { headerLanguages } from "../../utils/languageData";

function Header() {
  const { language, dispatch } = useContext(languageContext);
  const [open, setOpen] = useState(false);

  // Change Callback Optimization
  const handleChange = useCallback(
    (e) => {
      dispatch({
        type: "CHANGE_LANGUAGE",
        payload: e.target.checked ? "Persian" : "English",
      });
    },
    [dispatch]
  );

  return (
    <header className="header-container">
      <nav className="navigation container">
        <div className="hamburger" onClick={() => setOpen(!open)}>
          {open ? (
            <i className="fas fa-times-circle"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </div>

        <ul className={open ? "nav-links open" : "nav-links"}>
          <li className={open ? "nav-item fade" : "nav-item"}>
            <img className="logo" src={Logo} alt="logo" />
          </li>
          <li className={open ? "nav-item fade" : "nav-item"}>
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
          <li className={open ? "nav-item fade" : "nav-item"}>
            <Link to="/">{headerLanguages[language.current].menus.home}</Link>
          </li>
          <li className={open ? "nav-item fade" : "nav-item"}>
            <Link to="/about">
              {headerLanguages[language.current].menus.about}
            </Link>
          </li>
          <li className={open ? "nav-item fade" : "nav-item"}>
            <Link to="/api">{headerLanguages[language.current].menus.api}</Link>
          </li>
        </ul>

        <h1 className="main-title">
          {headerLanguages[language.current].title}
        </h1>
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
            <Link to="/">{headerLanguages[language.current].menus.home}</Link>
          </li>
          <li className="list-item">
            <Link to="/about">
              {headerLanguages[language.current].menus.about}
            </Link>
          </li>
          <li className="list-item">
            <Link to="#">{headerLanguages[language.current].menus.api}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default React.memo(Header);
