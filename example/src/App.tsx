import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import DummyList from './data/DummyList';
import { TabIndicator } from '../../src/index';
const options = [
  'Kroni',
  'eshte',
  'djale i mire',
  'dhe babi me mamin',
  'e do shume',
];

const { width, height } = Dimensions.get('screen');

const App = ({}) => {
  // #region REFERENCES
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef<Animated.FlatList<string> | null>(null);
  // #endregion
  // #region FUNCTIONS
  const onItemPress = useCallback((index: number) => {
    listRef.current?.scrollToOffset({ offset: index * width, animated: true });
  }, []);
  // #endregion
  return (
    <View style={styles.root}>
      <Animated.FlatList
        ref={listRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        pagingEnabled
        horizontal
        data={DummyList}
        renderItem={({ item }) => (
          <View style={{ height, width }}>
            <Image
              source={{ uri: item }}
              style={{ ...StyleSheet.absoluteFillObject }}
            />
            <View style={styles.backDrop} />
          </View>
        )}
      />
      <View style={styles.tabContainer}>
        <TabIndicator
          {...{
            options,
            onItemPress,
            scrollX,
            theme: {
              primary: 'rgba(0,0,0,0.8)',
              onPrimary: 'white',
              background: 'transparent',
              onBackground: 'black',
            },
            fontStyle: { fontSize: 18, textTransform: 'uppercase' },
            mode: 'underline',
          }}
        />
      </View>
    </View>
  );
};

export default App;

App.displayName = 'App';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    position: 'absolute',
    top: 80,
  },
  backDrop: {
    backgroundColor: 'rgba(0,0,0, 0.3)',
    ...StyleSheet.absoluteFillObject,
  },
});
