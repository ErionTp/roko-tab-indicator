import { Animated, TextStyle } from 'react-native';
import { Theme } from './t.Theme';

export type ContextType = {
  options: string[];
  onItemPress: (value: number) => void;
  scrollX: Animated.Value;
  theme: Theme;
  fontStyle?: TextStyle;
  mode?: 'contained' | 'underline';
};
