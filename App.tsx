import React, { FC } from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes';

const App: FC = () => {
  return (
    <>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='#f5f5f5'
      />
      <Routes />
    </>
  );
};

export default App;
