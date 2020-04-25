/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {SafeAreaView, AsyncStorage} from 'react-native';

import Box from '../components/style/Box';
import Text from '../components/style/Text';
import Input from '../components/style/Input';
import Button from '../components/style/Button';

import firebase from 'firebase';
import {veritabani} from '../utils/api';
import {
  HesapKontrol,
  HesapKontrolButton,
  HesapKontrolText,
} from '../components/hesapKontrol';

export const isLogin = async (userid) => {
  try {
    console.log(userid);
    await AsyncStorage.setItem(
      'isLogin',
      JSON.stringify({is: true, userid: userid}),
    );
  } catch (err) {
    console.log(err);
  }
};
function LoginView({navigation}) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const loginMi = async () => {
    try {
      AsyncStorage.getItem('isLogin').then((e) => {
        e != null ? navigation.navigate('Kelimeler') : null;
      });
    } catch (pass) {
      console.log(pass);
    }
  };

  React.useEffect(() => {
    loginMi();
  }, []);

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        (data) => {
          isLogin(data.user.uid);
          navigation.navigate('Kelimeler');
        },
        (error) => {
          console.log('signError error: ', error);
        },
      );
  };

  return (
    <Box as={SafeAreaView} bg="#FFFFD2" flex={1}>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text fontSize={24} fontWeight="bold" color="#222831">
          Lütfen Giriş Yapın!
        </Text>
        <Box width="30%" height={1} bg="#222831" mt={30}></Box>
        <Box mt={30}>
          <Input
            bg="white"
            minWidth="85%"
            maxWidth="85%"
            height={60}
            placeholder="Kullanıcı Adınız"
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
            onChangeText={(text) => setEmail(text)}
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
          <Button
            mt={20}
            minWidth="85%"
            height={60}
            bg="#222831"
            borderRadius="normal"
            onPress={() => signIn()}>
            <Text color="#F1F1F1" fontWeight="bold" fontSize={15}>
              GİRİŞ YAP
            </Text>
          </Button>
          <HesapKontrol>
            <HesapKontrolText>Hesabın yok mu?</HesapKontrolText>
            <HesapKontrolButton onPress={() => navigation.navigate('Register')}>
              Kayıt Ol!
            </HesapKontrolButton>
          </HesapKontrol>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginView;
