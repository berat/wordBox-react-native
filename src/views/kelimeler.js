import React from 'react';
import {SafeAreaView} from 'react-native';

import Box from '../components/style/Box';
import Text from '../components/style/Text';
import Button from '../components/style/Button';
import {Random, Add, Detail, Edit, Okey, Voice} from '../components/icons';

import BoxBg from '../components/boxBg';

function KelimelerView({navigation}) {
  const [isWord, setWord] = React.useState('false');

  return (
    <Box
      as={SafeAreaView}
      flex={1}
      bg="#FF2E63"
      alignItems="center"
      flexDirection="column"
      justifyContent="space-between">
      <Box
        pt={10}
        width="90%"
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between">
        <BoxBg bg="0.light">
          <Random />
        </BoxBg>
        <Button>
          <Text fontSize={18} pr={4}>
            Yabancı - Anadil
          </Text>
          <Detail />
        </Button>
        <BoxBg bg="0.light" onPress={() => navigation.navigate('Ekle')}>
          <Add />
        </BoxBg>
      </Box>
      {isWord ? (
        <Button
          width="90%"
          flex={1}
          justifyContent="center"
          onPress={() => setWord(!isWord)}>
          <Text fontSize={36} textAlign="center">
            Blanket
          </Text>
        </Button>
      ) : (
        <Button
          width="90%"
          flex={1}
          justifyContent="center"
          onPress={() => setWord(!isWord)}>
          <Text fontSize={36} textAlign="center">
            Battaniye
          </Text>
        </Button>
      )}
      <Box width="90%" alignItems="center" flexDirection="column">
        <Box>
          <Text fontWeight="bold" fontSize={16}>
            4 / 240
          </Text>
        </Box>
        <Box
          width="90%"
          py={20}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <BoxBg minWidth="10%" bg="0.light">
            <Edit />
          </BoxBg>
          <BoxBg minWidth="55%" bg="0.light">
            <Okey stroke="black" />
          </BoxBg>
          <BoxBg minWidth="10%" bg="0.light">
            <Voice />
          </BoxBg>
        </Box>
      </Box>
    </Box>
  );
}
export default KelimelerView;
