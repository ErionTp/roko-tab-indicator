import { LayoutRectangle, StyleSheet, View } from 'react-native';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import useMainContext from '../../features/providers/MainContextProvider';
import TextItem from '../item/text';
import ItemContainer from '../item/container';
import IndicatorItem from '../item/indicator';
import Layout from '../../constants/layout/Layout';
import Spacing from '../../constants/layout/Spacing';

type Props = {};

const TabList: FC<Props> = ({}) => {
  // #region References
  const scrollRef = useRef<ScrollView | null>(null);
  // #endregion
  // #region Members
  const { options, onItemPress, scrollX } = useMainContext();
  // #endregion
  // #region References
  const measurementsRef = useRef<LayoutRectangle[]>(
    new Array(options.length).fill(null)
  );
  // #endregion
  // #region States
  const [measurements, setMeasurements] = useState<LayoutRectangle[]>([]);
  // #endregion
  // #region Effects
  useEffect(() => {
    const listenerId = scrollX.addListener(({ value }) => {
      const index = value / Layout.window.width;
      if (!scrollRef.current) return;
      const reference = scrollRef.current;
      const itemLayout = measurements[index];
      if (itemLayout) {
        const itemOffset = measurements
          .slice(0, index)
          .reduce((acc, layout) => acc + layout.width, 0);
        const scrollTo =
          itemOffset + itemLayout.width / 2 - Layout.window.width / 2;
        reference.scrollTo({ x: scrollTo, animated: true });
      }
    });

    return () => {
      scrollX.removeListener(listenerId);
    };
  }, [scrollX, measurements]);

  // #endregion
  // #region Functions
  const handleMeasure = useCallback(
    (value: LayoutRectangle, index: number) => {
      measurementsRef.current[index] = value;

      if (
        measurementsRef.current.every((measurement) => measurement !== null)
      ) {
        setMeasurements([...measurementsRef.current]);
      }
    },
    [setMeasurements]
  );

  const onTabItemPress = (index: number) => onItemPress(index);

  // #endregion
  return (
    <View style={styles.root}>
      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: Spacing.regular }}
      >
        {measurements.length === options.length && measurements.length > 0 && (
          <IndicatorItem {...{ measurements }} />
        )}
        {options?.map((option, index) => (
          <ItemContainer
            key={index}
            onPress={() => onTabItemPress(index)}
            onLayout={(e) => handleMeasure(e.nativeEvent.layout, index)}
          >
            <TextItem
              key={index}
              {...{ option, index, totalTabs: options.length }}
            />
          </ItemContainer>
        ))}
      </ScrollView>
    </View>
  );
};

export default TabList;

TabList.displayName = 'TabList';

const styles = StyleSheet.create({ root: {} });
