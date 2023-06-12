import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Home from './Screens/Home';
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';
import { store } from './redux/store';
 
const App = () => {
 return (
    <Provider store={store}>
      <SafeAreaView>
          <StatusBar />
          <Home />
      </SafeAreaView>
    </Provider>
   
 );
};
 
export default App;