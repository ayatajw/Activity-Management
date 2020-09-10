import React, { Component } from 'react';
import { Alert, TouchableOpacity, Text, Image, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../config/Firebase/firebaseDb';

class AcitvityDetailsIndirectManPower extends Component {

  constructor() {
    super();
    this.state = {
       Project:'',
      User:'',
      Date: '',
      Status:'',
      ManPowerDescription: '',
      Contractor:'',
      Unit: '',
      Qty: '',
      Description: '',
      Location: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const { navigation } = this.props;
    const dbRef = firebase.firestore().collection('indirectManPower').doc(JSON.parse(navigation.getParam('userkey')));
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          Project: user.Project,
          User: user.User,
          Date: user.Date,
          Status: user.Status,
          ManPowerDescription: user.ManPowerDescription,
          Contractor: user.Contractor,
          Unit: user.Unit,
          Qty: user.Qty,
          Description: user.Description,
          Location: user.Location,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateIndirectMP(theProject=this.state.Project,theUser=this.state.User,theDate=this.state.Date,theStatus=this.state.Status) {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('indirectManPower').doc(this.state.key);
    updateDBRef.set({
      Project: theProject,
      User: theUser,
      Date: theDate,
      Status: theStatus,
      ManPowerDescription: this.state.ManPowerDescription,
      Contractor: this.state.Contractor,
      Unit: this.state.Unit,
      Qty: this.state.Qty,
      Description: this.state.Description,
      Location: this.state.Location,
    }).then((docRef) => {
      this.setState({
        key: '',
        Project:'',
        User:'',
        Date: '',
        Status:'',
        ManPowerDescription: '',
        Contractor:'',
        Unit: '',
        Qty: '',
        Description: '',
        Location: '',
        isLoading: false,
      });
      this.props.navigation.navigate('IndirectManPower');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteUser() {
    const { navigation } = this.props;
    const dbRef = firebase.firestore().collection('indirectManPower').doc(JSON.parse(navigation.getParam('userkey')));
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('IndirectManPower');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Activity',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteUser()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>


<View style={styles.headermain} >
          <View style={styles.header} >
                <View style={styles.headerlogobar}>
                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Home')} >
                          <Image style={styles.headerlogobarLogo} source={require('../assets/logo-small.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerlogobarSignout}>
                <Text style={styles.gobackbtn} onPress={() => this.props.navigation.navigate('IndirectManPower')}>Go Back</Text>                    
                </View>
          </View>
          <View style={styles.welcomebar}>
              <Text style={styles.welcomebartitle}>Indirect Manpower</Text>
               
          </View>
</View>

<View style={styles.viewgrid}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'ManPowerDescription'}
              value={this.state.ManPowerDescription}
              onChangeText={(val) => this.inputValueUpdate(val, 'ManPowerDescription')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              numberOfLines={3}
              placeholder={'Contractor'}
              value={this.state.Contractor}
              onChangeText={(val) => this.inputValueUpdate(val, 'Contractor')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              numberOfLines={3}
              placeholder={'Unit'}
              value={this.state.Unit}
              onChangeText={(val) => this.inputValueUpdate(val, 'Unit')}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <TextInput
              numberOfLines={3}
              placeholder={'Qty'}
              value={this.state.Qty}
              onChangeText={(val) => this.inputValueUpdate(val, 'Qty')}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={3}
              placeholder={'Description'}
              value={this.state.Description}
              onChangeText={(val) => this.inputValueUpdate(val, 'Description')}
          />
        </View>

                <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={3}
              placeholder={'Location'}
              value={this.state.Location}
              onChangeText={(val) => this.inputValueUpdate(val, 'Location')}
          />
        </View>



        <View style={styles.updatebutton}>
          <Button
            title='Update'
            onPress={() => this.updateIndirectMP()} 
            color="#19AC52"
          />
        </View>
        
        <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="red"
          />
        </View>

        

 </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },


viewgrid: {
    flex: 1,
    padding: 35,
    paddingTop:50,
    marginTop:0,
  },



  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc', 
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
  button: {
    marginBottom: 7, 
  },
  updatebutton: {
    marginBottom: 7, 
    marginTop:30,
  },
  goback: {
    marginBottom: 7,
    marginTop: 7,  
  },


/*Header*/ 
headermain: {  alignItems: 'center', justifyContent: 'center', },
header:{ width:'90%',  backgroundColor:'#fff', marginTop:'10%', padding: 5, flexDirection: 'row', },
headerlogobar: { width:'70%',  },
headerlogobarSignout: { width:'30%',},
headerlogobarLogo: { width: 150, height: 37, },
/*Header End*/


welcomebar: { marginTop:'2%', width:'90%', flexDirection: 'row', backgroundColor: "#f2f2f2",  },
welcomebartitle: { marginTop: '2%', marginLeft:'3%', paddingVertical: 8, color: "#20232a",  fontSize: 12, width:'60%', fontWeight: "bold" },
gobackbtn: { paddingTop: '10%', paddingBottom: '10%', marginTop: '0%', borderColor:'#555c8f', borderRadius:5,  borderWidth: 1, color: "#F57C00", textAlign: "center", fontSize: 10, fontWeight: "bold"},
 










})

export default AcitvityDetailsIndirectManPower;