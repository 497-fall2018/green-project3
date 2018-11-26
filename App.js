import React from 'react';
import { StyleSheet, Text, View,TouchableHighlight,TextInput  } from 'react-native';
import { createBottomTabNavigator,createAppContainer } from 'react-navigation';
import NameTag from './app/screens/NameTag.js';
import Friends from './app/screens/Friends.js';
import Profile from './app/screens/Profile.js';


const MainStack = createBottomTabNavigator(
  {
    NameTag:{ screen: NameTag },
    Friends:{ screen: Friends },
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
