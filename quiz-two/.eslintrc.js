module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
    es6: true,
  },
  parser: "vue-eslint-parser",
  extends: [
    // "plugin:vue/vue3-essential",
    // 
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "@vue/typescript/recommended",
    "plugin:security/recommended",
    "prettier",
    "./.eslintrc-auto-import.json",
  ],
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2018,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: false,
    },
  },
  // plugins: ["vue", "@typescript-eslint/parser"],
  plugins: ["@typescript-eslint", "import", "vue"],
  rules: {
    "linebreak-style": "off",
    "vue/comment-directive": 'off',
    "@typescript-eslint/no-var-requires": 0,
    'vue/no-unused-vars': [
      "error", {
        "ignorePattern": "^_"
      }
    ],
    "no-unused-vars": [0],
    "@typescript-eslint/no-unused-vars": [
      "off"
    ],
    "no-var": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "comma-dangle": ["error", "only-multiline"],
    "@typescript-eslint/explicit-modult-boundary-types": "off",
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        "allowDestructuring": true,
        "allowedNames": ["vm"]
      }
    ],
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": ["off"]
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
};
