import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import ptbr from "@/locales/pt-br.json";

export default createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    "pt-br": ptbr,
  },
  numberFormats: {
    en: {
      currency: {
        style: "currency",
        currency: "USD",
      },
    },
    "pt-br": {
      currency: {
        style: "currency",
        currency: "BRL",
      },
    },
  },
});
