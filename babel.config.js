module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // Production bundle size reduction for unused modules
  // https://callstack.github.io/react-native-paper/docs/guides/getting-started/#installation
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
