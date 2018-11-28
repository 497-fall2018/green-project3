import React from 'react';
import { FlatList, StyleSheet,Text, View, Image, Button } from 'react-native';
import Contacts from 'react-native-contacts';

class AddContact extends React.Component{

    constructor(props){
        super(props);
        this.foo = '2332'
    }

    onPressButton(){
        this.props.goBack();
    }

    render()
    {
        return(

                <View>
                <Text style={{fontWeight: 'bold', marginTop:80, textAlign: 'center', fontSize: 32}}>UserName: {this.props.UserName}</Text>
                <Text style={{fontWeight: 'bold', marginTop:80, textAlign: 'center', fontSize: 32}}>Email: {this.props.Email}</Text>
                <Text style={{fontWeight: 'bold', marginTop:80, textAlign: 'center', fontSize: 32}}>Phone: {this.props.Phone}</Text>
                <Button
				  onPress={()=>this.onPressButton()}
				  title="Add Contact"
				  color="#841584"
				  accessibilityLabel="Add Contact"
				/>
                </View>
        )
    }

}

export default AddContact;

