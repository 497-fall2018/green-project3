import React from 'react';
import { FlatList, StyleSheet,Text, View, Image, Alert} from 'react-native';
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

export default Profile;
