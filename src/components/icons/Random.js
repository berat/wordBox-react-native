import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function SvgRandom(props) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 17 17"
      fill="none"
      className=""
      {...props}>
      <G
        clipPath="url(#random_svg__clip0)"
        stroke="#222831"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M12.042.708l2.833 2.834-2.833 2.833" />
        <Path d="M2.125 7.792V6.375a2.833 2.833 0 012.833-2.833h9.917M4.958 16.292l-2.833-2.834 2.833-2.833" />
        <Path d="M14.875 9.208v1.417a2.833 2.833 0 01-2.833 2.833H2.125" />
      </G>
      <Defs>
        <ClipPath id="random_svg__clip0">
          <Path fill="#fff" d="M0 0h17v17H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgRandom;
