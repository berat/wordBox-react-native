import React from 'react';
import {SafeAreaView, AsyncStorage} from 'react-native';

import firebase from 'firebase';
import {veritabani} from '../utils/api';
import Box from '../components/style/Box';
import Input from '../components/style/Input';
import Button from '../components/style/Button';
import Text from '../components/style/Text';
import {Back} from '../components/icons/';

function EkleView({navigation}) {
  const [yabanci, setYabanci] = React.useState();
  const [anlami, setAnlami] = React.useState();
  const [uid, setUID] = React.useState();
  const [toplamKel, setToplamKel] = React.useState(0);

  const kaydet = () => {
    firebase
      .database()
      .ref('kelimeler')
      .push({
        userUID: JSON.parse(uid).userid,
        yabanci: yabanci,
        anlami: anlami,
      })
      .then((data) => {
        setYabanci('');
        setAnlami('');
      })
      .catch((err) => console.log(err));
  };

  const getToplamKel = () => {
    firebase
      .database()
      .ref('kelimeler')
      .on('value', (snapshot) => {
        let data = snapshot.val();
        setToplamKel(Object.keys(data).length);
        console.log(snapshot.val());
      });
  };

  const loginMi = async () => {
    try {
      AsyncStorage.getItem('isLogin').then((e) => {
        e !== null ? setUID(e) : navigation.navigate('Login');
      });
    } catch (pass) {
      console.log(pass);
    }
  };

  React.useState(() => {
    loginMi();
    getToplamKel();
  }, []);

  return (
    <Box bg="0.light" as={SafeAreaView} flex={1} justifyContent="space-between">
      <Button
        flexDirection="row"
        mt={30}
        width="45%"
        ml={20}
        alignItems="center"
        justifyContent="flex-start"
        onPress={() => navigation.navigate('Kelimeler')}>
        <Back />
        <Text pl={10} fontSize={19}>
          Kelimelere Dön
        </Text>
      </Button>
      <Box flex={10} justifyContent="center" width="100%" alignItems="center">
        <Box width="90%">
          <Text fontSize={21}>Yabancı Kelime: </Text>
          <Input
            width="100%"
            height={70}
            bg="#C4C4C4"
            px={20}
            fontSize={20}
            pr={10}
            color="black"
            placeholder="Blanket"
            borderRadius="normal"
            mt={10}
            value={yabanci || ''}
            onChangeText={(e) => setYabanci(e)}
          />
        </Box>
        <Box width="90%" mt={50}>
          <Text fontSize={21}>Anlamı: </Text>
          <Input
            width="100%"
            height={70}
            bg="#C4C4C4"
            px={20}
            fontSize={20}
            pr={10}
            color="black"
            placeholder="Battaniye"
            borderRadius="normal"
            mt={10}
            value={anlami || ''}
            onChangeText={(e) => setAnlami(e)}
          />
        </Box>
        <Button
          width="90%"
          mt={50}
          bg="0.dark"
          height={70}
          borderRadius="normal"
          onPress={() => kaydet()}>
          <Text color="0.light" fontWeight="bold" fontSize={18}>
            KAYDET
          </Text>
        </Button>
      </Box>
      <Box flex={1} flexDirection="row" justifyContent="center">
        <Text fontSize={16}>Toplam kelime sayısı: </Text>
        <Text fontSize={16} fontWeight="bold">
          {toplamKel}
        </Text>
      </Box>
    </Box>
  );
}

export default EkleView;
