module.exports = {
    root: true,
    "settings": {
        "import/resolver": "webpack"
    },
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
        '@vue/typescript',
    ],
    rules: {
        'import/extensions': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }],
        'class-methods-use-this': ['off', {}],
        'max-len': ['error', { code: 150 }],
        'arrow-parens': ['error', 'as-needed'],
        'prefer-destructuring': ['error', {
            array: false,
            object: false,
        }, {
            enforceForRenamedProperties: false,
        }],
        'no-mixed-spaces-and-tabs': 'off',
        'no-tabs': 'off',
        "import/no-unresolved": "off",
        "no-trailing-spaces": ["error", { "skipBlankLines": true }],
        "no-unused-vars": "off",
        "import/prefer-default-export": "off",
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
};
