import { Dimensions, StyleSheet, View } from 'react-native';
import { LayoutRectangle } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import Tab from './Tab';
import Indicator from './Indicator';
import Spacing from './../constants/layout/Spacing';
import useMainContext from '../providers/MainContextProvider';
import { ScrollView } from 'react-native';

const { width } = Dimensions.get('screen');

const Tabs = (): JSX.Element => {
  // #region References
  const scrollRef = useRef<ScrollView | null>(null);
  // #endregion
  // #region HOOKS
  const { options, onItemPress } = useMainContext();
  // #endregion
  // #region STATES
  const [measurements, setMeasurements] = useState<LayoutRectangle[]>([]);
  // #endregion
  // #region REFERENCES
  const measurementsRef = useRef<LayoutRectangle[]>(
    new Array(options.length).fill(null)
  );
  // #endregion
  // #region FUNCTIONS
  const handleMeasure = useCallback((value: LayoutRectangle, index: number) => {
    measurementsRef.current[index] = value;

    if (measurementsRef.current.every((measurement) => measurement !== null)) {
      setMeasurements([...measurementsRef.current]);
    }
  }, []);

  const onTabItemPress = (index: number) => {
    if (!scrollRef.current) return;
    const reference = scrollRef.current;

    const itemLayout = measurements[index];

    if (itemLayout) {
      const itemOffset = measurements
        .slice(0, index)
        .reduce((acc, layout) => acc + layout.width, 0);
      const scrollTo = itemOffset + itemLayout.width / 2 - width / 2;
      reference.scrollTo({ x: scrollTo, animated: true });
    }

    onItemPress(index);
  };
  // #endregion
  return (
    <View style={styles.root}>
      <ScrollView
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: Spacing.regular,
          padding: Spacing.regular,
        }}
        style={styles.container}
        horizontal
      >
        {measurements.length === options.length && (
          <Indicator {...{ measures: measurements }} />
        )}
        {options.map((option, index) => {
          return (
            <Tab
              key={index}
              {...{
                option,
                onPress: () => onTabItemPress(index),
                index,
                totalTabs: options.length,
              }}
              onLayout={(e) => {
                if (e.nativeEvent.layout)
                  handleMeasure(e.nativeEvent.layout, index);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Tabs;

Tabs.displayName = 'Tabs';

const styles = StyleSheet.create({
  root: {},
  container: {
    zIndex: 1,
  },
});
