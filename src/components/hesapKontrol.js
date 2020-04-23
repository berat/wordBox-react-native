import React from 'react';

import Box from './style/Box';
import Text from './style/Text';
import Button from './style/Button';

export function HesapKontrol({children, ...props}) {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      mt={20}
      {...props}>
      {children}
    </Box>
  );
}

export function HesapKontrolText({children, ...props}) {
  return (
    <Text color="#222831" fontSize={16} pr={3} {...props}>
      {children}
    </Text>
  );
}

export function HesapKontrolButton({children, ...props}) {
  return (
    <Button {...props}>
      <Text fontWeight="bold">{children}</Text>
    </Button>
  );
}
