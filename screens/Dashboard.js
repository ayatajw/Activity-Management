import React, { Component } from 'react'
import { FlatList, Alert, StyleSheet, ScrollView, Text, ActivityIndicator, View, TouchableOpacity } from 'react-native'
import { Button, Image } from 'react-native-elements'
import moment from 'moment'
import firebase from '../config/Firebase/firebaseDb';
import { getDistance, getPreciseDistance } from 'geolib';
import styles from '../utils/dascboard.css.js';

class Dashboard extends Component {

    constructor(props) {
        super(props); 
              this.state = {
                isLoading: true,
                currentUser: null,
                todaydate: '',
                latitude:'',
                longitude:'',
                userDetails:'', 
                  
                uid:'',
                 
                userName:'',
                email:'',
                
                 
              };

        const { currentUser } = firebase.auth()
        var todaydate = new Date().getDate();
        var todaydate = moment() .utcOffset("Asia/Karachi") .format('DD/MM/YYYY');
         
      }
      
      handleSignout = async () => {
        try {
          await this.props.firebase.signOut()
          this.props.navigation.navigate('Auth')
        } catch (error) {
          console.log(error)
        }
      }
      
      componentDidMount() {
          const { navigation } = this.props;
          const { currentUser } = firebase.auth()
          this.setState({ currentUser })
          
           
          const dbRefUser = firebase.firestore().collection('users').doc(currentUser.uid);
          dbRefUser.get().then((res) => {
            if (res.exists) {
              const userDetails = res.data();
              this.setState({
                key: res.id,
                projectID: userDetails.projectID,
                userRole: userDetails.role,
                userName: userDetails.name,
                isLoading: false
              }); if (userDetails.role === "2"){ this.props.navigation.navigate('Home') };
                 
            } else {
              console.log("Document does not exist!");
            }
          });

          navigator.geolocation.getCurrentPosition(
           (position) => {
             //console.log(position);
             this.setState({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
               error: null,
             });
           },
           (error) => this.setState({ error: error.message }),
           { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
         );

      }

  


  componentWillUnmount(){
    //this.unsubscribe();
  }

  handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }

 
 

  goToAddProject = () => this.props.navigation.navigate('AddProject')
  goToProjectDetails = () => this.props.navigation.navigate('ProjectDetails')
  goToSignup = () => this.props.navigation.navigate('Signup')
  goToMarkAttendance = () => this.props.navigation.navigate('MarkAttendance')

 
 
  


 
  render() {
            console.disableYellowBox = true;
            const { currentUser } = this.state;
            const { navigation } = this.props;
            if(this.state.isLoading){
              return(
                <View style={styles.preloader}>
                  <ActivityIndicator size="large" color="#9E9E9E"/>
                </View>
              )
            }
    return ( <ScrollView style={styles.container}>
                    <View style={styles.viewAll}>
                          <View style={styles.header} >
                                <View style={styles.headerlogobar}>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Dashboard')} >
                                          <Image style={styles.headerlogobarLogo} source={require('../assets/logo-small.png')} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.headerlogobarSignout}>
                                    <Button  title='Signout'  onPress={() => this.props.navigation.navigate('Login')}  titleStyle={{ color: '#F57C00', fontSize:14, marginLeft:70, }} type='clear' />
                                </View>
                          </View>

                          <View style={styles.welcomebar}>
                              <Text style={styles.welcomebartitle}> Welcome! Admin {this.state.userName}  </Text>
                              <TouchableOpacity style={{ flexDirection:'row' }}>    
                                   <View style={styles.BoxSubMain2}>   
                                       
                                   </View>
                              </TouchableOpacity>
                          </View>

                           

                      <View style={styles.bodyview}>
                          <View style={styles.directmanPowerBox}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('DirectManPower', { JSON_ListView_Clicked_Item: this.state.date, JSON_projectId: this.state.projectId, })} >  
                                <View style={styles.multiPojBox1}>
                                          <Image  style={styles.directmanPowerBoxImage} source={require('../assets/directMP1.png')} />
                                          <Button title="Users" titleStyle={{ color: '#000', fontSize:10, }} type='clear' />     
                                </View>
                              </TouchableOpacity> 

                              <TouchableOpacity onPress={() => this.props.navigation.navigate('IndirectManPower', { JSON_ListView_Clicked_Item: this.state.date, JSON_projectId: this.state.projectId, })} >  
                                <View style={styles.multiPojBox2}>
                                        <Image  style={styles.directmanPowerBoxImage} source={require('../assets/directMP2.png')} />
                                        <Button title="Projects" titleStyle={{ color: '#000', fontSize:10, }} type='clear' /> 
                                </View>
                              </TouchableOpacity>   
                          </View>
                      </View>    
                       
                  </View> 
               </ScrollView> );     
  }
}

 
export default Dashboard;