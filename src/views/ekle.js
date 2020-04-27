import React from 'react';
import {SafeAreaView, AsyncStorage} from 'react-native';

import firebase from 'firebase';
import {veritabani} from '../utils/api';
import Box from '../components/style/Box';
import Input from '../components/style/Input';
import Button from '../components/style/Button';
import Text from '../components/style/Text';
import {Back} from '../components/icons/';

function EkleView({navigation, route}) {
  const [yabanci, setYabanci] = React.useState();
  const [anlami, setAnlami] = React.useState();
  const [uid, setUID] = React.useState();
  const [kelimeID, setKelimeID] = React.useState();
  const [toplamKel, setToplamKel] = React.useState(0);

  const paramKontrol = () => {
    if (route.params !== undefined) {
      setKelimeID(route.params.kelimeID);
      setYabanci(route.params.yabanciKelime);
      setAnlami(route.params.kelimeAnlami);
    }
  };

  const kaydet = () => {
    firebase
      .database()
      .ref(`kelimeler/${JSON.parse(uid).userid}`)
      .push({
        ezber: false,
        yabanci: yabanci,
        anlami: anlami,
      })
      .then((data) => {
        setYabanci('');
        setAnlami('');
      })
      .catch((err) => console.log(err));
  };

  const guncelle = () => {
    firebase
      .database()
      .ref(`kelimeler/${JSON.parse(uid).userid}/${kelimeID}`)
      .update({
        yabanci: yabanci,
        anlami: anlami,
      })
      .then((data) => {
        setYabanci('');
        setAnlami('');
      })
      .catch((err) => console.log(err));
  };

  const loginMi = async () => {
    try {
      await AsyncStorage.getItem('isLogin').then((e) => {
        if (e) {
          setUID(e);
          firebase
            .database()
            .ref(`kelimeler/${JSON.parse(e).userid}`)
            .on('value', (snapshot) => {
              let data = snapshot.val();
              setToplamKel(Object.keys(data).length);
            });
        } else {
          navigation.navigate('Login');
        }
      });
    } catch (pass) {
      console.log(pass);
    }
  };
  const getToplamKel = async () => {};

  React.useState(() => {
    loginMi();
    paramKontrol();
    getToplamKel();
  }, [setUID]);

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
            defaultValue={yabanci || ''}
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
            defaultValue={anlami || ''}
            onChangeText={(e) => setAnlami(e)}
          />
        </Box>
        <Button
          width="90%"
          mt={50}
          bg="0.dark"
          height={70}
          borderRadius="normal"
          onPress={() => (kelimeID ? guncelle() : kaydet())}>
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
