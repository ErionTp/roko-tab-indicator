import { StyleSheet, Dimensions, Animated } from 'react-native';
import { LayoutRectangle } from 'react-native';
import React, { useMemo } from 'react';
import Spacing from './../constants/layout/Spacing';
import useMainContext from './../providers/MainContext';
import type { Theme } from 'src/types/Theme';

type Props = {
  measures: LayoutRectangle[];
};

const { width } = Dimensions.get('screen');

const Indicator = ({ measures }: Props): JSX.Element => {
  // #region HOOKS
  const { options, scrollX, theme, mode } = useMainContext();
  // #endregion
  // #region MEMO
  const themedStyle = useMemo(() => styles(theme, measures), [theme, measures]);
  // #endregion
  // #region MEMBERS
  const additionalSpacing = () => {
    switch (mode) {
      case 'contained':
        return {
          width: Spacing.regular,
          x: Spacing.compact,
          y: Spacing.petite,
        };
      default:
        return {
          width: 0,
          x: 0,
          y: -measures[0]?.height!,
        };
    }
  };
  const inputRange = options.map((_, i) => i * width);
  const outputWidthRange = measures.map(
    (measure) => measure.width + additionalSpacing().width
  );
  const outputXRange = measures.map(
    (measure) => measure.x - additionalSpacing().x
  );
  const outputYRange = measures.map(
    (measure) => measure.y - additionalSpacing().y
  );
  // #endregion
  // #region ANIMATION
  const indicatorWidth = scrollX.interpolate({
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

  return (
    <Animated.View
      style={[
        themedStyle.root,
        mode === 'contained'
          ? themedStyle.containedRoot
          : themedStyle.underlineRoot,
        {
          width: indicatorWidth,
          transform: [{ translateX }, { translateY }],
        },
      ]}
    />
  );
};

export default Indicator;

Indicator.displayName = 'Indicator';

const styles = (theme: Theme, measures: LayoutRectangle[]) =>
  StyleSheet.create({
    root: { backgroundColor: theme.primary },
    containedRoot: {
      position: 'absolute',
      height: measures[0]?.height! + Spacing.medium,
      borderRadius: (measures[0]?.height! + 16) / 2,
    },
    underlineRoot: {
      position: 'absolute',
      height: Spacing.petite,
      borderRadius: Spacing.tiny,
    },
  });
