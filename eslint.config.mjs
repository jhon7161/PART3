import globals from "globals";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

pluginReactConfig.settings = {
  ...pluginReactConfig.settings,
  react: {
    version: "detect",
  },
};

export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginReactConfig,
];
