import React from 'react';
import { View, TextInput } from 'react-native';
import { Card, ListItem, Button, Icon, Input, Text } from 'react-native-elements';
import firebase from '../../config/config.js';

class EnterCode extends React.Component{

    constructor(props){
        super(props);
        this.state={
          code:''
        }
    }

    updateCode(text){
      var that = this
      this.setState({code:text})
      setTimeout(function(){
        if (that.state.code.length == 4){
          that.joinGroup(that.state.code)
        }
      },100)

    }

    joinGroup(groupcode){
      var that = this;

      firebase.database().ref('Groups/'+groupcode).once('value')
      .then((snapshot) => {
        console.warn(snapshot.val())
        const exists = (snapshot.val() != null);
        if (exists)  {
          this.setState({
            joinGroup:true,
            groupcode:groupcode,
            groupusers:[snapshot.val()]
        });
        console.warn(this.state.groupusers)
        }
      })
      setTimeout(function(){that.props.navigation.navigate('Group',{groupcode:that.state.code})}, 500);
    }

    render(){
      return(
        <View  style={{backgroundColor: '#CC99FF'}}>
          <Text style={{fontWeight: 'bold', marginTop:200, textAlign: 'center', fontSize: 32}}>
            Enter 4-digit Code to search for contacts</Text>
          <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.updateCode(text)}
              value={this.state.text}
            />
        </View>
      )
    }

}

export default EnterCode;
