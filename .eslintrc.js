module.exports = {
   env: {
      'commonjs': true,
      'es6': true,
   },
   parser: 'babel-eslint',
   parserOptions: {
      'ecmaVersion': 2018,
   },
   'rules': {
      "max-len": ["error", { "code": 152, "tabWidth": 4, "comments": 160 }],
      "semi": "error",
      "eqeqeq": "error",
      "curly": ["error", "multi"],
      "quotes": ["error", "single"],
      "no-dupe-keys": "error"
   },
};
