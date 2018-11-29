import React from 'react';
import Contacts from 'react-native-contacts';
import { FlatList, StyleSheet,Text, View, Image, Alert} from 'react-native';
import { Card, ListItem, Button, Icon, Input } from 'react-native-elements';
import CallToActionBox from 'react-native-plus-button-box';

class Group extends React.Component{

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

    var newPerson = {
      emailAddresses: [{
        label: "work",
        email: "sushobhan@u.northwestern.edu",
      }],
      familyName: "Sushobhan",
      givenName: "Ghosh",
    }

    Contacts.addContact(newPerson, (err) => {
      if (err) throw err;
    })

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
                        title={"Phone"}
                        textInput={true}
                        hideChevron
                      />
                      <ListItem
                        key={2}
                        title={"E-mail"}
                        textInput={true}
                        textInputValue={'wehang2020@u.northwestern.edu'}
                        hideChevron
                      />
                      <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        onPress={()=>this.onPressButton()}
                        backgroundColor='#03A9F4'
                        buttonStyle={{marginTop: 10, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Save' />
                    </Card>

            </View>
        )
    }

}

export default Group;
