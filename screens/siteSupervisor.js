import React, { Component } from 'react'
import { FlatList, Alert, StyleSheet, ScrollView, Text, ActivityIndicator, View, TouchableOpacity } from 'react-native'
import { Button, Image } from 'react-native-elements'
import moment from 'moment'
import firebase from '../config/Firebase/firebaseDb';
import { getDistance, getPreciseDistance } from 'geolib';
import styles from '../utils/homecss.js';

class Home extends Component {

    constructor(props) {
        super(props); 
              this.state = {
                isLoading: true,
                currentUser: null,
                todaydate: '',
                latitude:'',
                longitude:'',
                userDetails:'', 
                projDetails:'',     
                uid:'',
                projectID:'',
                userName:'',
                email:'',
                totdist1:'',
                totdist2:'',
                checkInMark: []
              };

        const { currentUser } = firebase.auth()
        var todaydate = new Date().getDate();
        var todaydate = moment() .utcOffset("Asia/Karachi") .format('DD/MM/YYYY');
        this.firestoreRef = firebase.firestore().collection('mark').where("email", "==", currentUser.email).where("fulldate", "==", todaydate);
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
          this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
           
          const dbRefUser = firebase.firestore().collection('users').doc(currentUser.uid);
          dbRefUser.get().then((res) => {
            if (res.exists) {
              const userDetails = res.data();
              this.setState({
                key: res.id,
                projectID: userDetails.projectID,
                userName: userDetails.name,
                isLoading: false
              });
                      const dbRefProj = firebase.firestore().collection('projects').doc(userDetails.projectID);
                        dbRefProj.get().then((res) => {
                          if (res.exists) {
                            const projDetails = res.data();
                            this.setState({
                              key: res.id,
                              ProjDescription: projDetails.Description,
                              Projoffice1latitude: projDetails.office1latitude,
                              Projoffice1longitude: projDetails.office1longitude,
                              Projoffice2latitude: projDetails.office2latitude,
                              Projoffice2longitude: projDetails.office2longitude,
                              ProjImage: projDetails.Image,
                              ProjectName: projDetails.ProjectName,
                              isLoading: false
                            });
                          } else {
                            console.log("Document does not exist!");
                          }
                        });

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

 getCollection = (querySnapshot) => {
    const checkInMark = [];
    querySnapshot.forEach((res) => {
      const { uid, email, date, day, year, month, hours, min, sec, fulldate } = res.data();
      checkInMark.push({
        key: res.id,
            res,
            uid,
            email,
            date,
            day,
            year,
            month,
            hours,
            min,
            sec,
            fulldate,
      });
    });
    this.setState({
      checkInMark,
      isLoading: false,
   });
  }


  componentWillUnmount(){
    this.unsubscribe();
  }

  handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }


readUserDataCheckout() {

       this.setState({
          isLoading: true,
        });
        var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };

        function success(pos) {
          var crd = pos.coords;
          var todaydate = moment() .utcOffset("Asia/Karachi") .format('DD/MM/YYYY');
          const { currentUser } = firebase.auth()
           firebase.firestore().collection("mark").where("User", "==", currentUser.uid).where("fulldate", "==", todaydate)
            .onSnapshot(function(snapshot) {
                snapshot.docChanges().forEach(function(change) {
                    if (change.type === "added") {
                        var thehours = new Date().getHours();  
                        var themin = new Date().getMinutes();  
                        var thesec = new Date().getSeconds();  
                        var checkoutlatitude = crd.latitude;
                        var checkoutlongitude = crd.longitude;
                      const updateDBRef = firebase.firestore().collection('mark').doc(change.doc.id);
                        updateDBRef.set({
                          date: change.doc.data()['date'],
                          day: change.doc.data()['day'],
                          email: change.doc.data()['email'],
                          fulldate: change.doc.data()['fulldate'],
                          hours: change.doc.data()['hours'],
                          checkouthours:thehours,
                          min: change.doc.data()['min'],
                          checkoutmin:themin,
                          sec: change.doc.data()['sec'],
                          checkoutsec:thesec,      
                          month: change.doc.data()['month'],
                          User: change.doc.data()['User'],
                          year: change.doc.data()['year'],
                          latitude:change.doc.data()['latitude'],
                          longitude:change.doc.data()['longitude'],
                          checkoutlatitude:checkoutlatitude,
                          checkoutlongitude:checkoutlongitude,
                        }).then((docRef) => {
                          this.setState({
                            date: '',
                            day: '',
                            email: '',
                            fulldate: '',
                            hours: '',
                            min: '',
                            month: '',
                            User: '',
                            sec: '',
                            year: '',
                            checkouthours:'',
                            checkoutmin:'',
                            checkoutsec:'',
                            latitude:'',
                            longitude:'',
                            checkoutlatitude:'',
                            checkoutlongitude:'',
                            isLoading: false,
                          });
                        })    
                    }
                });
            });
        }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
}
   
 

  goToAddProject = () => this.props.navigation.navigate('AddProject')
  goToProjectDetails = () => this.props.navigation.navigate('ProjectDetails')
  goToSignup = () => this.props.navigation.navigate('Signup')
  goToMarkAttendance = () => this.props.navigation.navigate('MarkAttendance')

MarkAttendanceCN() {

   this.setState({
      isLoading: true,
    });
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
         function success(pos) {
              var crd = pos.coords;
              const { currentUser } = firebase.auth()
              var User = currentUser.uid;
              var email = currentUser.email;
              var newDate = new Date();
              var date = newDate.getDate();
              var theday = newDate.getDay();
              var daylist = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
              var day = daylist[theday];
              var month = new Date().getMonth() + 1;
              var year = new Date().getFullYear(); //Current Year
              var hours = new Date().getHours(); 
              var min = new Date().getMinutes(); 
              var sec = new Date().getSeconds();
              var latitude = crd.latitude;
              var longitude = crd.longitude;
              var fulldate = moment() .utcOffset("Asia/Karachi") .format('DD/MM/YYYY');
              firebase.firestore().collection("mark").add({
                  User,
                  email,
                  date,
                  day,
                  year,
                  month,
                  hours,
                  min,
                  sec,
                  fulldate,
                  latitude,
                  longitude,
              });
        }

        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
  }



inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }


CheckInRange=()=>{
    //  { latitude: 33.621714, longitude: 73.134473 } for test local
    //  { latitude: 33.720359, longitude: 73.073802 } thedis1: Beverly Centre
    //  { latitude: 33.646007, longitude: 72.996270 } thedis2: NSTP office
 
   var thedis1 = getDistance(
      { latitude: this.state.latitude, longitude: this.state.longitude },
      { latitude: this.state.Projoffice1latitude, longitude: this.state.Projoffice1longitude }
    );

   var thedis2 = getDistance(
      { latitude: this.state.latitude, longitude: this.state.longitude },
      { latitude: this.state.Projoffice2latitude, longitude: this.state.Projoffice2longitude }
    );
   var totdist1 = thedis1;
   var totdist2 = thedis2;

   if(totdist1 <= '500' || totdist2 <= '500')
      {
        Alert.alert(
            `Check in?`,
            `Distance from\nBeverly Centre: (${totdist1} M)\n NSTP: (${totdist2} M)`,
            [
              {text: 'Yes', onPress: () => this.MarkAttendanceCN()},
              {text: 'No', onPress: () => console.log('No action'), style: 'cancel'},
            ],
            { 
              cancelable: true 
            }
          );
      }else{
        Alert.alert(
            'Sorry!\nYou are not in Office/Workplace',
            `Beverly: ${totdist1 / 1000} KM (${totdist1} M)\nNSTP: ${totdist2 / 1000} KM (${totdist2} M)`,
            [
              {text: 'OK', onPress: () => console.log('No action'), style: 'cancel'},
            ],
            { 
              cancelable: true 
            }
          );
      };
  };


CheckOutRange=()=>{
    //  { latitude: 33.621714, longitude: 73.134473 } for test local
    //  { latitude: 33.720359, longitude: 73.073802 } thedis1: Beverly Centre
    //  { latitude: 33.646007, longitude: 72.996270 } thedis2: NSTP office

   var thedis1 = getDistance(
      { latitude: this.state.latitude, longitude: this.state.longitude },
      { latitude: this.state.Projoffice1latitude, longitude: this.state.Projoffice1longitude }
    );
   var thedis2 = getDistance(
      { latitude: this.state.latitude, longitude: this.state.longitude },
      { latitude: this.state.Projoffice2latitude, longitude: this.state.Projoffice2longitude }
    );
   var totdist1 = thedis1;
   var totdist2 = thedis2;

   if(totdist1 <= '500' || totdist2 <= '500')
      {
        Alert.alert(
            `Check Out?`,
            `Distance from\nBeverly Centre: (${totdist1} M)\n NSTP: (${totdist2} M)`,
            [
              {text: 'Yes', onPress: () => this.readUserDataCheckout()},
              {text: 'No', onPress: () => console.log('No action'), style: 'cancel'},
            ],
            { 
              cancelable: true 
            }
          );
      }else{
        Alert.alert(
            'Sorry!\nYou are not in Office/Workplace',
            `Beverly: ${totdist1 / 1000} KM (${totdist1} M)\nNSTP: ${totdist2 / 1000} KM (${totdist2} M)`,
            [
              {text: 'OK', onPress: () => console.log('No action'), style: 'cancel'},
            ],
            { 
              cancelable: true 
            }
          );
      };

  };



 CheckInBTN = () => {
    return (<Text style={styles.welcomebarMarkAttendance} onPress={() => this.CheckInRange()}>Check In</Text>);
  };

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
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Home')} >
                                          <Image style={styles.headerlogobarLogo} source={require('../assets/logo-small.png')} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.headerlogobarSignout}>
                                    <Button  title='Signout'  onPress={() => this.props.navigation.navigate('Login')}  titleStyle={{ color: '#F57C00', fontSize:14, marginLeft:70, }} type='clear' />
                                </View>
                          </View>

                          <View style={styles.welcomebar}>
                              <Text style={styles.welcomebartitle}> Welcome! {this.state.userName}  </Text>
                              <TouchableOpacity style={{ flexDirection:'row' }}>    
                                   <View style={styles.BoxSubMain2}>   
                                      <FlatList data={this.state.checkInMark} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => (<Text style={styles.welcomebarMarkAttendance2} onPress={() => this.CheckOutRange(item.key)} >Check Out</Text>)} ListEmptyComponent={this.CheckInBTN} />
                                   </View>
                              </TouchableOpacity>
                          </View>

                      <View style={styles.multiPojBox}>
                          <View style={styles.activeproj1}>
                            <Text style={styles.activeprojtitle}>ACTIVE <Text style={{ fontWeight: "bold",}}>PROJECT</Text></Text>
                             
                          </View>

                          <View>
                          <TouchableOpacity style={styles.projimagefull} onPress={() => this.props.navigation.navigate('ProjectDetails', { JSON_ListView_Clicked_Item: this.state.projectID, JSON_projectname: this.state.ProjectName })} >
                              <Image style={styles.activeprojPic} source={require('../assets/p-01.png')} />
                          </TouchableOpacity>
                          </View>

                          <View style={styles.projdec}>                 
                              <Text style={styles.activeprojName} >{this.state.ProjectName} </Text>
                              <Text style={styles.activeprojDesc} >{this.state.ProjDescription} </Text>
                          </View>
                      </View>  
                  </View> 
               </ScrollView> );     
  }
}

 
export default Home;