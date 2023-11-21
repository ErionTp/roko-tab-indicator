import { Animated, LayoutRectangle, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import useMainContext from '../../../providers/MainContextProvider';
import { Theme } from 'src/types/t.Theme';
import Layout from '../../../constants/layout/Layout';
import Spacing from '../../../constants/layout/Spacing';

type Props = {
  measurements: LayoutRectangle[];
};
const IndicatorItem: FC<Props> = ({ measurements }) => {
  // #region Members
  const { options, scrollX, theme } = useMainContext();

  const inputRange = options.map((_, i) => i * Layout.window.width);
  const outputWidthRange = measurements.map((measure) => measure.width);
  const outputXRange = measurements.map((measure) => measure.x);
  const outputYRange = measurements.map((measure) => measure.y);
  // #endregion
  // #region Animations
  const width = scrollX.interpolate({
    inputRange,
    outputRange: outputWidthRange,
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: outputXRange,
  });
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: outputYRange,
    extrapolate: 'clamp',
  });
  // #endregion
  // #region Functions
  // #endregion
  // #region Effects
  // #endregion
  // #region Variables
  const themedStyle = styles(theme, measurements);

  // #endregion
  return (
    <Animated.View
      style={[
        themedStyle.root,
        { width, transform: [{ translateX }, { translateY }] },
      ]}
    />
  );
};

export default IndicatorItem;

IndicatorItem.displayName = 'IndicatorItem';

const styles = (theme: Theme, measurements: LayoutRectangle[]) =>
  StyleSheet.create({
    root: {
      position: 'absolute',
      backgroundColor: theme.primary,
      height: measurements[0]?.height!,
      borderRadius: Spacing.regular,
    },
  });
