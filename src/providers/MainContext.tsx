import React, { createContext, useContext, useMemo } from 'react';
import { Animated, type TextStyle } from 'react-native';
import type { Theme } from 'src/types/Theme';

interface IContext {
  options: string[];
  onItemPress: (value: number) => void;
  scrollX: Animated.Value;
  theme: Theme;
  fontStyle?: TextStyle;
  mode?: 'contained' | 'underline';
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
  fontStyle: undefined,
  mode: 'contained',
});

export interface IMainContextProps {
  children: React.ReactNode;
  options: string[];
  onItemPress: (value: number) => void;
  scrollX: Animated.Value;
  theme?: Theme;
  fontStyle?: TextStyle;
  mode?: 'contained' | 'underline';
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
  fontStyle,
  mode = 'contained',
}: IMainContextProps) => {
  const memoValue = useMemo(
    () => ({ options, onItemPress, scrollX, theme, fontStyle, mode }),
    [onItemPress, options, scrollX, theme, fontStyle, mode]
  );

  return <Context.Provider value={memoValue}>{children}</Context.Provider>;
};

export default function useMainContext() {
  return useContext(Context);
}
