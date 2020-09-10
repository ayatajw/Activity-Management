import React, { Component } from 'react'
import { Alert, StyleSheet, ScrollView, Text, View, Animated, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
//import { withFirebaseHOC } from '../config/Firebase'
import { Image } from 'react-native-elements'

import firebase from '../config/Firebase/firebaseDb';


import { API_KEY } from '../utils/WeatherAPIKey';
import Weather from '../components/Weather';



class ProjectDetails extends Component {
   

 constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            temperature: 0,
            weatherCondition: null,
            error: null
        }
    }   

 
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Gettig Weather Condtions'
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        });
      });
  }







 deleteUser() {
    const { navigation } = this.props;
    const dbRef = firebase.firestore().collection('directManPower').doc(JSON.parse(navigation.getParam('userkey')));
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('DirectManPower');
      })
  }


   

sendForCheckAll() {
    this.setState({
      isLoading: true,
    });



             

           firebase.firestore().collection("directManPower").where("Status", "==", '0') 
            .onSnapshot(function(snapshot) {
                snapshot.docChanges().forEach(function(change) {
                    if (change.type === "added") {
                        var newDate = new Date(); 
                        var thesendforcheckdate = newDate.getDate();
                      const updateDBRef = firebase.firestore().collection('directManPower').doc(change.doc.id);
                        updateDBRef.set({
                          Project: change.doc.data()['Project'],
                          User: change.doc.data()['User'],
                          Date: change.doc.data()['Date'],
                          Status: '1',
                          ManPowerDescription: change.doc.data()['ManPowerDescription'],
                          Unit: change.doc.data()['Unit'],
                          Qty: change.doc.data()['Qty'],
                          Description: change.doc.data()['Description'],
                          Location: change.doc.data()['Location'],
                          Sendforcheckdate:thesendforcheckdate, 
                        }).then((docRef) => {
                          this.setState({
                            Project: '',
                            User: '',
                            Date: '',
                            Status: '',
                            ManPowerDescription: '',
                            Unit: '',
                            Description: '',
                            Location: '',
                            Sendforcheckdate:'',
                             
                          });
                        })    
                    }
                });
            });
          





           firebase.firestore().collection("indirectManPower").where("Status", "==", '0') 
            .onSnapshot(function(snapshot) {
                snapshot.docChanges().forEach(function(change) {
                    if (change.type === "added") {
                     // console.log(change.doc.data());
                        var newDate = new Date(); 
                        var thesendforcheckdate = newDate.getDate();
                      const updateDBRef = firebase.firestore().collection('indirectManPower').doc(change.doc.id);
                        updateDBRef.set({
                          Project: change.doc.data()['Project'],
                          User: change.doc.data()['User'],
                          Date: change.doc.data()['Date'],
                          Status: '1',
                          ManPowerDescription: change.doc.data()['ManPowerDescription'],
                          Contractor: change.doc.data()['Contractor'],
                          Unit: change.doc.data()['Unit'],
                          Qty: change.doc.data()['Qty'],
                          Description: change.doc.data()['Description'],
                          Location: change.doc.data()['Location'],
                          Sendforcheckdate:thesendforcheckdate, 
                        }).then((docRef) => {
                          this.setState({
                            Project: '',
                            User: '',
                            Date: '',
                            Status: '',
                            ManPowerDescription: '',
                            Contractor:'',
                            Unit: '',
                            Qty:'',
                            Description: '',
                            Location: '',
                            Sendforcheckdate:'',
                            
                          });
                        })    
                    }
                });
            });





           firebase.firestore().collection("equipment").where("Status", "==", '0') 
            .onSnapshot(function(snapshot) {
                snapshot.docChanges().forEach(function(change) {
                    if (change.type === "added") {
                        var newDate = new Date(); 
                        var thesendforcheckdate = newDate.getDate();
                      const updateDBRef = firebase.firestore().collection('equipment').doc(change.doc.id);
                        updateDBRef.set({
                          Project: change.doc.data()['Project'],
                          User: change.doc.data()['User'],
                          Date: change.doc.data()['Date'],
                          Status: '1',
                          EquipmentName: change.doc.data()['EquipmentName'],
                          Issueto: change.doc.data()['Issueto'],
                          NatureOfWork: change.doc.data()['NatureOfWork'],                           
                          Location: change.doc.data()['Location'],
                          Sendforcheckdate:thesendforcheckdate, 
                        }).then((docRef) => {
                          this.setState({
                            Project: '',
                            User: '',
                            Date: '',
                            Status: '',
                            EquipmentName: '',
                            Issueto:'',
                            NatureOfWork: '',                            
                            Location: '',
                            Sendforcheckdate:'',                            
                          });
                          this.props.navigation.navigate('ProjectDetails');
                        })    
                    }
                });
            });





  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Send For Check',
      'Are you sure?',
      [
        //{text: 'Yes', onPress: () => this.sendForCheckAll()},
        {text: 'Yes', onPress: () => this.props.navigation.navigate('SendAllForCheck')},
        {text: 'No', onPress: () => console.log('No item was Send For Check'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }





  goToHome = () => this.props.navigation.navigate('Home')
  goToAddProject = () => this.props.navigation.navigate('AddProject')
  goToProjectDetails = () => this.props.navigation.navigate('ProjectDetails')
  goToSignup = () => this.props.navigation.navigate('Signup')
  goToMarkAttendance = () => this.props.navigation.navigate('MarkAttendance')
  DirectManPower = () => this.props.navigation.navigate('DirectManPower')


  render() {


const { isLoading } = this.state;
const { temperature } = this.state;
const { weatherCondition } = this.state;

    return (
      <View style={styles.container}>

          <View style={styles.header} >
                <View style={styles.headerlogobar}>
                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Home')} >
                          <Image style={styles.headerlogobarLogo} source={require('../assets/logo-small.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerlogobarSignout}>
                    <Button  title='Signout'  onPress={this.handleSignout}  titleStyle={{ color: '#F57C00', marginLeft:70, }} type='clear' />
                </View>
          </View>

          <View style={styles.welcomebar}>
              <Text style={styles.welcomebartitle}>Florence Galleria </Text>
              <Button title="Go Back" onPress={this.goToHome} titleStyle={{ borderWidth:1, padding:7, paddingTop:7, marginTop:2,  borderRadius:5, fontSize:13, height:35, borderColor:'#F57C00', color: '#F57C00' }} type='clear' />
              <Text style={styles.welcomebarMarkAttendance} /*onPress={this.goToMarkAttendance}*/>Today</Text>
          </View>

          <View style={styles.weathern}>
              {isLoading ? <Text>Fetching The Weather</Text> : <Weather weather={weatherCondition} temperature={temperature} /> }

          </View>

          <View style={styles.weatherbottom}>
                <Image style={styles.weatherimage} source={require('../assets/yahoo_weather_b.png')} />
          </View>



          <ScrollView style={styles.scrollcontainer}>

                <View style={styles.directmanPowerBox}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('DirectManPower'); }} >  
                      <View style={styles.multiPojBox1}>
                                <Image  style={styles.directmanPowerBoxImage} source={require('../assets/directMP1.png')} />
                                <Button title="Direct ManPower" onPress={this.DirectManPower} titleStyle={{ color: '#000', fontSize:14, }} type='clear' />     
                      </View>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('IndirectManPower'); }} >  
                      <View style={styles.multiPojBox2}>
                              <Image  style={styles.directmanPowerBoxImage} source={require('../assets/directMP2.png')} />
                              <Button title="Indirect ManPower" onPress={() => this.props.navigation.navigate('IndirectManPower')} titleStyle={{ color: '#000', fontSize:14, }} type='clear' /> 
                      </View>
                    </TouchableOpacity>   
                </View>



                <View style={styles.directmanPowerBox}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Equipment'); }} > 
                      <View style={styles.multiPojBox1}>
                                <Image  style={styles.directmanPowerBoxImage} source={require('../assets/directMP3.png')} />
                                <Button title="Equipment" onPress={() => this.props.navigation.navigate('Equipment')} titleStyle={{ color: '#000', fontSize:14, }} type='clear' />      
                      </View>
                    </TouchableOpacity> 
                      
                      <View style={styles.multiPojBox2}>
                              <Image  style={styles.directmanPowerBoxImage} source={require('../assets/directMP4.png')} />
                              <Button title="Send for Check" onPress={this.openTwoButtonAlert} titleStyle={{ color: '#000', fontSize:14, }} type='clear' />  
                      </View>
                </View>

          </ScrollView>


           
  
 
 

 

      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },


  scrollcontainer: {
    
    backgroundColor: '#f2f2f2',
     
     
  },


/*Header*/ 
header:{ flex: 0, borderWidth:0,  backgroundColor:'#fff', marginTop:35,    padding: 5, flexDirection: 'row', },
headerlogobar: { width:200, },
headerlogobarSignout: { width:180, },
headerlogobarLogo: { width: 150, height: 37, },
/*Header End*/

welcomebartitle: { 
    marginTop: 10, marginLeft:0, paddingVertical: 8, color: "#20232a",  fontSize: 18, width:200, height:40, fontWeight: "bold"
  },

directmanPowerBox: { flexDirection: 'row', width:350,   marginTop:10, alignItems: 'center', justifyContent: 'center', },  

multiPojBox1: {  padding:10,  width:170, height: 119,  alignItems:'center',
      backgroundColor:'#fff', borderRadius:8, borderColor:'#d8d8d8', borderWidth:1,
  },

directmanPowerBoxImage: { width: 60, height: 58,  },

multiPojBox2: {  padding:10, width:170, height: 119,   alignItems:'center',
    flexDirection: 'column', backgroundColor:'#fff', borderRadius:8, borderColor:'#d8d8d8', borderWidth:1, marginLeft:10, 
  },

projp1: { 
    marginTop: 10, paddingVertical: 0, color: "#000", textAlign: "center", fontSize: 16,
  },
projp2: { 
    marginTop: 0, paddingVertical: 0, color: "#a6a6a6", textAlign: "center", fontSize: 10, 
  },


activeprojprojp1: { 
    width:300, marginTop: 0, paddingVertical: 0, color: "#000", textAlign: "center", fontSize: 15, fontWeight: "bold"
  },
activeprojprojp2: { 
    marginTop: 0, paddingVertical: 0, color: "#a6a6a6", textAlign: "center", fontSize: 15, 
  },


welcomebarMarkAttendance: { 
    padding: 7, marginTop: 10, borderColor:'#555c8f', borderRadius:5,  borderWidth: 1, color: "#555c8f", textAlign: "center", fontSize: 14,   height:35,  fontWeight: "bold"
  },


activeprojtitle: {  
  marginTop: 5, paddingVertical: 8,     color: "#555c8f", textAlign: "center",  fontSize: 15, width:200, height:50,
  },


activeprojPic: {
          width: 300, height: 150, 
},  


addPbtn: {
          width: 320, height: 37,
},  


welcomebar: {
          flex: 0, marginTop:5, width:350, flexDirection: 'row', backgroundColor: "#f2f2f2",
},


weather: {
          marginTop:10, width:400, alignItems:'center', 
},


weatherbottom: {
          marginTop:0,  alignItems:'center', 
},

weathern: {
          marginTop:10, 
          width:350, 
          height:250,
          backgroundColor: '#fff' 
},


weatherimage: {
          width: 350, height: 50,  
},

activeproj1: {
          flex: 0, marginLeft:30, marginTop:10, marginBottom:-15, flexDirection: 'row', backgroundColor: "#fff",
},

activeproj2: {
          flex: 0, marginLeft:20, marginTop:10, marginBottom:-5, flexDirection: 'row', backgroundColor: "#fff",
}


















})

export default ProjectDetails;
//export default withFirebaseHOC(ProjectDetails)
