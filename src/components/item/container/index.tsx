import { StyleSheet } from 'react-native';
import React, { FC, PropsWithChildren } from 'react';
import Spacing from '../../../constants/layout/Spacing';
import { Pressable } from 'react-native';
import { PressableProps } from 'react-native';

type Props = PressableProps & {};
const ItemContainer: FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  return (
    <Pressable {...rest} style={styles.root}>
      {children}
    </Pressable>
  );
};

export default ItemContainer;

ItemContainer.displayName = 'ItemContainer';

const styles = StyleSheet.create({
  container: {},
  root: {
    padding: Spacing.compact,
    paddingVertical: Spacing.petite,
  },
});
