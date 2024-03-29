module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
		},
	},
	settings: {
		react: {
			version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
		},
	},
	plugins: ['react-hooks', 'prettier'],
	extends: [
		'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
		'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
		'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	rules: {
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				'selector': 'default',
				'format': ['camelCase'],
				'filter': {
					// you can expand this regex to add more allowed names
					'regex': '[- ]',
					'match': false
				}
			},

			{
				'selector': 'variable',
				'format': ['camelCase', 'PascalCase', 'UPPER_CASE']
			},
			{
				'selector': 'property',
				'format': ['camelCase', 'snake_case', 'PascalCase'],
				'filter': {
					// you can expand this regex to add more allowed names
					'regex': '[- ]',
					'match': false
				}
			},
			{
				'selector': 'parameter',
				'format': ['camelCase', 'snake_case', 'PascalCase'],
				'leadingUnderscore': 'allow'
			},
			{
				'selector': 'memberLike',
				'modifiers': ['private'],
				'format': ['camelCase'],
				'leadingUnderscore': 'require'
			},

			{
				'selector': 'typeLike',
				'format': ['PascalCase']
			}
		]
	},
};
