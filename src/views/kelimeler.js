import React from 'react';
import {SafeAreaView} from 'react-native';

import Box from '../components/style/Box';
import Text from '../components/style/Text';

function KelimelerView() {
  return (
    <Box
      as={SafeAreaView}
      flex={1}
      alignItems="center"
      flexDirection="column"
      justifyContent="space-between">
      <Box>
        <Text>fwq</Text>
      </Box>
      <Box>
        <Text>fwq</Text>
      </Box>
      <Box>
        <Text>fwq</Text>
      </Box>
    </Box>
  );
}
export default KelimelerView;
