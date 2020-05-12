import React, { createContext, useReducer, useMemo } from "react";
import languageReducer from "../reducers/LanguageReducer";

const initialLanguage = { current: "English" };

export const languageContext = createContext();

export function LanguageProvider(props) {
  const [language, dispatch] = useReducer(languageReducer, initialLanguage);

  // For preventing unneccessary consumer re-renders with wrap this in memo hook
  const value = useMemo(() => ({ language, dispatch }), [language]);

  return (
    <languageContext.Provider value={value}>
      {props.children}
    </languageContext.Provider>
  );
}
