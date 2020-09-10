import React, { Component } from 'react'
import { Alert, StyleSheet, ScrollView, Text, View, Animated, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
//import { withFirebaseHOC } from '../config/Firebase'
import { Image } from 'react-native-elements'

import DatePicker from 'react-native-datepicker';

import firebase from '../config/Firebase/firebaseDb';


import { API_KEY } from '../utils/WeatherAPIKey';
import Weather from '../components/Weather';
import styles from '../utils/projectDetailscss.js';



class ProjectDetails extends Component {
   

 constructor(props){
        super(props);
        var date = new Date().getDate();  
        var month = new Date().getMonth() + 1;  
        var year = new Date().getFullYear();  
        var thedate = date + '/' + month + '/' + year 

        this.state = {
            isLoading:true,
            projectId:this.props.navigation.state.params.JSON_ListView_Clicked_Item,
            ProjectName:this.props.navigation.state.params.JSON_projectname,
            Project: '',
            User: '',
            Date: '',
            Status: '',
            ManPowerDescription: '',
            Unit: '',
            Description: '',
            Location: '',
            Sendforcheckdate:'',
            temperature: 0,
            weatherCondition: null,
            date:thedate,
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

 

 sendForCheckAll() {
            this.setState({
              isLoading: true,
            });
           const { currentUser } = firebase.auth();
           firebase.firestore().collection("directManPower").where("Status", "==", '0').where("User", "==", currentUser.uid) 
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
          
           firebase.firestore().collection("indirectManPower").where("Status", "==", '0').where("User", "==", currentUser.uid) 
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

           firebase.firestore().collection("equipment").where("Status", "==", '0').where("User", "==", currentUser.uid) 
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
                        })    
                    }
                });
            });


  }

  sendforchecConditionsAlert=()=>{
      Alert.alert(
        'Send For Check',
        'Are you sure?',
        [
          {text: 'Yes', onPress: () => this.sendForCheckAll()},
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
                    <Button  title='Signout'  onPress={() => this.props.navigation.navigate('Login')}  titleStyle={{ color: '#F57C00', fontSize:14, marginLeft:70, }} type='clear' />
                </View>
          </View>
          <View style={styles.welcomebarmain} >
              <View style={styles.welcomebarleft}>
                          <Button title="Go Back" onPress={this.goToHome} titleStyle={{ borderWidth:1, padding:'10%', marginLeft:'-50%', paddingTop:'6%', paddingBottom:'6%', borderWidth:1, borderRadius:5, fontSize:12,  borderColor:'#F57C00', color: '#F57C00' }} type='clear' />
              </View>
              <View style={styles.welcomebarright}>
                  <DatePicker
                            style={{width: 150,}}
                            date={this.state.date} 
                            mode="date"  
                            placeholder="select date"
                            format="D/M/YYYY"
                            minDate="01-01-2020"
                            maxDate="01-01-2021"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                              dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                              },
                              dateInput: {
                                marginLeft: 36,
                                borderColor:'#F57C00', color: '#F57C00', borderRadius:5,
                              },
                              dateText:{
                                  color: '#F57C00',
                                  justifyContent: 'flex-start'
                                }
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                          />    
              </View>
          </View>
          <ScrollView style={styles.scrollcontainer}>

                <View style={styles.welcomebar}>
                    <Text style={styles.welcomebartitle}> { this.state.ProjectName } </Text>
                </View>

                <View style={styles.weathern}>
                    {isLoading ? <Text style={styles.weathcolor}>Fetching The Weather</Text> : <Weather weather={weatherCondition} temperature={temperature} /> }
                </View>

                <View style={styles.weatherbottom}>
                      <Image style={styles.weatherimage} source={require('../assets/yahoo_weather_b.png')} />
                </View>

                <View style={styles.directmanPowerBox}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DirectManPower', { JSON_ListView_Clicked_Item: this.state.date, JSON_projectId: this.state.projectId, })} >  
                      <View style={styles.multiPojBox1}>
                                <Image  style={styles.directmanPowerBoxImage} source={require('../assets/directMP1.png')} />
                                <Button title="Direct Manpower" titleStyle={{ color: '#000', fontSize:10, }} type='clear' />     
                      </View>
                    </TouchableOpacity> 

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('IndirectManPower', { JSON_ListView_Clicked_Item: this.state.date, JSON_projectId: this.state.projectId, })} >  
                      <View style={styles.multiPojBox2}>
                              <Image  style={styles.directmanPowerBoxImage} source={require('../assets/directMP2.png')} />
                              <Button title="Indirect Manpower" titleStyle={{ color: '#000', fontSize:10, }} type='clear' /> 
                      </View>
                    </TouchableOpacity>   
                </View>

                <View style={styles.directmanPowerBox}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Equipment', { JSON_ListView_Clicked_Item: this.state.date, JSON_projectId: this.state.projectId, })} > 
                      <View style={styles.multiPojBox1}>
                                <Image  style={styles.directmanPowerBoxImage} source={require('../assets/directMP3.png')} />
                                <Button title="Equipment" titleStyle={{ color: '#000', fontSize:10, }} type='clear' />      
                      </View>
                    </TouchableOpacity> 
                      
                      <View style={styles.multiPojBox2}>
                              <Image  style={styles.directmanPowerBoxImage} source={require('../assets/directMP4.png')} />
                              <Button title="Send for Check" onPress={this.sendforchecConditionsAlert} titleStyle={{ color: '#000', fontSize:10, }} type='clear' />  
                      </View>
                </View>

          </ScrollView>

      </View>

    )
  }
}

 

export default ProjectDetails;
//export default withFirebaseHOC(ProjectDetails)
