import {TextInput} from 'react-native';
import styled from 'styled-components';
import {
  compose,
  color,
  size,
  typography,
  space,
  flexbox,
  border,
  borderRadius,
} from 'styled-system';

const Input = styled(TextInput).attrs((props) => ({
  placeholderTextColor: '#999',
}))(compose(color, size, flexbox, typography, border, borderRadius, space));

export default Input;
