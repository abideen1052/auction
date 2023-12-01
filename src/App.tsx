import React from 'react';
import StackNavigator from './navigator/StackNavigator';
import {Provider} from 'react-redux';
import {store} from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}

export default App;
