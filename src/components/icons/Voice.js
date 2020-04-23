import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgVoice(props) {
  return (
    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="">
      <Path
        d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19 6c1.92 1.591 3 3.75 3 6s-1.08 4.409-3 6"
        stroke="#222831"
        {...props}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgVoice;
