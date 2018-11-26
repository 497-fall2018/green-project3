import React from 'react';
import { Button, FlatList, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import firebase from '../../config/config.js';

class NameTag extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            Email:null,
            Phone:null,
            UserName:null
        }
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


    render() {
        return (
            <View>
            <View style={{ flex: 1 }}>
                <View style={{ height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>NameTag</Text>
                </View>
            </View>
            <View style={{ height: 350, paddingTop: 300,  justifyContent: 'center', alignItems: 'center' }} >
            <Text>HHHHHH</Text>

            <Button
              onPress = { ()=> this.sendRequest('1234')}
              title='button' />

            {this.state.Email == null? (<View></View>) :(
            <View>
            <Text>Email: {this.state.Email}</Text>
            <Text>Phone: {this.state.Phone}</Text>
            <Text>UserName: {this.state.UserName}</Text>
            </View>
            )}
              

            </View>

            </View>
        )
    }

}

export default NameTag;

