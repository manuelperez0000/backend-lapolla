import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"], languageOptions: { sourceType: "commonjs" },
    rules: {
      "no-unused-vars": 2,
      "no-undef": "error"
    }
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,

];