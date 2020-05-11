import React, { createContext, useReducer } from 'react';
import languageReducer from '../reducers/LanguageReducer';

const initialLanguage = { current: "English" };

export const languageContext = createContext();

export function LanguageProvider(props){
    const [language, dispatch] = useReducer(languageReducer, initialLanguage);

    return(
        <languageContext.Provider value={{language, dispatch}} >
            {props.children}
        </languageContext.Provider>
    )
};