module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './components',
            '@screens': './screens',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          allowList: ['FRONTEND_URL', 'FRONTEND_PORT'],
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
  };
};
