// filepath: /Users/prakashagrahari/Desktop/workspace/e-notes/server/eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"], // Include .ts files
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      ecmaVersion: 2021, // Equivalent to ES2021
      globals: {
        process: "readonly", // Node.js global
        __dirname: "readonly", // Node.js global
        module: "readonly", // Node.js global
        require: "readonly", // Node.js global
        console: "readonly", // Add console as a global
      },
    },
    rules: {
      // Add your custom rules here
    },
  },
]);
