import React from 'react';
import { View, TextInput,ImageBackground  } from 'react-native';
import { Card, ListItem, Button, Icon, Input, Text } from 'react-native-elements';
import CodeInput from 'react-native-code-input';
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
        source={{uri: 'https://firebasestorage.googleapis.com/v0/b/myfirstproject-3cbe1.appspot.com/o/user_image%2Fback3.jpg?alt=media&token=c12b0c26-1f7f-4f36-b5a1-e4e9afa8e105'}}>
                
        <View style={{flex:1, alignItems:'center'}}>
          <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 32}}>
            Enter a Word to Join!</Text>

            <CodeInput
              keyboardType="default"
              activeColor='rgba(0, 0, 255, 1)'
              inactiveColor='rgba(0, 0, 0, 1.3)'
              codeLength={4}
              size={60}
              autoFocus={false}
              containerStyle={{ marginTop: 30 }}
              codeInputStyle={{ borderWidth: 1.5 }}
              onFulfill={(code) => this.updateCode(code)}
            />
        </View>
        </ImageBackground>
       
      )
    }

}

export default EnterCode;
