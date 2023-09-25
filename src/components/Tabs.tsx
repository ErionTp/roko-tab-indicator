import { StyleSheet, View, type LayoutRectangle } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import Tab from './Tab';
import Indicator from './Indicator';
import Spacing from './../constants/layout/Spacing';
import useMainContext from './../providers/MainContext';

type Props = {};
const Tabs: React.FC<Props> = () => {
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
  // #endregion
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {options.map((option, index) => {
          return (
            <Tab
              key={index}
              {...{
                option,
                onPress: () => onItemPress(index),
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
      </View>

      {measurements.length === options.length && (
        <Indicator {...{ measures: measurements }} />
      )}
    </View>
  );
};

export default Tabs;

Tabs.displayName = 'Tabs';

const styles = StyleSheet.create({
  root: {},
  container: {
    paddingHorizontal: Spacing.regular,
    gap: Spacing.regular,
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 1,
  },
});
