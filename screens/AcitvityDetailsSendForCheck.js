import React, { Component } from 'react';
import { Alert, Text, Image, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../config/Firebase/firebaseDb';

class AcitvityDetailsSendForCheck extends Component {

  constructor() {
    super();
    this.state = {
      ManPowerDescription: '',
      Unit: '',
      Qty: '',
      Description: '',
      Location: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const { navigation } = this.props;
    const dbRef = firebase.firestore().collection('sendForCheck').doc(JSON.parse(navigation.getParam('userkey')));
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          ManPowerDescription: user.ManPowerDescription,
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

  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('sendForCheck').doc(this.state.key);
    updateDBRef.set({
      ManPowerDescription: this.state.ManPowerDescription,
      Unit: this.state.Unit,
      Qty: this.state.Qty,
      Description: this.state.Description,
      Location: this.state.Location,
    }).then((docRef) => {
      this.setState({
        key: '',
        ManPowerDescription: '',
        Unit: '',
        Qty: '',
        Description: '',
        Location: '',
        isLoading: false,
      });
      console.log('Activity Added')
      this.props.navigation.navigate('SendForCheck');
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
    const dbRef = firebase.firestore().collection('sendForCheck').doc(JSON.parse(navigation.getParam('userkey')));
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('SendForCheck');
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



  <View style={{ flex: 0,  backgroundColor:'#fff', marginTop:25, width:400, padding: 10, flexDirection: 'row', }}>
      <View style={styles.logobar}>
          <Image style={styles.logobarLogo} source={require('../assets/logo-small.png')} />
      </View>
      <View style={styles.logobarSignout}>
          <Image style={styles.logobarrighticon} source={require('../assets/nvicon.png')} />
      </View>
  </View>
  <View style={styles.welcomebar}>
      <Text style={styles.welcomebartitle}> Manage Send For Check </Text>
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
            onPress={() => this.updateUser()} 
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

        <View style={styles.goback}>
          <Button  
            title='Go Back'
            onPress={() =>  this.props.navigation.navigate('SendForCheck')}
            color="#F57C00"
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


logobar: {
              width:200,   
},


logobarSignout: {
              width:180,  
},

logobarLogo: {
          width: 150, height: 37, 
},


logobarrighticon: {
          width: 50,  marginTop:10, marginLeft:110, 
},

welcomebar: {
          flex: 0, marginTop:5, width:350, flexDirection: 'row', backgroundColor: "#f2f2f2", marginLeft:20
},
welcomebartitle: { 
    marginTop: 10, marginLeft:10, paddingVertical: 8, color: "#20232a",  fontSize: 18, width:250, height:40, fontWeight: "bold"
  },













})

export default AcitvityDetailsSendForCheck;