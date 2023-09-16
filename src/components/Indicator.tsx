import {
  StyleSheet,
  type LayoutRectangle,
  Dimensions,
  Animated,
} from 'react-native';
import React, { useMemo } from 'react';
import Spacing from './../constants/layout/Spacing';
import useMainContext from './../providers/MainContext';
import type { Theme } from 'src/types/Theme';

type Props = {
  measures: LayoutRectangle[];
};

const { width } = Dimensions.get('screen');

const Indicator: React.FC<Props> = ({ measures }) => {
  // #region HOOKS
  const { options, scrollX, theme } = useMainContext();
  // #endregion
  // #region MEMO
  const themedStyle = useMemo(() => styles(theme), [theme]);
  // #endregion
  const inputRange = options.map((_, i) => i * width);
  const outputWidthRange = measures.map(
    (measure) => measure.width + Spacing.large
  );
  const outputXRange = measures.map((measure) => measure.x - Spacing.compact);
  const outputYRange = measures.map((measure) => measure.y - Spacing.petite);

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

  return (
    <Animated.View
      style={[
        themedStyle.root,
        {
          height: measures[0]?.height! + Spacing.medium,
          borderRadius: (measures[0]?.height! + 16) / 2,
          width: indicatorWidth,
          transform: [{ translateX }, { translateY }],
        },
      ]}
    />
  );
};

export default Indicator;

Indicator.displayName = 'Indicator';

const styles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      position: 'absolute',
      backgroundColor: theme.primary,
    },
  });
