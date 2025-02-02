import { getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { de } from "./de";
import { en } from "./en";
import { fr } from "./fr";

type RecursiveCheck<T, U> = {
  [K in keyof T]: K extends keyof U
    ? T[K] extends object
      ? U[K] extends object
        ? RecursiveCheck<T[K], U[K]>
        : never
      : U[K]
    : never;
};

export const dictionary = {
  en,
  fr: fr satisfies RecursiveCheck<typeof en, typeof fr>,
  de: de satisfies RecursiveCheck<typeof en, typeof de>,
};

export type LangCode = "en" | "de" | "fr";

export const useTranslation = () => {
  const [locale, setLocaleState] = useState<LangCode>("en");
  useEffect(() => {
    const storedLocale = ((getCookie("locale") as string) || "en") as LangCode;
    setLocaleState(storedLocale);
  }, []);

  function translate(key: keyof typeof en) {
    if (!dictionary[locale]) {
      locale === "en";
    }
    return dictionary[locale][key];
  }

  const setLocale = (newLocale: LangCode) => {
    setCookie("locale", newLocale);
    setLocaleState(newLocale)
  };

  return { t: translate, locale, setLocale };
};
