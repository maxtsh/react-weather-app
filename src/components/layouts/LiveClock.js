import React, { useState, useEffect, useCallback } from "react";

function LiveClock() {
  const [clock, setClock] = useState();
  const time = new Date();
  const getLiveClock = useCallback(() => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}:${String(second).padStart(2, "0")}`;
  }, [time]);

  useEffect(() => {
    let clockInterval = setInterval(() => setClock(getLiveClock()), 1000);

    return () => clearInterval(clockInterval);
  }, [getLiveClock]);

  return <p className="local-time">{clock}</p>;
}

export default LiveClock;
