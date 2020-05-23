import React, { createContext, useMemo } from "react";
import useLocalStorageReducer from "../hooks/useLocalStorageReducer";
import languageReducer from "../reducers/LanguageReducer";

const initialLanguage = { current: "English" };

export const languageContext = createContext();
export const dispatchContext = createContext();

export function LanguageProvider(props) {
  const [language, langDispatch] = useLocalStorageReducer(
    "language",
    languageReducer,
    initialLanguage
  );

  // For preventing unneccessary consumer re-renders with wrap this in memo hook
  // Also seprating dispatch context and language context to prevent same thing
  const langValue = useMemo(() => language, [language]);
  const dispValue = useMemo(() => langDispatch, [langDispatch]);
  return (
    <languageContext.Provider value={langValue}>
      <dispatchContext.Provider value={dispValue}>
        {props.children}
      </dispatchContext.Provider>
    </languageContext.Provider>
  );
}
