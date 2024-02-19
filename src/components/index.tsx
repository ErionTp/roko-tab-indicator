import React from 'react';
import { tContext as Context } from 'src/features/domain/types/t.context';
import { MainContextProvider } from '../features/providers/MainContextProvider';
import TabList from './list.tab';

const TabIndicator = (props: Context): JSX.Element => {
  return (
    <MainContextProvider {...props}>
      {/* <ScrollView horizontal>
        {props.options.map((item, index) => (
          <Text style={props.fontStyle} key={index}>
            {item}
          </Text>
        ))}
      </ScrollView> */}
      <TabList />
    </MainContextProvider>
  );
};

export default TabIndicator;

TabIndicator.displayName = 'TabIndicator';
