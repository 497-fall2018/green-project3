import React from 'react';
import { FlatList, StyleSheet, Text, Alert, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { CheckBox, Badge, Button, ListItem, Icon } from 'react-native-elements'
import CodeInput from 'react-native-confirmation-code-input';
import TimerCountdown from 'react-native-timer-countdown';
import firebase from '../../config/config.js';
import { Permissions, Contacts } from 'expo';
import { PullToRefresh } from 'antd-mobile';




class Group extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      input: true,
      code: "ABLE",
      checked: true,
      ready: false,
      userInfo: []
    }

  }
  componentWillMount() {
    this.getGroupInfo();
  }

  keyExtractor = (item, index) => index

  renderItem = ({ item, index }) => (
    <View>
      <ListItem key={index}
        title={item.UserName}
        subtitle={item.Email}
        leftAvatar={{ source: { uri: item.Image } }}
        onPress={() => { this.addContactAsync(item) }}
        rightIcon={{ name: 'person-add' }}
      />
    </View>
  )


  refresh() {
    console.log("refresh has been excuted!!!")
    this.state.userInfo = []
    var that = this;
    firebase.database().ref('Groups/' + that.state.code).once('value').then(
      function (snapshot) {
        const exists = (snapshot.val() != null);
        if (exists) {
          that.setState({
            groupusers: snapshot.val()
          })
          console.log("this.state.groupusers:", that.state.groupusers)
          that.getUsers(that.state.groupusers)
          setTimeout(that.dummyfunction, 1000);
        }
      })
  }

  getGroupInfo() {
    //const code_groupusers = this.props.navigation.getParam('groupusers', 'failed');
    var that = this;
    const groupcode = this.props.navigation.getParam('groupcode', 'failed');
    this.setState({ code: groupcode });
    console.log("groupcode:", groupcode);
    firebase.database().ref('Groups/' + groupcode).on('value', function (snapshot) {
      const exists = (snapshot.val() != null);
      if (exists) {
        that.setState({
          groupusers: snapshot.val()
        })
        console.log("this.state.groupusers:", that.state.groupusers)
        that.getUsers(that.state.groupusers)
        setTimeout(that.dummyfunction, 1000);
      }
    })



  }

  dummyfunction() { }

  getUsers(groupusers) {
    var that = this;
    for (i in groupusers) {
      firebase.database().ref('Users/' + groupusers[i]).once('value')
        .then((snapshot) => {
          const exists = (snapshot.val() != null);
          if (exists) {
            that.state.userInfo.push(snapshot.val());
            //console.log("groupusers Unit:",snapshot.val())
            //console.log("Phone:",snapshot.val().Phone)
            console.log("this.state.userInfo:", this.state.userInfo)
            that.setState({ ready: true })
          }
        })
    }
  }

  async addContactAsync(item) {
    // Ask for permission to query contacts.
    const permission = await Permissions.askAsync(Permissions.CONTACTS);

    if (permission.status !== 'granted') {
      // Permission was denied...
      return;
    }
    console.log(item);
    const contact = {
      //[Contacts.Fields.FirstName]: item.UserName,
      [Contacts.Fields.LastName]: item['UserName'],
      [Contacts.Fields.Emails]: [{ ['email']: item['Email'], ['label']: "E-mail" }],
      [Contacts.Fields.PhoneNumbers]: [{ ['number']: item['Phone'].toString(), ['label']: "Phone" }],
      [Contacts.Fields.UrlAddresses]: [{ ['url']: item['Facebook'], ['label']: "Facebook" }]
    }
    const contactId = await Contacts.addContactAsync(contact);
    Alert.alert(
      'Your have successfully added',
      item['UserName'],
      'to your contacts!'
    );
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.refresh()}>
          <Text>Reresh</Text>
        </TouchableOpacity>
        <Badge
          value={this.state.code}
          textStyle={{ color: 'black' }}
          wrapperStyle={{ backgroundColor: 'black' }} />

        {this.state.ready == true ? (
          <FlatList
            extraData={this.state}
            keyExtractor={this.keyExtractor}
            data={this.state.userInfo}
            renderItem={this.renderItem} />
        ) : (
            <View>
              <Text>Waitting......</Text>
            </View>
          )}


      </View>

    );
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
    paddingTop: 100
  }
})

export default Group;