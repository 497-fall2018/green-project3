import React from 'react';
import { FlatList, StyleSheet,Text, View, Image, Button, TouchableOpacity, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import CodeInput from 'react-native-confirmation-code-input';
import TimerCountdown from 'react-native-timer-countdown';

class Home extends React.Component{

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
            title='Phone Number'
            checked={this.state.phoneNumberCheck}
            onPress={() => this.setState({phoneNumberCheck: !this.state.phoneNumberCheck})}
          />

          <CheckBox style = {styles.checkbox}
            title='Email'
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

          <TouchableOpacity style = {styles.customButton}
            title="Start Group"
            loading
            loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "#000000",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
            containerStyle={{ marginTop: 20 }}
            onPress={() => this.setState({startgroup: !this.state.startgroup})}
          >
            <Text style={styles.customButtonText}>START GROUP</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style= {styles.customButton}
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
            onPress={() => this.setState({joinGroup: !this.state.joinGroup})}>
            <Text style={styles.customButtonText}> JOIN GROUP </Text>
            </TouchableOpacity>

        </View>


      );
    }


}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
     paddingTop: 23,
     width: '80%',
     marginLeft: '10%'
  },
  checkbox: {
    margin: 100,
    height: 100,
    borderColor: '#7a42f4',
    borderWidth: 1,
    paddingTop: 100,
    backgroundColor: '#000',
    padding: 200,
  },
   customButton: {
     marginLeft: 'auto',
     marginRight: 'auto',
     marginTop: 30,
     paddingHorizontal: 50,
     paddingVertical:15,
     backgroundColor: 'purple',
     borderRadius: 100,
     shadowOpacity: 0.15,
      shadowRadius: 24,
      shadowColor: 'black',
      shadowOffset: { height: 0, width: 0 },
   },
   customButtonText: {
     color: 'white',
     fontWeight:'700',
     letterSpacing: 1,
   }
})

export default Home;
