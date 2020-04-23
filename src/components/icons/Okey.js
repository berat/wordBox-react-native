import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgOkey(props) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 22 22"
      fill="none"
      className=""
      {...props}>
      <Path
        d="M6 21H3a2 2 0 01-2-2v-7a2 2 0 012-2h3m7-2V4a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H13z"
        stroke="#F1F1F1"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgOkey;
