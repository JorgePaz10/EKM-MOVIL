import React, { Children, createContext, useContext, useState } from "react"
import { translations } from "../utils/translations/translations";
import { I18n } from "i18n-js";

type Language = "es" | "en";

type LanguageContextType = {
    language: Language;
    changeLanguage: (lng: Language)=>void;
    clearLanguage: () =>{};
}

//FDefinicion de librario de traducciones /utils

//2. Crear la instancia de i18n con el diccionario cargado
const  i18n = new I18n(translations);

//Definir propiedades
i18n.defaultLocale = "en";
i18n.enableFallback = true;


const LanguageContext = createContext<LanguageContextType | null> (null);

export const LanguageProvider = ({children}: {children:React.ReactNode}) => {
    const [language, setLanguage] = useState<Language>('es');

    const changeLanguage = (lng: Language) =>{
        setLanguage(lng);
        i18n.locale = lng;
    }

    const clearLanguage = () =>{
        return '';
    }


    return(
        <LanguageContext.Provider value={{language, changeLanguage, clearLanguage}}>
        {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage debe utiizarse dentro de LanguageProvider");
    return context;
}