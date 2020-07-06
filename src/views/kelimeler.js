import React from 'react';
import {
  SafeAreaView,
  AsyncStorage,
  ScrollView,
  Dimensions,
  BackHandler,
  Alert,
  StatusBar,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import firebase from 'firebase';
import {veritabani} from '../utils/api';
import Box from '../components/style/Box';
import Text from '../components/style/Text';
import Button from '../components/style/Button';
import {Random, Add, Detail, Edit, Okey, Voice} from '../components/icons';
import BoxBg from '../components/boxBg';
import theme from '../utils/theme';

function KelimelerView({navigation}) {
  const [isWord, setWord] = React.useState(true);
  const [uid, setUID] = React.useState();
  const [renkKod, setRenkKod] = React.useState(Math.floor(Math.random() * 9));
  const [kaydir, setKaydir] = React.useState('');
  const [basButon, setBasButon] = React.useState(false);
  const [sayfaGecis, setSayfaGecis] = React.useState('');
  const [dilStatus, setDilStatus] = React.useState(true);
  const [count, setCount] = React.useState();
  const [data, setData] = React.useState({
    load: false,
    dataKeys: null,
    data: null,
  });

  const renkDegistir = (e) => {
    if (e.contentOffset?.x !== sayfaGecis) {
      setRenkKod(Math.floor(Math.random() * 9));
    }
  };
  const tersle = () => setWord(!isWord);
  const falseYap = () => setWord(false);
  const trueYap = () => setWord(true);

  const basaDon = async () => {
    await kaydir.scrollResponderScrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
    setBasButon(false);
  };

  const loginMi = async () => {
    try {
      AsyncStorage.getItem('isLogin').then((e) => {
        if (e) {
          setUID(e);
          firebase
            .database()
            .ref(`kelimeler/${JSON.parse(e).userid}`)
            .on('value', (snapshot) => {
              let data1 = snapshot.val();
              if (data1 == null) {
                setData({
                  load: true,
                  dataKeys: [],
                  data: {},
                });
                return;
              }
              const randomIndex = (arr) => (Math.random() * arr.length) >> 0;
              const getRandom = (keys = [], times = 0, colors = []) => {
                if (!keys.length || times <= 0) {
                  return colors;
                }
                const randIndex = randomIndex(keys);
                colors.push(keys[randIndex]);
                keys.splice(randIndex, 1);
                times--;
                return getRandom(keys, times, colors);
              };
              setCount(Object.keys(data1).length);
              console.log(data1);
              setData({
                load: true,
                dataKeys: getRandom(
                  Object.keys(data1),
                  Object.keys(data1).length,
                ),
                data: data1,
              });
              basaDon();
            });
        } else {
          navigation.navigate('Login');
        }
      });
    } catch (pass) {
      console.log(pass);
    }
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

  const ezberle = (kelimeID) => {
    firebase
      .database()
      .ref(`kelimeler/${JSON.parse(uid).userid}/${kelimeID}`)
      .update({
        ezber: true,
      });
    setCount(count - 1);
  };

  React.useState(() => {
    loginMi();
    const backAction = () => {
      Alert.alert('Bekle!', 'Çıkmak istediğine emin misin?', [
        {
          text: 'İptal',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Evet', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const getDondurButton = (e) => {
    let screenSize = e.layoutMeasurement.width;
    let x = e.contentOffset.x;
    if (
      (data.dataKeys.filter((item) => data.data[item].ezber === false).length -
        1) *
        screenSize ===
      x
    ) {
      setBasButon(true);
    } else {
      setBasButon(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle(
        theme.colors[renkKod].light === '#F1F1F1'
          ? 'light-content'
          : 'dark-content',
      );
    }, [renkKod]),
  );
  return (
    <Box as={SafeAreaView} flex={1} bg={`${renkKod}.bg`}>
      <Box flex={1} justifyContent="space-between">
        {data.load ? (
          data.dataKeys.filter((item) => data.data[item].ezber === false)
            .length !== 0 ? (
            <ScrollView
              horizontal
              scrollToOverflowEnabled
              pagingEnabled
              ref={(ref) => setKaydir(ref)}
              onMomentumScrollEnd={(e) => {
                renkDegistir(e.nativeEvent);
                setSayfaGecis(e.nativeEvent.contentOffset.x);
              }}
              onScroll={(e) => {
                console.log(this);
              }}
              onScrollBeginDrag={(e) => (dilStatus ? trueYap() : falseYap())}
              // onScrollEndDrag={(e) => renkDegistir(e.nativeEvent)}
              showsHorizontalScrollIndicator={false}>
              {data.dataKeys
                .filter((item) => data.data[item].ezber === false)
                .map((item, index) => (
                  <Box
                    flex={1}
                    key={index}
                    alignItems="center"
                    width={Math.round(Dimensions.get('window').width)}>
                    <Box
                      pt={10}
                      width="90%"
                      alignItems="center"
                      flexDirection="row"
                      justifyContent="space-between">
                      <BoxBg bg={`${renkKod}.light`} onPress={() => loginMi()}>
                        <Random stroke={`${theme.colors[renkKod].dark}`} />
                      </BoxBg>
                      <Button
                        onPress={() => {
                          setDilStatus(!dilStatus);
                          dilStatus ? falseYap() : trueYap();
                        }}>
                        <Text color={`${renkKod}.light`} fontSize={18} pr={4}>
                          {dilStatus ? 'Yabancı - Anadil' : 'Anadil - Yabanci'}
                        </Text>
                        <Detail stroke={`${theme.colors[renkKod].light}`} />
                      </Button>
                      <BoxBg
                        bg={`${renkKod}.light`}
                        onPress={() => navigation.navigate('Ekle')}>
                        <Add stroke={`${theme.colors[renkKod].dark}`} />
                      </BoxBg>
                    </Box>
                    <Button
                      width="90%"
                      flex={1}
                      justifyContent="center"
                      onPress={() => tersle()}>
                      <Text
                        fontSize={36}
                        textAlign="center"
                        color={`${renkKod}.light`}>
                        {dilStatus
                          ? isWord
                            ? data.data[item].yabanci
                            : data.data[item].anlami
                          : isWord
                          ? data.data[item].yabanci
                          : data.data[item].anlami}
                      </Text>
                    </Button>
                    <Box width="90%" alignItems="center" flexDirection="column">
                      <Box alignItems="center">
                        <Text
                          fontWeight="bold"
                          fontSize={16}
                          color={`${renkKod}.light`}>
                          {index + 1} /{' '}
                          {
                            data.dataKeys.filter(
                              (j) => data.data[j].ezber === false,
                            ).length
                          }
                        </Text>
                        {basButon && (
                          <Button
                            minWidth="55%"
                            height={50}
                            borderRadius="normal"
                            bg={`${renkKod}.light`}
                            mt={20}
                            onPress={() => basaDon()}>
                            <Text fontSize={16} color={`${renkKod}.dark`}>
                              Başa Dön
                            </Text>
                          </Button>
                        )}
                      </Box>
                      <Box
                        width="90%"
                        py={20}
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between">
                        <BoxBg
                          minWidth="10%"
                          bg={`${renkKod}.light`}
                          onPress={() =>
                            navigation.navigate('Ekle', {
                              yabanciKelime: data.data[item].yabanci,
                              kelimeAnlami: data.data[item].anlami,
                              kelimeID: item,
                            })
                          }>
                          <Edit stroke={`${theme.colors[renkKod].dark}`} />
                        </BoxBg>
                        <BoxBg
                          minWidth="55%"
                          bg={`${renkKod}.light`}
                          onPress={() => {
                            ezberle(item);
                          }}>
                          <Okey stroke={`${theme.colors[renkKod].dark}`} />
                        </BoxBg>
                        <BoxBg minWidth="10%" bg={`${renkKod}.light`}>
                          <Voice stroke={`${theme.colors[renkKod].dark}`} />
                        </BoxBg>
                      </Box>
                    </Box>
                  </Box>
                ))}
            </ScrollView>
          ) : (
            <Box
              flex={1}
              alignItems="center"
              justifyContent="center"
              flexDirection="column">
              <Text fontSize={36} textAlign="center" color={`${renkKod}.light`}>
                Kelime Kalmadı!
              </Text>
              <BoxBg
                mt={20}
                minWidth="55%"
                bg={`${renkKod}.light`}
                onPress={() => navigation.navigate('Ekle')}>
                <Text fontSize={16} color={`${renkKod}.dark`}>
                  Yeni Kelime Ekle!
                </Text>
              </BoxBg>
            </Box>
          )
        ) : (
          <Box
            flex={1}
            alignItems="center"
            justifyContent="center"
            flexDirection="column">
            <Text fontSize={24} color={`${renkKod}.light`}>
              Yükleniyor...
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
export default KelimelerView;
