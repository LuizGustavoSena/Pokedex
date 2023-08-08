import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: 'tests/cypress/support/e2e.ts',
    specPattern: 'tests/cypress/e2e/',
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
