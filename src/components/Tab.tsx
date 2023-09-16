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

const Tab = ({ option, onPress, index, totalTabs, ...rest }: Props) => {
  // #region HOOKS
  const { options, scrollX, theme } = useMainContext();
  // #endregion
  // #region MEMO
  const themedStyle = useMemo(() => styles(theme), [theme]);
  // #endregion
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

  return (
    <TouchableOpacity
      key={key}
      activeOpacity={1}
      {...rest}
      style={themedStyle.root}
      onPress={onPress}
    >
      <Animated.Text style={{ color, fontSize: 84 / options.length }}>
        {option}
      </Animated.Text>
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
