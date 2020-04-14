import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
      translation: {
        Introduction: "Introduction","Welcome":"Welcome",
      }
    },
    pt: {
      translation: {
        Introduction: "Introdução","Welcome":"Bem-Vindo",
      }
    },
  };


i18n.use(initReactI18next).init({
  // we init with resources
  resources,
  fallbackLng: "en",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false // not needed for react!!
  }
});

export default i18n;




