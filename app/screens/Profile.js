import React from 'react';
import { FlatList, StyleSheet,Text, View, Image, Alert, TouchableOpacity} from 'react-native';
import { Card, ListItem, Button, Icon, Input } from 'react-native-elements'

class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state={
            text: ''
        }
    }


    onPressButton(){
        Alert.alert(
         'You have updated your profile.'
        )
    }

    render()
    {
        return(
            <View>
                    <Card
                      containerStyle={{marginTop: 200}}
                      image={require('../../assets/profilePhoto.jpg')}
                      imageProps={{marginTop: 20, resizeMode: 'contain'}}>
                      <ListItem
                        key={0}
                        title={"Name"}
                        textInput={true}
                        textInputValue={'Wei Hang'}
                        hideChevron
                      />
                      <ListItem
                        key={1}
                        title={"Phone Number"}
                        textInput={true}
                        hideChevron
                      />
                      <ListItem
                        key={2}
                        title={"Email"}
                        textInput={true}
                        textInputValue={'wehang2020@u.northwestern.edu'}
                        hideChevron
                      />
                      <ListItem
                        key={3}
                        title={"LinkedIn"}
                        textInput={true}
                        hideChevron
                      />
                      <ListItem
                        key={4}
                        title={"Facebook"}
                        textInput={true}
                        hideChevron
                      />
                      <TouchableOpacity style = {styles.customButton}
                        icon={<Icon name='code' color='#ffffff' />}
                        onPress={()=>this.onPressButton()}
                        backgroundColor='#03A9F4'
                        buttonStyle={{marginTop: 10, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Save' >
                        <Text style={styles.customButtonText}> SAVE </Text>
                        </TouchableOpacity>
                    </Card>

            </View>
        )
    }

}

const styles = StyleSheet.create({
  container: {
     paddingTop: 23
  },
  checkbox: {
    margin: 100,
    height: 100,
    borderColor: '#7a42f4',
    borderWidth: 1,
    paddingTop: 100,
    backgroundColor: '#000',
    padding: 200,
  },
   customButton: {
     marginLeft: 'auto',
     marginRight: 'auto',
     marginTop: 15,
     paddingHorizontal: 50,
     paddingVertical:15,
     backgroundColor: 'purple',
     borderRadius: 100,
     shadowOpacity: 0.15,
      shadowRadius: 24,
      shadowColor: 'black',
      shadowOffset: { height: 0, width: 0 },
   },
   customButtonText: {
     color: 'white',
     fontWeight:'700',
     letterSpacing: 1,
   }
})

export default Profile;
