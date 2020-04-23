import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components';

import {isLogin} from './views/login';

import theme from './utils/theme';
import KelimelerView from './views/kelimeler';
// import ListeView from './views/liste';
import LoginView from './views/login';
import RegisterView from './views/register';

const Stack = createStackNavigator();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {isLogin ? (
          <Stack.Navigator headerMode="false">
            <Stack.Screen name="Kelimeler" component={KelimelerView} />
            {/* <Stack.Screen name="Liste" component={ListeView} /> */}
          </Stack.Navigator>
        ) : (
          <Stack.Navigator headerMode="false">
            <Stack.Screen name="Login" component={LoginView} />
            <Stack.Screen name="Register" component={RegisterView} />
            <Stack.Screen name="Kelimeler" component={KelimelerView} />
            {/* <Stack.Screen name="Liste" component={ListeView} /> */}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
