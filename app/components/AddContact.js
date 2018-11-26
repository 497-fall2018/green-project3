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
                <Text style={{fontWeight: 'bold', marginTop:200, textAlign: 'center', fontSize: 32}}>
                    Name: {this.foo}
                    Phone: {this.foo}
                    E-mail: {this.foo}

                </Text>
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