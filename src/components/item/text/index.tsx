import React, { FC } from 'react';
import useMainContext from '../../../features/providers/MainContextProvider';
import Layout from '../../../constants/layout/Layout';
import { Animated } from 'react-native';

type Props = {
  option: string;
  index: number; // Index of this tab
  totalTabs: number; // Total number of tabs
};
const TextItem: FC<Props> = ({ option, index, totalTabs }) => {
  // #region Members
  const { scrollX, theme, fontStyle } = useMainContext();
  // #endregion
  // #region States
  // #endregion
  // #region Custom hooks
  // #endregion
  // #region Functions

  const inputRange = [...Array(totalTabs).keys()].map(
    (i) => i * Layout.window.width
  );

  const color = scrollX.interpolate({
    inputRange,
    outputRange: inputRange.map((i) =>
      i === index * Layout.window.width ? theme.onPrimary : theme.onBackground
    ),
  });
  // #endregion
  // #region Effects
  // #endregion
  // #region Variables
  // #endregion
  return <Animated.Text style={[fontStyle, { color }]}>{option}</Animated.Text>;
};

export default TextItem;

TextItem.displayName = 'TextItem';
