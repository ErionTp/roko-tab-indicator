import { Animated, TextStyle } from 'react-native';
import { tTheme as Theme } from './t.theme';

export type tContext = {
  options: string[];
  onItemPress: (value: number) => void;
  scrollX: Animated.Value;
  theme: Theme;
  fontStyle?: TextStyle;
  mode?: 'contained' | 'underline';
};
