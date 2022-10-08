const { defineConfig } = require("cypress");

module.exports = defineConfig({
  numTestsKeptInMemory: 10,
  viewportWidth: 1920,
  viewportHeight: 1080,
  waitForAnimations: true,
  chromeWebSecurity: false,
  requestTimeout: 60000,
  responseTimeout: 120000,
  pageLoadTimeout: 60000,
  defaultCommandTimeout: 10000,
  trashAssetsBeforeRuns: true,
  video: false,
  videoUploadOnPasses: false,
  blockHosts: [
    "*google-analytics.com",
    "*googleadservices.com",
    "*googletagmanager.com",
    "*criteo.net",
    "*iadvize.com",
    "*msecnd.net",
    "*facebook.net",
  ],
  projectId: "",
  e2e: {
    experimentalSessionAndOrigin: true,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.preferences.default.intl = { accept_languages: "fr" };
          // https://github.com/GoogleChrome/chrome-launcher/blob/master/docs/chrome-flags-for-tools.md
          launchOptions.args.push("--disable-dev-shm-usage");
          launchOptions.args.push("--js-flags=--expose-gc");
          launchOptions.args.push("--num-raster-threads=4");
          launchOptions.args.push("--disable-background-networking");
          launchOptions.args.push("--disable-default-apps");
          launchOptions.args.push("--disable-gpu");
          launchOptions.args.push("--disable-sync");
          launchOptions.args.push("--disable-features=Translate");
          launchOptions.args.push("--metrics-recording-only");
          launchOptions.args.push("--mute-audio");
          launchOptions.args.push("--no-first-run");
          launchOptions.args.push("--disable-client-side-phishing-detection");
          launchOptions.args.push("--no-default-browser-check");
          launchOptions.args.push("--auto-open-devtools-for-tabs");

          return launchOptions;
        }
      });
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "https://www.welcometothejungle.com/fr",
    env: {
      apiUrl: "https://api.welcometothejungle.com/api/v1",
    },
    watchForFileChanges: false,
  },
});
