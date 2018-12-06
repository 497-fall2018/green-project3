import React from 'react';
import { FlatList, StyleSheet,Text, View, Image, Icon, TouchableOpacity, TextInput } from 'react-native';
import { CheckBox, Badge, Button, ListItem} from 'react-native-elements'
import CodeInput from 'react-native-confirmation-code-input';
import TimerCountdown from 'react-native-timer-countdown';
import firebase from '../../config/config.js';

class Group extends React.Component{

    constructor(props){
      super(props);
      this.state={
        input: true,
        code:"able",
        checked: true,
        userInfo: [],
        userList: [
          {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
          },
          {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
  },
        ],
      }
      this.wordList = [
           "able","also","ants","area","army","atom","away","baby","back","ball",
           "band","bank","bare","bark","barn","base","bean","bear","beat","been","bell","belt","bend",
           "bent","best","bill","bite","blew","blow","blue","boat","body","bone","book","born",
           "both","bowl","burn","burst","bus","bush","busy","cage","cake","call","calm","came","camp",
           "card","care","case","cast","cave","cell","cent","city","clay","club","coal","coat",
           "cold","come","cook","cool","copy","corn","cost","crew","crop","dark","date","dawn","dead","deal",
           "dear","deep","deer","desk","dirt","dish","does","done","door","down","dozen","draw","drew",
           "drop","duck","dull","dust","duty","each","earn","east","easy","eat","edge","else","end","even","ever",
           "face","fact", "fair","fall","farm","fast","fear","feed","feel","feet","fell","felt","few",
           "fill","film","find","fine","fire","firm","fish","five","flat","flew","flow","food","foot",
           "form","fort","four","free","from","fuel","full","gain","game","gate","gave","gift","girl","give","glad",
           "goes","gold","gone","good","gray","grew","grow","gulf","hair","half","hall","hand","hang","hard",
           "have","heat","held","help","herd","here","hide","high","hill","hold","hole","home","hope","horn",
           "hour","huge","hung","hunt","hurt","idea","inch","into","iron","jack","join","jump",
           "just","keep","kept","kids","kill","kind","knew","know","lack","lady","laid","lake","lamp","land","last","late","leaf",
           "left","life","lift","like","line","lion","lips","list","live","load","long","look","lose","loss","lost","loud",
           "love","luck","made","mail","main","make","many","mark","mass","meal","mean","meat","meet","mice","mile","milk","mill",
           "mind","mine","mood","moon","more","most","move","must","name","near","neck","nest","news","next","nice","nine",
           "none","noon","nose","note","noun","nuts","once","only","onto","open","over","pack","page","paid","pain",
           "pair","pale","park","part","pass","past","path","pick","pile","pine","pink","pipe","plan","play","plus","poem","poet",
           "pole","pond","pony","pool","poor","port","post","pour","pull","pure","push","race","rain","rate",
           "rays","read","real","rear","rest","rice","rich","ride","ring","rise","road","roar","rock",
           "roll","roof","room","root","rope","rose","rule","rush","safe","said","sail","sale","salt","same","sand","sang","save","seat","seed",
           "seems","seen","sell","send","sent","sets","ship","shoe","shop","shot","show","shut","sick",
           "sign","silk","sing","sink","size","skin","slip","slow","snow","soap","soft","soil","sold","some","song","soon","sort","spin","star","stay",
           "step","stop","such","suit","sure","swam","swim","tail","take","talk","tall","tank","tape","task",
           "team","tell","tent","term","test","than","that","thee","them","then","they","thin","this",
           "thou","thus","tide","till","time","tiny","told","tone","took","tool",
           "torn","town","trap","tree","trip","tube","tune","turn","type","unit","upon","vast","verb","very",
           "view","vote","wait","walk","wall","want","warm","warn","wash","wave","weak","wear","week",
           "well","went","were","west","wet","what","when","whom","wide","wife","wild","will","wind","wing","wire","wise","wish","with","wolf",
           "wood","wool","word","wore","work","yard","year","your","zero","zulu"
         ]
    }

    generateRandomNumber(min , max) {
      let random_number = Math.random() * (max-min) + min;
      return Math.floor(random_number);
    }

    generateCode() {
        this.state.code = this.wordList[this.generateRandomNumber(0,this.wordList.length)];
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

    verifyCode(c){
      if (c===this.wordList[0]){
        alert('code: ' + c + ' worked ')
      }
    }

    addUser(user){
      this.state.userList.push(user)
    }

    keyExtractor = (item, index) => index

    renderItem = ({ item }) => (
      <ListItem
        title={item.UserName}
        subtitle={'Vice President'}
        leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
      />
    )

    getGroupInfo(){
      const param = this.props.navigation.getParam('groupusers', 'failed');
      this.setState({userInfo: param.map((userid) => this.getUser(userid))})
      console.warn("GroupInfo:", this.state.userInfo)
    }

    // userInfoToUserList(userInfo){
    //   return userInfo.map(info => {
    //     name: info["UserName"],
    //     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    //     subtitle: 'Vice President'
    //   });
    // }

    getUser(userid){
      // var userobj = {
      //       id:value,
      //       name:'Test User',
      //       email:'test@user.com',
      //       phone:'555-555-1234',
      //       address:'123 Test Ave, Evanston IL 60201',
      //       facebooklink:'https://www.facebook.com/ryanmchenry2',
      //       linkedinlink:'https://www.linkedin.com/in/ryanmchenry2'
      // }
      firebase.database().ref('Users/'+userid).once('value')
      .then((snapshot) => {
        const exists = (snapshot.val() != null);
        if (exists)  {
          var userobj = snapshot.val();
        console.warn("GetUSer:"+userobj)
        }
      })
      return userobj
    }

    render() {
      // console.warn("render"+this.props.groupusers)
      // this.generateCode();
      // const param = this.props.navigation.getParam('groupcode', 'failed')
      // var info = this.getGroupInfo(param)
      // console.warn("GroupRender:", info)
      return (
        <View style = {styles.container}>
          <Badge
            containerStyle={{ backgroundColor: 'violet'}}
            value={this.state.code}
            textStyle={{ color: 'black' }}
            // onPress={() => {this.generateCode()}}
          />
        {/* <Text>THIS IS RYAN'S THING: {param}</Text>?*/}

          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.userInfo}
            renderItem={this.renderItem}
          />
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
