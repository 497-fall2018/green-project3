import React from 'react'
import { TouchableOpacity, Button, TextInput, KeyboardAvoidingView, StyleSheet, Text, View,Image} from 'react-native'
import firebase from '../../config/config.js';


class userAuth extends React.Component{

    login = async () => {
        var email = this.state.email;
        var pass = this.state.pass;
        if(email !='' && pass != ''){
        try {
            let user = await firebase.auth().signInWithEmailAndPassword(email,pass)//'BoyangZhang2020@u.northwestern.edu', '12345678')
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }else{
        alert('email or password is empty..')
    }
}

    constructor(props){
        super(props);
        this.login();
        this.state = {
            authStep: 1,
            email: '',
            pass: '',
        }
    }

    componentDidMount = () =>{

    }

    render(){
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text>Your are not logged in</Text>
                <Text>{this.props.message}</Text>
                { this.state.authStep == 0 ? (
                    <View style = {{marginVertical: 20,flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this.setState({ authStep:1 })} >
                            <Text style = {{fontWeight:'bold',color:'green'}}>Login</Text>
                         </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{marginVertical:20}}>
                        <Text style={{fontWeight:'bold',marginBottom:20 }}>NameTag Login</Text>
                        <Text style={{color:'black'}}>Email Address: </Text>
                        <TextInput
                        editable={true}
                        keyboardType={'email-address'}
                        placeholder={'enter your email address'}
                        onChangeText={(text) => this.setState({email:text})}
                        value={this.state.email}
                        style={{width:250,height:25, marginVertical:10, padding:5,borderWidth:1, borderColor:'grey',borderRadius:3}}
                        />

                        <Text style={{fontWeight:'bold',marginBottom:20 }}>NameTag Login</Text>
                        <Text>Password: </Text>
                        <TextInput
                        editable={true}
                        secureTextEntry={true}
                        placeholder={'enter your password'}
                        onChangeText={(text) => this.setState({pass:text})}
                        value={this.state.pass}
                        style={{width:250,height:25, marginVertical:10, padding:5,borderWidth:1, borderColor:'grey',borderRadius:3}}
                        />

                        <TouchableOpacity
                            style={{backgroundColor:'green', height:40, paddingVertical:10,paddingHorizontal:20,borderRadius:5}}
                            onPress={(() => this.login())}
                        >
                            <Text style={{color:'white'}}>Login</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
}

export default userAuth;
