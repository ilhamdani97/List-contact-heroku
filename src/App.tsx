import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Home from './Screens/Home';
import { RecoilRoot } from 'recoil';
 
const App = () => {
 return (
    <RecoilRoot>
      <SafeAreaView>
          <StatusBar />
          <Home />
      </SafeAreaView>
    </RecoilRoot>
   
 );
};
 
export default App;