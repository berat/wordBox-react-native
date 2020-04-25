import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgBack(props) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="">
      <Path
        d="M19 12H5M12 19l-7-7 7-7"
        stroke="#000"
        {...props}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgBack;
