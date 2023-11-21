import React, { ReactNode, createContext, useContext, useMemo } from 'react';
import { Animated } from 'react-native';
import { ContextType } from 'src/types/t.Context';

const Context = createContext<ContextType>({
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

export type IMainContextProviderProps = ContextType & {
  children: ReactNode;
};

export const MainContextProvider = (props: IMainContextProviderProps) => {
  // #region Props
  const { children, options, onItemPress, scrollX, theme, fontStyle } = props;
  // #endregion
  // #region Variables
  const memoValue: ContextType = useMemo(
    () => ({
      options,
      onItemPress,
      scrollX,
      theme,
      fontStyle,
    }),
    [options, onItemPress, scrollX, theme, fontStyle]
  );
  // #endregion

  return <Context.Provider value={memoValue}>{children}</Context.Provider>;
};

export default function useMainContext() {
  const context = useContext(Context);

  if (!context)
    throw new Error('useContext must be used under MainContextProvider');
  return context;
}
