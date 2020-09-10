//import React, { Component } from 'react'
//import { StyleSheet, ScrollView, Text, View } from 'react-native'
//import { Button } from 'react-native-elements'
//import { withFirebaseHOC } from '../config/Firebase'


import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Image, Icon } from 'react-native-elements'
import { Button } from 'react-native-elements'

import firebase from '../config/Firebase/firebaseDb';


class SendForCheck extends Component {
  /*handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }*/


  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('sendForCheck');
    this.state = {
      isLoading: true,
      direcsendForCheck: []
    };
  }



componentDidMount() {
  console.disableYellowBox = true;
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const sendForCheckArray = [];
    querySnapshot.forEach((res) => {
      const { ManPowerDescription, Unit, Qty, Description, Location } = res.data();
      sendForCheckArray.push({
        key: res.id,
        res,
        ManPowerDescription,
        Unit,
        Qty,
        Description,
        Location,
      });
    });
    this.setState({
      sendForCheckArray,
      isLoading: false,
   });
  }












  addActivitySendForCheck = () => this.props.navigation.navigate('addActivitySendForCheck')
  goToHome = () => this.props.navigation.navigate('Home')
  //goToAddProject = () => this.props.navigation.navigate('AddProject')
  //goToProjectDetails = () => this.props.navigation.navigate('ProjectDetails')
  //goToSignup = () => this.props.navigation.navigate('Signup')
  //goToMarkAttendance = () => this.props.navigation.navigate('MarkAttendance')
  goBack = () => this.props.navigation.navigate('ProjectDetails')
  AcitvityDetailsSendForCheck = () => this.props.navigation.navigate('AcitvityDetailsSendForCheck')


  

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }   
    return (
      <ScrollView style={styles.container}>




  <View style={{ flex: 0,  backgroundColor:'#fff', marginTop:25, width:400, padding: 10, flexDirection: 'row', }}>
      <View style={styles.logobar}>
          <Image style={styles.logobarLogo} source={require('../assets/logo-small.png')} />
      </View>
      <View style={styles.logobarSignout}>
          <Button  title='Signout'  onPress={this.handleSignout}  titleStyle={{ color: '#F57C00', marginLeft:70, }} type='clear' />
      </View>
  </View>
  <View style={styles.welcomebar}>
      <Text style={styles.welcomebartitle}> Manage Send For Check </Text>
      <Text style={styles.gobackbtn} onPress={this.goBack}>Go Back</Text>
      
  </View>





          {
            this.state.sendForCheckArray.map((item, i) => {
              return ( 

 
      <View style={styles.sendForCheckBox}>
            <View style={styles.Box1}>
                    <Text style={styles.heading1}>Manpower Description</Text> 
                    <Text style={styles.desc}> {item.ManPowerDescription} </Text>   

                    <View style={styles.BoxSubMain}>   
                       <View style={styles.BoxSub1}>
                              <Text style={styles.heading1}>Unit</Text>   
                              <Text style={styles.desc}>{item.Unit}</Text>  
                       </View> 
                       <View style={styles.BoxSub2}>
                              <Text style={styles.heading1}>Qty</Text>   
                              <Text style={styles.desc}>{item.Qty}  </Text>   
                       </View> 
                    </View>
           
              <View style={styles.readMore}> 
                <Icon name="chevron-right" size={50} style={styles.moreIcon}
                onPress={() => {
                          this.props.navigation.navigate('AcitvityDetailsSendForCheck', {
                         
                            userkey: `${JSON.stringify(item.key)}`,
                          });
                        }}
                 />
              </View>
  
                        
             </View>

            <View style={styles.Box2}>
                    <Text style={styles.heading1}>Actitvity Description</Text> 
                    <Text style={styles.desc}>{item.Description}</Text> 

                    <View style={styles.BoxSubMain2}>   
                       <View style={styles.BoxSubc}>
                              <Text style={styles.heading1}>Location</Text>   
                              <Text style={styles.desc}> {item.Location} </Text>  
                       </View> 
                    </View>
             </View>
      </View>


 
  


 

    );
            })
          }

 

  


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 0,
    backgroundColor: '#f2f2f2',
     
     
  },

 preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
 

gobackbtn: { 
    padding: 7, marginTop: 10, borderColor:'#555c8f', borderRadius:5,  borderWidth: 1, color: "#F57C00", textAlign: "center", fontSize: 14, width:100, height:35,  fontWeight: "bold"
  },
 

welcomebartitle: { 
    marginTop: 10, marginLeft:10, paddingVertical: 8, color: "#20232a",  fontSize: 18, width:250, height:40, fontWeight: "bold"
  },

sendForCheckBox: { flexDirection: 'row', borderWidth:1, marginLeft:10, width:360, height:150,  marginTop:5, alignItems: 'center', justifyContent: 'center', borderRadius:8, borderColor:'#d8d8d8', backgroundColor:'#fff', borderWidth:1, },  

Box1: {  padding:10, paddingTop:5,  width:180, height: 119,  },


BoxSub1: {  padding:0, marginTop:10,  width:80,      },
BoxSub2: {  padding:0, marginTop:10,  width:80,      },


BoxSubMain: {  flexDirection: 'row', padding:0, marginTop:10,  width:180,     },

BoxSubMain2: {  flexDirection: 'row', padding:0, marginTop:10,  width:160,  },
BoxSubc: {  padding:0, marginTop:10,  width:140,     },

Box2: {  padding:10, paddingTop:5, width:170, height: 119,    },

sendForCheckBoxImage: { width: 60, height: 58,  },

heading1: { marginTop: 0, color: "#f8cc82",  fontSize: 14, },

desc: { marginTop: 5,   color: "#333", fontSize: 14, },


readMore: { marginTop: -70, marginLeft:300, borderWidth:0,   width:50, color: "#f8cc82",    },

  
  

addPbtn: {
          width: 320, height: 37,
},  


logobar: {
              width:200,   
},


logobarSignout: {
              width:180,  
},

logobarLogo: {
          width: 150, height: 37, 
},

welcomebar: {
          flex: 0, marginTop:5, width:350, flexDirection: 'row', backgroundColor: "#f2f2f2",
},


weather: {
          marginTop:10, width:400, alignItems:'center', 
},


weatherimage: {
          width: 350, height: 257,  
},

activeproj1: {
          flex: 0, marginLeft:30, marginTop:10, marginBottom:-15, flexDirection: 'row', backgroundColor: "#fff",
},

activeproj2: {
          flex: 0, marginLeft:20, marginTop:10, marginBottom:-5, flexDirection: 'row', backgroundColor: "#fff",
},

   
})

 
export default SendForCheck;
 