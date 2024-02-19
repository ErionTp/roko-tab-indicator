import React, { ReactNode, createContext, useContext, useMemo } from 'react';
import { Animated } from 'react-native';
import { tContext } from 'src/features/domain/types/t.context';

const Context = createContext<tContext>({
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

export type IMainContextProviderProps = tContext & {
  children: ReactNode;
};

export const MainContextProvider = (props: IMainContextProviderProps) => {
  // #region Props
  const { children, options, onItemPress, scrollX, theme, fontStyle, mode } =
    props;
  // #endregion
  // #region Variables
  const memoValue: tContext = useMemo(
    () => ({
      options,
      onItemPress,
      scrollX,
      theme,
      fontStyle,
      mode,
    }),
    [options, onItemPress, scrollX, theme, fontStyle, mode]
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
