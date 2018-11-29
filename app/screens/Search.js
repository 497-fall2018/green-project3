import React from 'react';
import { Button, FlatList, StyleSheet,Text, View, Image, TouchableHighlight } from 'react-native'
import firebase from '../../config/config.js';
import CodeInput from 'react-native-confirmation-code-input';
import AddContact from '../components/AddContact.js';

class Search extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            Email:null,
            Phone:null,
            UserName:null,
            input:true
        }
    }

    onFinishCheckingCode(code){
        this.setState({
          input: false
        })
        console.log(code);
        this.sendRequest((code.toString()))
      }

      closeContact(){
        this.setState({
          input: true
        })
     }

    setValue(Email,Phone,UserName){
        console.log('hhhhhhhhhhhhhh')
        this.setState({
            Email:Email,
            Phone:Phone,
            UserName:UserName
        })
        console.log("success");
    }

    sendRequest(Code){
        var that = this;
        console.log("******************");
        firebase.database().ref('Codes/'+Code).child('UserId').once('value').then(function(snapshot){
            const exists = (snapshot.val() != null);
            if (exists)  {
              UserId = snapshot.val()
              console.log(snapshot.val(),"hhhhh")
              console.log('Single  Value: ',UserId)
              firebase.database().ref('Users/'+UserId).once('value').then(function(snapshot){
                const exists = (snapshot.val() != null);
                if(exists){
                    Email = snapshot.val().Email
                    Phone = snapshot.val().Phone
                    UserName = snapshot.val().UserName
                    console.log("Email:",Email,"Phone",Phone,"UserName",UserName)
                    that.setValue(Email,Phone,UserName)
                }
              })
            }
          }).catch(error => console.log(error));
    }




    render()
    {
      if (this.state.input){
        return(
          <View  style={{backgroundColor: '#CC99FF'}}>
            <Text style={{fontWeight: 'bold', marginTop:200, textAlign: 'center', fontSize: 32}}>
              Enter 4-digit Code to search for contacts
            </Text>
            <CodeInput
              ref="codeInputRef"
              keyboardType="numeric"
              activeColor='rgba(0, 0, 0, 1)'
              inactiveColor='rgba(0, 0, 0, 1.3)'
              codeLength={4}
              className='border-b'
              autoFocus={false}
              containerStyle={{ marginTop: 150 }}
              codeInputStyle={{ fontWeight: '800' }}
              onFulfill={(code) => this.onFinishCheckingCode(code)}
            />
          </View>
        )
      }
      else{

        return(
          <View>
             <AddContact
             Email={this.state.Email}
             Phone={this.state.Phone}
             UserName={this.state.UserName}
             goBack={()=>this.closeContact()}/>
      </View>
        )
    }
}

}
export default Search;

/* <Button
          onPress = { ()=> this.sendRequest('1234')}
          title='button' />

        {this.state.Email == null? (<View></View>) :(
        <View>
        <Text>Email: {this.state.Email}</Text>
        <Text>Phone: {this.state.Phone}</Text>
        <Text>UserName: {this.state.UserName}</Text>
        </View> */
