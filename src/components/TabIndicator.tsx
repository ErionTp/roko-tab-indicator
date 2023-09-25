import React from 'react';
import { MainContext } from '../providers/MainContext';
import Tabs from './Tabs';
import type { Animated } from 'react-native';
import type { Theme } from 'src/types/Theme';
import type { TextStyle } from 'react-native';

type Props = {
  options: string[];
  onItemPress: (value: number) => void;
  scrollX: Animated.Value;
  theme?: Theme;
  fontStyle?: TextStyle;
  mode?: 'contained' | 'underline';
};
const TabIndicator: React.FC<Props> = (props: Props) => {
  // #region STATES
  // #endregion
  // #region CUSTOM HOOKS
  // #endregion
  // #region FUNCTIONS
  // #endregion
  // #region EFFECTS
  // #endregion
  // #region MEMBERS
  // #endregion
  return (
    <MainContext {...props}>
      <Tabs />
    </MainContext>
  );
};

export default TabIndicator;

TabIndicator.displayName = 'TabIndicator';
