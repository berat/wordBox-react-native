import React from 'react';

import Button from './style/Button';

function BoxBg({children, ...props}) {
  return (
    <Button
      {...props}
      width={50}
      height={50}
      borderRadius="normal"
      alignItems="center"
      justifyContent="center">
      {children}
    </Button>
  );
}

export default BoxBg;
