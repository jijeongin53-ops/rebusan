/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Check localStorage for saved language, default to 'en'
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('appLanguage') || 'en';
    });

    // When language changes, update localStorage
    useEffect(() => {
        localStorage.setItem('appLanguage', language);
    }, [language]);

    const t = (key, params = {}) => {
        let text = translations[language]?.[key];
        if (!text) {
            // fallback to en
            text = translations['en'][key] || key;
        }

        // replace params
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });

        return text;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
