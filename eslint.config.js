// @ts-check

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";

const compat = new FlatCompat();

export default [
  {
    ignores: [
      ".history",
      "coverage",
      "dist",
      "docs",
      "node_modules"
    ]
  },
  js.configs.recommended,
  ...compat.plugins(
    "import"
  ),
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:unicorn/recommended"
  ),
  {
    plugins: {
      typescriptEslint
    },
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    rules: {
      indent: [
        "error",
        2,
        {
          SwitchCase: 1
        }
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      quotes: [
        "error",
        "double"
      ],
      semi: "off",
      "@typescript-eslint/semi": [
        "error",
        "always"
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/sort-type-constituents": "error",
      "@typescript-eslint/member-delimiter-style": [
        "error",
        {
          multiline: {
            delimiter: "comma",
            requireLast: false
          },
          overrides: {
            interface: {
              multiline: {
                delimiter: "semi",
                requireLast: true
              }
            }
          }
        }
      ],
      "unicorn/prevent-abbreviations": "error",
      "import/no-duplicates": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type"
          ],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: [
            "builtin"
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ]
    }
  }
];
