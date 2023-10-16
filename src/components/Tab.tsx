import { StyleSheet, TouchableOpacity, type ViewProps } from 'react-native';
import React, { useMemo } from 'react';
import { Animated } from 'react-native';
import Layout from './../constants/layout/Layout';
import useMainContext from './../providers/MainContext';
import type { Theme } from 'src/types/Theme';

type Props = ViewProps & {
  option: string;
  onPress: () => void;
  index: number; // Index of this tab
  totalTabs: number; // Total number of tabs
};

const Tab = ({
  option,
  onPress,
  index,
  totalTabs,
  ...rest
}: Props): JSX.Element => {
  // #region HOOKS
  const { scrollX, theme, fontStyle } = useMainContext();
  // #endregion
  // #region MEMO
  const themedStyle = useMemo(() => styles(theme), [theme]);
  // #endregion
  // #region MEMBERS
  const inputRange = [...Array(totalTabs).keys()].map(
    (i) => i * Layout.window.width
  );

  const color = scrollX.interpolate({
    inputRange,
    outputRange: inputRange.map((i) =>
      i === index * Layout.window.width ? theme.onPrimary : theme.onBackground
    ),
  });

  const key = useMemo(() => `${index}-${scrollX}`, [index, scrollX]);
  // #endregion

  return (
    <TouchableOpacity
      key={key}
      activeOpacity={1}
      {...rest}
      style={themedStyle.root}
      onPress={onPress}
    >
      <Animated.Text style={[fontStyle, { color }]}>{option}</Animated.Text>
    </TouchableOpacity>
  );
};

export default Tab;

Tab.displayName = 'Tab';

const styles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.background,
    },
    title: { fontSize: 18 },
  });
