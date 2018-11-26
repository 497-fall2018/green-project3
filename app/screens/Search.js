import React from 'react';
import { FlatList, StyleSheet,Text, View, Image } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import AddContact from '../components/AddContact.js';

class Search extends React.Component{

    constructor(props){
      super(props);
      this.state={
        input: true
      }
    }

    onFinishCheckingCode(isValid, code){
      this.setState({
        input: false
      })  
    }

    closeContact(){
      this.setState({
        input: true
      })  
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
              onFulfill={(isValid, code) => this.onFinishCheckingCode(isValid, code)}
            />
          </View>
        )
      }
      else{
        return(
          <View>
            <AddContact goBack={()=>this.closeContact()}/>
          </View>
        )
      }
    }

}

export default Search;