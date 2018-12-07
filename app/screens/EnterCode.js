import React from 'react';
import { View, TextInput,ImageBackground  } from 'react-native';
import { Card, ListItem, Button, Icon, Input, Text } from 'react-native-elements';
import CodeInput from 'react-native-confirmation-code-input';
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
          firebase.database().ref('Groups/' + groupcode).set(newUserList);
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
   
        <ImageBackground style={{ flex: 1 }}
        source={require('../../assets/back3.jpg')}>


        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          
          <TextInput
              style={{ marginTop:30,width:250,height:25, marginVertical:10, padding:5,borderWidth:1, borderColor:'grey',borderRadius:3}}
              onChangeText={(text) => this.updateCode(text)}
              value={this.state.text}/>
          
          <Text style={{fontWeight: 'bold', marginTop:50, textAlign: 'center', fontSize: 32}}>
            Enter A Word to Join A Group!</Text>     
        </View>
        
        </ImageBackground>
      )
    }

}

export default EnterCode;
