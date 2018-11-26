import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native'

class NameTag extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (          
                <View style={{flex:1}}>
                <View style={{height:70,paddingTop:30, backgroundColor:'white', borderColor:'lightgrey',borderBottomWidth:0.5,justifyContent:'center',alignItems:'center'}}>
                    <Text>NameTag</Text>
                </View>
                </View>          
        )
    }

}

export default NameTag;

