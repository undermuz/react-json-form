import { fixupPluginRules } from "@eslint/compat"
import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import react from "eslint-plugin-react"
import globals from "globals"
import tseslint from "typescript-eslint"

const reactPlugin = fixupPluginRules(react)

export default tseslint.config(
    {
        ignores: ["dist/**", "build/**", "node_modules/**", "coverage/**"],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react: reactPlugin,
        },
        settings: {
            react: {
                version: "18.2",
            },
        },
        rules: {
            ...react.configs.flat.recommended.rules,
            ...react.configs.flat["jsx-runtime"].rules,
            "react/prop-types": "off",
            "no-unused-vars": "off",
            "no-useless-escape": "off",
            "no-prototype-builtins": "off",
            "no-debugger": "off",
            "no-console": "off",
            "new-cap": "off",
            strict: "error",
            "no-underscore-dangle": "off",
            "no-use-before-define": "off",
            "eol-last": "off",
            "require-atomic-updates": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/consistent-type-exports": "error",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-empty-object-type": "warn",
            "@typescript-eslint/no-wrapper-object-types": "warn",
            "@typescript-eslint/no-unsafe-function-type": "warn",
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/ban-ts-comment": "off",
        },
    },
    eslintConfigPrettier
)
