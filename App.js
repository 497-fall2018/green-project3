import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator,createAppContainer } from 'react-navigation';
import Share from './app/screens/Share.js';
import Search from './app/screens/Search.js';
import Profile from './app/screens/Profile.js';


const MainStack = createBottomTabNavigator(
  {
    Share:{ screen: Share },
    Search:{ screen: Search },
    Profile:{ screen: Profile }
  }
)
const MainStack1 = createAppContainer(MainStack);

export default class App extends React.Component {
  render() {
    return (

        <MainStack1/>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CC99FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
