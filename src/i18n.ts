import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { english } from "./languages/english";
import { norwegian } from "./languages/norwegian";

const resources = {
    en: {
        translation: english,
    },
    no: {
        translation: norwegian,
    },
};

// noinspection JSIgnoredPromiseFromCall
i18n.use(initReactI18next).init({
    resources,
    lng: "no",
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
