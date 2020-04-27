import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components';

import theme from './utils/theme';
import KelimelerView from './views/kelimeler';
import EkleView from './views/ekle';
// import ListeView from './views/liste';
import LoginView from './views/login';
import RegisterView from './views/register';

const Stack = createStackNavigator();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator headerMode="false">
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="Register" component={RegisterView} />
          <Stack.Screen name="Kelimeler" component={KelimelerView} />
          <Stack.Screen name="Ekle" component={EkleView} />
          {/* <Stack.Screen name="Liste" component={ListeView} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
