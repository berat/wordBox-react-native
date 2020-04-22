import React from 'react';
import {SafeAreaView} from 'react-native';

import Box from '../components/style/Box';
import Text from '../components/style/Text';
import Input from '../components/style/Input';
import Button from '../components/style/Button';

function LoginView() {
  return (
    <Box as={SafeAreaView}>
      <Text>Giriş sayfasına hoşgeldin</Text>
      <Box>
        <Input />
        <Button />
      </Box>
    </Box>
  );
}
export default LoginView;
