module.exports = {
  presets: ['@react-native/babel-preset'], // ← cambia esto
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src'
        }
      }
    ],
    'react-native-reanimated/plugin',
  ],
};