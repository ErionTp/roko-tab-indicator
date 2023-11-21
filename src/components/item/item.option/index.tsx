import { StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Spacing from '../../../constants/layout/Spacing';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  index: number;
};
const OptionItem: FC<Props> = ({ ...rest }) => {
  return (
    <TouchableOpacity activeOpacity={1} {...rest} style={styles.root}>
      {rest.children}
    </TouchableOpacity>
  );
};

export default OptionItem;

OptionItem.displayName = 'OptionItem';

const styles = StyleSheet.create({
  container: {},
  root: {
    paddingHorizontal: Spacing.compact,
    paddingVertical: Spacing.tiny,
  },
});
