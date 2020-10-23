import React from 'react';
import codePush from "react-native-code-push";

import MainApp from './src/app';

const App = () => {
  return (
    <MainApp />
  );
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
