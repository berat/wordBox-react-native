import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgAdd(props) {
  return (
    <Svg width="48" height="48" viewBox="0 0 36 36" fill="none" className="">
      <Path
        d="M18 12v12M12 18h12"
        stroke="#222831"
        strokeWidth={2}
        {...props}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgAdd;
