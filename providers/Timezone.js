import React, { useState } from "react";

export const TimezoneContext = React.createContext({
  timezone: "UTC",
  setTimezone: () => {},
});

export const Timezone = ({ children }) => {
  const [timezone, setTimezone] = useState("UTC");

  const contextZone = {
    timezone,
    setTimezone,
  }

  return (
    <TimezoneContext.Provider value={contextZone}>
      {children}
    </TimezoneContext.Provider>
  );
};
