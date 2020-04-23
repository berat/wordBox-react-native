import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgDetail(props) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className=""
      {...props}>
      <Path
        d="M6 9l6 6 6-6"
        stroke="#222831"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgDetail;
