module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12
    },
    "plugins": [
        "@stylistic/js"
    ],
    "rules": {
        "@stylistic/js/indent": [
            "error",
            2
        ],
        "@stylistic/js/linebreak-style": [
            "error",
            "unix"
        ],
        "@stylistic/js/quotes": [
            "error",
            "single"
        ],
        "@stylistic/js/semi": [
            "error",
            "never"
        ],
    },
    "settings": {
        "react": {
            "version": "17.0.2"
        }
    }
}
