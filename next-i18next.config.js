
const LocizeBackend = require("i18next-locize-backend/cjs");
const ChainedBackend = require("i18next-chained-backend").default;
const LocalStorageBackend = require("i18next-localstorage-backend").default;
const isBrowser = typeof window !== "undefined";
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "ko", "mn"],
  },
  backend: {
    projectId: "b000f058-b3be-4dc3-b35a-4f17bdff4884",
    apiKey: "166ec7bc-632b-48dd-bb28-f2867e2067c9", // to not add the api-key in production, used for saveMissing feature
    referenceLng: "en",
  },
  use: [require("i18next-locize-backend/cjs")],
  ns: ["common", "footer", "second-page"], // the namespaces needs to be listed here, to make sure they got preloaded
  serializeConfig: false, 

};
