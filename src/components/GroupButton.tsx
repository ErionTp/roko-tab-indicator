import React from 'react';
import { MainContext } from './../providers/MainContext';
import Tabs from './Tabs';
import type { Animated } from 'react-native';
import type { Theme } from 'src/types/Theme';

type Props = {
  options: string[];
  onItemPress: (value: number) => void;
  scrollX: Animated.Value;
  theme?: Theme;
};
const GroupButton: React.FC<Props> = (props: Props) => {
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

export default GroupButton;

GroupButton.displayName = 'GroupButton';

// const styles = StyleSheet.create({ root: {} });
