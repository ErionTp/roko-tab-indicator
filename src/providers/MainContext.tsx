import React, { createContext, useContext, useMemo } from 'react';
import { Animated } from 'react-native';
import type { Theme } from 'src/types/Theme';

interface IContext {
  options: string[];
  onItemPress: (value: number) => void;
  scrollX: Animated.Value;
  theme: Theme;
}

const Context = createContext<IContext>({
  options: [],
  onItemPress: () => {
    console.warn('onItemPress not implemented');
  },
  scrollX: new Animated.Value(0),
  theme: {
    primary: 'black',
    onPrimary: '',
    background: '',
    onBackground: '',
  },
});

export interface IMainContextProps {
  children: React.ReactNode;
  options: string[];
  onItemPress: (value: number) => void;
  scrollX: Animated.Value;
  theme?: Theme;
}

export const MainContext = ({
  children,
  options,
  onItemPress,
  scrollX,
  theme = {
    primary: 'black',
    onPrimary: 'white',
    background: 'transparent',
    onBackground: 'black',
  },
}: IMainContextProps) => {
  const memoValue = useMemo(
    () => ({ options, onItemPress, scrollX, theme }),
    [onItemPress, options, scrollX, theme]
  );

  return <Context.Provider value={memoValue}>{children}</Context.Provider>;
};

export default function useMainContext() {
  return useContext(Context);
}
