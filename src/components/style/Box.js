import {View} from 'react-native';
import styled from 'styled-components';
import {
  compose,
  color,
  size,
  space,
  flexbox,
  border,
  borderRadius,
} from 'styled-system';

const Box = styled(View)(
  compose(color, size, flexbox, border, borderRadius, space),
);

export default Box;
