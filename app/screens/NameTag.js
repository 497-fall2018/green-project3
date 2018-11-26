import React from 'react';
import { FlatList, StyleSheet,Text, View, Image } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';

class NameTag extends React.Component{

    constructor(props){
      super(props);
      this.state={
        input: true,
        code: '0000'
      }
    }

    onFinishCheckingCode(c){
      this.setState({
        input: false,
        code: c.toString()
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
          <View>
            <Text style={{fontWeight: 'bold', marginTop:200, textAlign: 'center', fontSize: 32}}>
              Enter 4-digit Code to share your profile
            </Text>
            <CodeInput
              ref="codeInputRef"
              keyboardType="numeric"
              activeColor='rgba(49, 180, 4, 1)'
              inactiveColor='rgba(49, 180, 4, 1.3)'
              codeLength={4}
              className='border-circle'
              autoFocus={false}
              containerStyle={{ marginTop: 100 }}
              codeInputStyle={{ fontWeight: '800' }}
              onFulfill={(code) => this.onFinishCheckingCode(code)}
            />
          </View>
        )
      }
      else{
        return(
          <View>
            <Text style={{fontWeight: 'bold', marginTop:200, textAlign: 'center', fontSize: 32}}>
              You are sharing your profile at {"\n\n\n\n"}
              {this.state.code}
            </Text>
          </View>
        )
      }
    }
    

}

export default NameTag;