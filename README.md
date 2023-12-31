# roko-group-buttons

Simple animated group button

## Installation

```sh
npm install roko-tab-indicator
```

## Usage

```js
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import DummyList from './data/DummyList';
import { TabIndicator } from 'roko-tab-indicator';

const options = ['Kroni', 'eshte', 'djale i mire'];

const { width, height } = Dimensions.get('screen');

const App = ({}) => {
  // #region REFERENCES
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef<Animated.FlatList<string> | null>(null);
  // #endregion
  // #region FUNCTIONS
  const onItemPress = useCallback((index) => {
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
    padding: 16,
    position: 'absolute',
    top: 80,
    start: 16,
  },
  backDrop: {
    backgroundColor: 'rgba(0,0,0, 0.3)',
    ...StyleSheet.absoluteFillObject,
  },
});

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
