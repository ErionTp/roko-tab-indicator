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
  const { options, scrollX, theme, mode } = useMainContext();
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
  // #region Variables
  const themedStyle = styles(theme, measurements);
  // #endregion
  return (
    <Animated.View
      style={[
        themedStyle.root,
        mode === 'underline'
          ? themedStyle.underlineRoot
          : themedStyle.containedRoot,
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
      backgroundColor: theme.primary,
    },
    containedRoot: {
      position: 'absolute',
      height: measurements[0]?.height,
      borderRadius: (measurements[0]?.height! + 16) / 2,
    },
    underlineRoot: {
      position: 'absolute',
      height: Spacing.petite,
      borderRadius: Spacing.tiny,
      bottom: 0,
    },
  });
