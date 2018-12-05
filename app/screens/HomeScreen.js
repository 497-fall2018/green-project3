import React from 'react';
import { FlatList, StyleSheet,Text, View, Image, Button, TouchableOpacity, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import CodeInput from 'react-native-confirmation-code-input';
import TimerCountdown from 'react-native-timer-countdown';

class Share extends React.Component{

    constructor(props){
      super(props);
      this.state={
        phoneNumberCheck: true,
        emailCheck: true,
        linkedinCheck: true,
        facebookCheck: true,
        startgroup:false,
        joinGroup:false,
      }
    }



    render() {
      return (
        <View style = {styles.container}>
          <CheckBox style = {styles.checkbox}
            title='#'
            checked={this.state.phoneNumberCheck}
            onPress={() => this.setState({phoneNumberCheck: !this.state.phoneNumberCheck})}
          />

          <CheckBox style = {styles.checkbox}
            title='email'
            checked={this.state.emailCheck}
            onPress={() => this.setState({emailCheck: !this.state.emailCheck})}
          />

          <CheckBox style = {styles.checkbox}
            title='LinkedIn'
            checked={this.state.linkedinCheck}
            onPress={() => this.setState({linkedinCheck: !this.state.linkedinCheck})}
          />

          <CheckBox style = {styles.checkbox}
            title='Facebook'
            checked={this.state.facebookCheck}
            onPress={() => this.setState({facebookCheck: !this.state.facebookCheck})}
          />

          <Button style = {styles.checkbox}
            title="Start Group"
            loading
            loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 1)",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
            containerStyle={{ marginTop: 20 }}
            onPress={() => this.setState({startgroup: !this.state.startgroup})}
          />

          <Button
            title="Join Group"
            loading
            loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 1)",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
            containerStyle={{ marginTop: 20 }}
            onPress={() => this.setState({joinGroup: !this.state.joinGroup})}
          />
        </View>


      );
    }


}

const styles = StyleSheet.create({
  container: {
     paddingTop: 23
  },
  checkbox: {
    margin: 100,
    height: 100,
    borderColor: '#7a42f4',
    borderWidth: 1,
    paddingTop: 100
   }
})

export default Share;
