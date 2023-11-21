import React from 'react';
import { ContextType } from 'src/types/t.Context';
import TabList from './list.tab';
import { MainContextProvider } from '../providers/MainContextProvider';

const TabIndicator = (props: ContextType): JSX.Element => {
  return (
    <MainContextProvider {...props}>
      <TabList />
    </MainContextProvider>
  );
};

export default TabIndicator;

TabIndicator.displayName = 'TabIndicator';
