import React from 'react';
import {SafeAreaView, AsyncStorage, ScrollView, Dimensions} from 'react-native';

import firebase from 'firebase';
import {veritabani} from '../utils/api';
import Box from '../components/style/Box';
import Text from '../components/style/Text';
import Button from '../components/style/Button';
import {Random, Add, Detail, Edit, Okey, Voice} from '../components/icons';
import BoxBg from '../components/boxBg';
import theme from '../utils/theme';

function KelimelerView({navigation}) {
  const [isWord, setWord] = React.useState('false');
  const [uid, setUID] = React.useState();
  const [renkKod, setRenkKod] = React.useState(Math.floor(Math.random() * 9));
  const [data, setData] = React.useState({
    load: false,
    dataKeys: null,
    data: null,
  });

  const loginMi = async () => {
    try {
      AsyncStorage.getItem('isLogin').then((e) => {
        e !== null ? setUID(e) : navigation.navigate('Login');
      });
    } catch (pass) {
      console.log(pass);
    }
  };

  const getData = () => {
    firebase
      .database()
      .ref('kelimeler')
      .on('value', (snapshot) => {
        let data1 = snapshot.val();
        setData({load: true, dataKeys: Object.keys(data1), data: data1});
      });
  };

  const cikisYap = async () => {
    try {
      await AsyncStorage.removeItem('isLogin').then((e) =>
        navigation.navigate('Login'),
      );
    } catch (err) {
      console.log(err);
    }
  };

  React.useState(() => {
    loginMi();
    getData();
  }, []);

  const anlikScroll = (e) => {
    setRenkKod(Math.floor(Math.random() * 9));
    setWord('false');
  };
  return (
    <Box as={SafeAreaView} flex={1} bg={`${renkKod}.bg`}>
      <Box flex={1} justifyContent="space-between">
        <ScrollView
          horizontal
          scrollEnabled
          scrollToOverflowEnabled
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={anlikScroll}>
          {data.load === true
            ? data.dataKeys.map((item, index) => (
                <Box
                  flex={1}
                  alignItems="center"
                  width={Math.round(Dimensions.get('window').width)}>
                  <Box
                    pt={10}
                    width="90%"
                    alignItems="center"
                    flexDirection="row"
                    justifyContent="space-between">
                    <BoxBg bg={`${renkKod}.light`} onPress={() => cikisYap()}>
                      <Random stroke={`${theme.colors[renkKod].dark}`} />
                    </BoxBg>
                    <Button>
                      <Text color={`${renkKod}.light`} fontSize={18} pr={4}>
                        Yabancı - Anadil
                      </Text>
                      <Detail stroke={`${theme.colors[renkKod].light}`} />
                    </Button>
                    <BoxBg
                      bg={`${renkKod}.light`}
                      onPress={() => navigation.navigate('Ekle')}>
                      <Add stroke={`${theme.colors[renkKod].dark}`} />
                    </BoxBg>
                  </Box>
                  {isWord ? (
                    <Button
                      width="90%"
                      flex={1}
                      justifyContent="center"
                      onPress={() => setWord(!isWord)}>
                      <Text
                        fontSize={36}
                        textAlign="center"
                        color={`${renkKod}.light`}>
                        {data.data[item].yabanci}
                      </Text>
                    </Button>
                  ) : (
                    <Button
                      width="90%"
                      flex={1}
                      justifyContent="center"
                      onPress={() => setWord(!isWord)}>
                      <Text
                        fontSize={36}
                        textAlign="center"
                        color={`${renkKod}.light`}>
                        {data.data[item].anlami}
                      </Text>
                    </Button>
                  )}
                  <Box width="90%" alignItems="center" flexDirection="column">
                    <Box>
                      <Text
                        fontWeight="bold"
                        fontSize={16}
                        color={`${renkKod}.light`}>
                        {index + 1} / {data.dataKeys.length}
                      </Text>
                    </Box>
                    <Box
                      width="90%"
                      py={20}
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between">
                      <BoxBg minWidth="10%" bg={`${renkKod}.light`}>
                        <Edit stroke={`${theme.colors[renkKod].dark}`} />
                      </BoxBg>
                      <BoxBg minWidth="55%" bg={`${renkKod}.light`}>
                        <Okey stroke={`${theme.colors[renkKod].dark}`} />
                      </BoxBg>
                      <BoxBg minWidth="10%" bg={`${renkKod}.light`}>
                        <Voice stroke={`${theme.colors[renkKod].dark}`} />
                      </BoxBg>
                    </Box>
                  </Box>
                </Box>
              ))
            : null}
        </ScrollView>
      </Box>
    </Box>
  );
}
export default KelimelerView;
