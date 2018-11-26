import React from 'react';
import { FlatList, StyleSheet,Text, View, Image, Button, Icon } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import TimerCountdown from 'react-native-timer-countdown';

class Share extends React.Component{

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
          <View  style={{backgroundColor: '#CC99FF'}}>
            <Text style={{fontWeight: 'bold', marginTop:200, textAlign: 'center', fontSize: 32}}>
              Enter 4-digit Code to share your profile
            </Text>
            <CodeInput
              ref="codeInputRef"
              keyboardType="numeric"
              activeColor='rgba(0, 0, 0, 1)'
              inactiveColor='rgba(0,0,0, 1.3)'
              codeLength={4}
              className='border-b'
              autoFocus={false}
              containerStyle={{marginTop: 150 }}
              codeInputStyle={{ fontWeight: '800' }}
              onFulfill={(code) => this.onFinishCheckingCode(code)}
            />
          </View>
        )
      }
      else{
        return(
        <View>
          <View  style={{backgroundColor: '#99CCFF'}}>
            <Text style={{backgroundColor: '#99CCFF', fontWeight: 'bold', marginTop:200, textAlign: 'center', fontSize: 32}}>
              You are sharing your profile at {"\n\n"}
              {this.state.code}
              {"\n\n"}
            </Text>
</View>

            <Text style={{textAlign: 'center', fontSize: 20}}>
            {"\n Time to expire:"}
            </Text>
            <TimerCountdown
                initialSecondsRemaining={1000*300}
                onTick={secondsRemaining => console.log('tick', secondsRemaining)}
                onTimeElapsed={() => console.log('complete')}
                allowFontScaling={true}
                style={{ textAlign: 'center', marginTop: 20, fontSize: 20 }}
            />

            <Button
                onPress={()=>this.closeContact()}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Stop sharing now' />
          </View>

        )
      }
    }
    

}

export default Share;