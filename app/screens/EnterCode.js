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

    componentDidMount(){
      const userId = this.props.navigation.getParam('userId', 'failed');
      console.log("userId:", userId);
      this.setState({userId: userId})
    }

    updateCode(text){
      var that = this
      this.setState({code:text.toLowerCase()})
      setTimeout(function(){
        if (that.state.code.length == 4){
          that.joinGroup(that.state.code)
        }
      },100)

    }

    joinGroup(groupcode){
      
      var that = this;
      //firebase.database().ref('Groups/' + groupcode).set([that.state.userId]);
      firebase.database().ref('Groups/'+groupcode).once('value')
      .then((snapshot) => {
        const exists = (snapshot.val() != null);
        if (exists)  {
          userList = snapshot.val();
          console.log("userList:",userList);
          userList.push(that.state.userId);
          newUserList = Array.from(new Set(userList));
          console.log("newUserList::",newUserList);
          firebase.database().ref('Groups/' + groupcode).update(userList);
          this.setState({
            joinGroup:true,
            groupcode:groupcode,
            groupusers:snapshot.val()
          });
          

        }
      })

      setTimeout(function(){that.props.navigation.navigate('Group',{groupcode:that.state.code, groupusers:that.state.groupusers})}, 500);
    }

    render(){
      return(
        <View style={{backgroundColor: 'purple'}}>
          <Text style={{fontWeight: 'bold', marginTop:200, textAlign: 'center', fontSize: 32}}>
            Enter A Word to join a group</Text>
          <TextInput
              onChangeText={(text) => this.updateCode(text)}
              value={this.state.text}
            />
        </View>
      )
    }

}

export default EnterCode;
