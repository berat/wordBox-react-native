import React from 'react';
import {SafeAreaView} from 'react-native';

import Box from '../components/style/Box';
import Text from '../components/style/Text';
import Input from '../components/style/Input';
import Button from '../components/style/Button';

import firebase from 'firebase';
import {
  HesapKontrol,
  HesapKontrolButton,
  HesapKontrolText,
} from '../components/hesapKontrol';

function RegisterView({navigation}) {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [cpassword, setCPassword] = React.useState();

  const kayitOl = () => {
    cpassword === password
      ? firebase
          .auth()
          .createUserWithEmailAndPassword(username, password)
          .then(
            (user) => {
              navigation.navigate('Login');
            },
            (error) => console.log('createUser error: ', error),
          )
      : null;
  };

  return (
    <Box as={SafeAreaView} bg="#FFFFD2" flex={1}>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text fontSize={24} fontWeight="bold" color="#222831">
          Lütfen Kayıt Olun!
        </Text>
        <Box width="30%" height={1} bg="#222831" mt={30}></Box>
        <Box mt={30}>
          <Input
            bg="white"
            minWidth="85%"
            maxWidth="85%"
            height={60}
            placeholder="Mail Adresin"
            px={15}
            pr={13}
            borderRadius="normal"
            border="1px solid"
            borderColor="#ddd"
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4.27,
              elevation: 2,
            }}
            onChangeText={(text) => setUsername(text)}
          />
          <Input
            bg="white"
            minWidth="85%"
            maxWidth="85%"
            height={60}
            placeholder="Parolanız"
            px={15}
            pr={13}
            mt={20}
            borderRadius="normal"
            border="1px solid"
            borderColor="#ddd"
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4.27,
              elevation: 2,
            }}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            bg="white"
            minWidth="85%"
            maxWidth="85%"
            height={60}
            placeholder="Parolanızı Doğrulayın"
            px={15}
            pr={13}
            mt={20}
            borderRadius="normal"
            border="1px solid"
            borderColor="#ddd"
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4.27,
              elevation: 2,
            }}
            secureTextEntry={true}
            onChangeText={(text) => setCPassword(text)}
          />
          <Button
            mt={20}
            minWidth="85%"
            height={60}
            bg="#222831"
            borderRadius="normal"
            onPress={() => kayitOl()}>
            <Text color="#F1F1F1" fontWeight="bold" fontSize={15}>
              Kayıt Ol
            </Text>
          </Button>
          <HesapKontrol>
            <HesapKontrolText>Hesabın var mı?</HesapKontrolText>
            <HesapKontrolButton onPress={() => navigation.navigate('Login')}>
              Giriş Yap!
            </HesapKontrolButton>
          </HesapKontrol>
        </Box>
      </Box>
    </Box>
  );
}
export default RegisterView;
