import React from 'react'
import { TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View,Image} from 'react-native'
import firebase from '../../config/config.js';

class userAuth extends React.Component{

    login = async () => {
        try {
            let user = await firebase.auth().signInWithEmailAndPassword('BoyangZhang2020@u.northwestern.edu', '12345678')
        } catch (error) {
            console.log(error);
        }
    }

    constructor(props){
        super(props);
        this.state = {
            authStep: 0,
            email: '',
            pass: '',
            moveScreen:false
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
                        <TouchableOpacity onPress={() => this.setState({ authStep:1 })}>
                            <Text style = {{fontWeight:'bold',color:'green'}}>Login</Text>
                         </TouchableOpacity>                       
                    </View>
                ) : (
                    <View style={{marginVertical:20}}>
                    <TouchableOpacity onPress={() => this.setState({authStep:0})}>
                        <Text>Login Module</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
}

export default userAuth;