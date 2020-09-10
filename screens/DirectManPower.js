import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Image, Icon } from 'react-native-elements'
import { Button } from 'react-native-elements'
import firebase from '../config/Firebase/firebaseDb';

class DirectManPower extends Component {
 

  constructor(props) {
    super(props);
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var thedate = date + '/' + month + '/' + year; 
      const { currentUser } = firebase.auth();
 
      this.firestoreRef = firebase.firestore().collection('directManPower').where("Date", "==", this.props.navigation.state.params.JSON_ListView_Clicked_Item).where("User", "==", currentUser.uid);
      this.state = {
        isLoading: true,
        projectId:this.props.navigation.state.params.JSON_projectId,
        directManPowerArray: []
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
    const directManPowerArray = [];
    querySnapshot.forEach((res) => {
      const { ManPowerDescription, Unit, Qty, Status, Description, Location } = res.data();
      directManPowerArray.push({
        key: res.id,
        res,
        ManPowerDescription,
        Unit,
        Qty,
        Status,
        Description,
        Location,
      });
    });
    this.setState({
      directManPowerArray,
      isLoading: false,
   });
  }


  addAcitvity = () => this.props.navigation.navigate('addAcitvity')
  goToHome = () => this.props.navigation.navigate('Home')
  //goToAddProject = () => this.props.navigation.navigate('AddProject')
  goToProjectDetails = () => this.props.navigation.navigate('ProjectDetails')
  //goToSignup = () => this.props.navigation.navigate('Signup')
  //goToMarkAttendance = () => this.props.navigation.navigate('MarkAttendance')
  goBack = () => this.props.navigation.navigate('ProjectDetails')
  AcitvityDetails = () => this.props.navigation.navigate('AcitvityDetails')

 

  render() {
    //const { index } = this.state;
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }   
    return (
      <View style={styles.container}>
            <View style={styles.viewAll}>
                    <View style={styles.header} >
                          <View style={styles.headerlogobar}>
                              <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Home')} >
                                    <Image style={styles.headerlogobarLogo} source={require('../assets/logo-small.png')} />
                              </TouchableOpacity>
                          </View>
                          <View style={styles.headerlogobarSignout}>
                              <Button  title='Signout'  onPress={() => this.props.navigation.navigate('Login')}  titleStyle={{ color: '#F57C00', fontSize:14, marginLeft:'20%', marginTop:'-5%', }} type='clear' />
                          </View>
                    </View>


                    <View style={styles.welcomebar}>
                        <Text style={styles.welcomebartitle}> Direct Manpower <Text style={{fontSize: 10}}>({this.props.navigation.state.params.JSON_ListView_Clicked_Item}) </Text></Text>
                        <Text style={styles.gobackbtn} onPress={this.goBack}>Go Back</Text>
                    </View>
                          <ScrollView style={styles.scrollcontainer}>
                                    {
                                      this.state.directManPowerArray.map((item, i) => {
                                        return ( 
                                                  <TouchableOpacity style={styles.directmanPowergrid} onPress={() => {item.Status == '0' ? this.props.navigation.navigate('AcitvityDetails', { userkey: `${JSON.stringify(item.key)}`, }) : null  } } >  
                                                    <View style={styles.directmanPowerBoxmain}>
                                                        <View style={styles.directmanPowerBox}>
                                                              <View style={styles.Box1}>                                                                       
                                                                      <Text style={styles.heading1}>Unit:</Text> 
                                                                      <Text style={styles.heading1}>Qty:</Text>  
                                                                      <Text style={styles.heading1}>Location:</Text>        
                                                              </View>
                                                              <View style={styles.Box2}>                                                                       
                                                                      <Text style={styles.desc}>{item.Unit}</Text> 
                                                                      <Text style={styles.desc}>{item.Qty}  </Text>  
                                                                      <Text style={styles.desc}> {item.Location} </Text>   
                                                              </View>
                                                        </View>
                                                        <View style={styles.Boxfull}>
                                                                 <View style={styles.Box3}>
                                                                     <Text style={styles.heading3}>Manpower Description:</Text>   
                                                                     <Text style={styles.desc3}>{item.ManPowerDescription}</Text> 
                                                                     <Text style={styles.heading3}>Activity Description:</Text>   
                                                                     <Text style={styles.desc3}>{item.Description}</Text> 
                                                              </View>
                                                        </View>
                                                    </View>  
                                                  </TouchableOpacity>
                                                );
                                              })
                                            }
                          </ScrollView>                      
            </View>
       <View style={{  position: 'absolute', bottom:10, right:10, cursor:'pointer',  backgroundColor:'#0e2477', borderRadius:40, width:60, height:60,  }}> 
          <Button title="+" onPress={() => this.props.navigation.navigate('addAcitvity', { JSON_projectId: this.state.projectId, })} titleStyle={{ color: '#fff', marginTop:'8%', fontSize:20, }} type='clear' />
       </View>
</View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
    backgroundColor: '#f2f2f2',
     
     
  },



viewAll: {
    flex: 0,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },

scrollcontainer: { backgroundColor: '#f2f2f2', width:'90%' },

preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },

/*Header*/ 
header:{ width:'90%', backgroundColor:'#fff', marginTop:'10%', padding: 5, flexDirection: 'row', },
headerlogobar: { width:'70%',  },
headerlogobarSignout: { width:'30%',},
headerlogobarLogo: { width: 150, height: 37, },
/*Header End*/



/*welcomebar*/
welcomebar: { marginTop:5, width:'90%', flexDirection: 'row', backgroundColor: "#f2f2f2", },
welcomebartitle: { marginTop: '2%', marginLeft:'4%', paddingVertical: 5, color: "#20232a",  fontSize: 12, width:'70%',  fontWeight: "bold" },
gobackbtn: { padding: 7, marginTop: 5, borderColor:'#F57C00', borderRadius:5,  borderWidth: 1, color: "#F57C00", textAlign: "center", fontSize: 10, width:'20%', fontWeight: "bold" },
/*welcomebar End*/ 
 



 
directmanPowergrid: { width:'96%', alignItems: 'center', justifyContent: 'center', marginLeft:'0%', marginTop:'2%', },
directmanPowerBoxmain: { paddingTop:'2%', paddingBottom:'2%',  alignItems: 'center', justifyContent: 'center', borderWidth:0,  width:'95%',   borderRadius:8, borderColor:'#d8d8d8', backgroundColor:'#fff',  },  
directmanPowerBox: { flexDirection: 'row', width:'90%',   marginTop:0,     },  
Boxfull: {  padding:0, paddingBottom:10, width:'90%',      },
Box1: {  padding:0, paddingTop:5,  width:'40%', borderWidth:0,  },
Box2: {  padding:0, borderWidth:0, width:'60%',  },
Box3: {  padding:0, borderWidth:0, width:'100%',  },
heading1: { marginTop: 0, color: "#f8cc82",  fontSize: 12, },
heading3: { marginTop: '2%', color: "#f8cc82",  fontSize: 12,},
desc: { marginTop: 5,   color: "#333", fontSize: 10, },
desc3: { marginTop: 0, marginLeft:'0%',   color: "#333", fontSize: 10, },


 

 




 
 
   
})

 
export default DirectManPower;
 