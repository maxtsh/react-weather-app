import React from "react";
import loaderImg from "../../images/loader.gif";

export default function Loader({ classes }) {
  return (
    <div className={classes === "main" ? "main-loader" : "fall-back"}>
      <img className="loader-img" src={loaderImg} alt="Loader" />
    </div>
  );
}
