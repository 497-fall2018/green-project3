import React from 'react';
import { FlatList, StyleSheet,Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Button} from 'react-native-elements'
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import CodeInput from 'react-native-confirmation-code-input';
import TimerCountdown from 'react-native-timer-countdown';
import firebase from '../../config/config.js';
import UserAuth from '../components/auth.js'

class Home extends React.Component{

    constructor(props){
      super(props);

      this.state={
        loggedin: true,
        phoneNumberCheck: true,
        emailCheck: true,
        linkedinCheck: true,
        facebookCheck: true,
        startGroup:false,
        joinGroup:false,
        userid:'testuser1',
        groupcode:'testcode',
        groupusers:[],
        db:null
      }
    }

    componentDidMount = () =>{
      var that = this;
      firebase.auth().onAuthStateChanged(function(user){
        if(user){
          that.setState({
            loggedin:true,
            userId:user.uid
          });
          var UserId = user.uid;
          console.log("UserId:::"+UserId)
          firebase.database().ref('Users/'+UserId).once('value').then(function(snapshot){
            console.log("Have send the request...")
            const exists = (snapshot.val() != null);
            if(exists){
                Email = snapshot.val().Email
                console.log("Email::",Email)
                Phone = snapshot.val().Phone
                console.log("Phone::",Phone)
                UserName = snapshot.val().UserName
                console.log("UserName::",UserName)
                LinkedIn = snapshot.val().LinkedIn
                console.log("LinkedIn::",LinkedIn)
                Facebook = snapshot.val().Facebook
                console.log("Facebook::",Facebook)
                Image1 = snapshot.val().Image;
                console.log("Image1::",Image1);
                console.log("Email:",Email,"Phone",Phone,"UserName",UserName,"LinkedIn",LinkedIn,"Facebook",Facebook,"Image1",Image1)
                that.setValue(Email,Phone,UserName,LinkedIn,Facebook,Image1)
            }
          }).catch(error => console.log(error));

        }else{
          that.setState({
            loggedin:false
          })
        }
      })

    }

    setValue(Email,Phone,UserName,LinkedIn,Facebook,Image1){
      console.log('hhhhhhhhhhhhhh')
      this.setState({
          Email:Email,
          Phone:Phone,
          UserName:UserName,
          LinkedIn:LinkedIn,
          Facebook:Facebook,
          Image:Image1
      })
      console.log("success");
  }

  userLogout(){
    firebase.auth().signOut();
  }


    createGroup(userid){
      var that = this;
      firebase.database().ref('Groups').once('value')
      .then((snapshot) => {
        const exists = (snapshot.val() != null);
        if (exists)  {
          codeDict = snapshot.val()
          // console.warn(codeDict)
          for(var key in codeDict){
            if (codeDict[key] == ''){
              this.setState({groupcode:key});
            }
          }
        }
      })
      firebase.database().ref('Groups/' + this.state.groupcode).set([userid]);
      setTimeout(function(){that.navtoGroup()}, 500);
    }

    // joinGroup(groupcode){
    //   // this should query the db's groups table to find the matching dictionary object
    //   // it will return the list of user id's associated with the specific code
    //   // var userids = []
    //   // for code in groupcodes:
    //   //   if code == groupcode:
    //   //     userids += dict[code] (this is the list of userids)
    //   // return userids;
    //
    //   // var userids = ['testuser1','testuser2','testuser3','testuser4']
    //   var that = this;
    //
    //   firebase.database().ref('Groups/'+groupcode).once('value')
    //   .then((snapshot) => {
    //     console.warn(snapshot.val())
    //     const exists = (snapshot.val() != null);
    //     if (exists)  {
    //       this.setState({
    //         joinGroup:true,
    //         groupcode:groupcode,
    //         groupusers:snapshot.val()
    //     });
    //     console.warn(this.state.groupusers)
    //     }
    //   })
    //   setTimeout(function(){that.navtoGroup()}, 500);
    // }

    getUser(userid){
      //this should query the users table of the db to return the stored information
      // given a certain userid
      // var userobj={
      //       id:{userid},
      //       name:'',
      //       email:'',
      //       phone:'',
      //       address:'',
      //       facebooklink:'',
      //       linkedinlink:''
      //      }
      // for user in users:
      //    if user.id == userid:
      //      userobj = user
      var userobj = {
            id:userid,
            name:'Test User',
            email:'test@user.com',
            phone:'555-555-1234',
            address:'123 Test Ave, Evanston IL 60201',
            facebooklink:'https://www.facebook.com/ryanmchenry2',
            linkedinlink:'https://www.linkedin.com/in/ryanmchenry2'
      }

      firebase.database().ref('Users/'+userid).once('value')
      .then((snapshot) => {
        const exists = (snapshot.val() != null);
        if (exists)  {
          userobj = snapshot.val()
        console.warn(userobj)
        }
      })
      return userobj
    }

    navtoGroup(){
      this.props.navigation.navigate('Group',{groupcode:this.state.groupcode})
    }

    navtoEnterCode(){
      this.props.navigation.navigate('EnterCode')
    }

    render() {
      return (
        <View style = {styles.container}>
        { this.state.loggedin == true? (
          <View>

            <Text style={styles.welcomeText}>Welcome, { this.state.UserName }.</Text>
         <CheckBox style = {styles.checkbox}
            title='Phone Number'
            checked={this.state.phoneNumberCheck}
            onPress={() => this.setState({phoneNumberCheck: !this.state.phoneNumberCheck})}
          />

          <CheckBox style = {styles.checkbox}
            title='Email'
            checked={this.state.emailCheck}
            onPress={() => this.setState({emailCheck: !this.state.emailCheck})}
          />

          <CheckBox style = {styles.checkbox}
            title='LinkedIn'
            checked={this.state.linkedinCheck}
            onPress={() => this.setState({linkedinCheck: !this.state.linkedinCheck})}
          />

          <CheckBox style = {styles.checkbox}
            title='Facebook'
            checked={this.state.facebookCheck}
            onPress={() => this.setState({facebookCheck: !this.state.facebookCheck})}
          />

          <TouchableOpacity style = {styles.customButton}
            title="Start Group"
            loading
            loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
            onPress={() => this.createGroup(this.state.userid)}
          >
            <Text style={styles.customButtonText}>START GROUP</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style= {styles.customButton}
            loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
            onPress={() => this.navtoEnterCode()}>
            <Text style={styles.customButtonText}> JOIN GROUP </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.userLogout()}
            style= {styles.customButton}
            ><Text style={styles.customButtonText} > LOG OUT</Text></TouchableOpacity>
          </View>
        ) : (
          <View>
          <UserAuth message="please login to use NameTag"></UserAuth>
          </View>
        )}

        </View>

      );
    }


}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
     width: '80%',
     marginLeft: '10%'
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
     marginTop: 30,
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
   },
   welcomeText:{
     fontSize: 24,
     fontWeight:'bold',
     color: 'purple',
     marginTop: 30,
     marginBottom: 25
   }
})

export default Home;
