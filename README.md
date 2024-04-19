# @caspeco/eslint-config

## Usage

The provided configuration contains shared ESLint rules for typescript projects across Caspeco. To use this configuration you'll need `.eslintrc.js` file in your project root with the following content:

```js
module.exports = {
  extends: "@caspeco",
};
```

### Frontend Vanilla

```js
module.exports = {
  extends: "@caspeco/eslint-config/frontend-vanilla",
};
```

### Frontend React

```js
module.exports = {
  extends: "@caspeco/eslint-config/frontend-react",
};
```
