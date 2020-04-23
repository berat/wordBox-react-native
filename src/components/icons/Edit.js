import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgEdit(props) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className=""
      {...props}>
      <Path
        d="M17 3a2.827 2.827 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"
        stroke="#222831"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgEdit;
