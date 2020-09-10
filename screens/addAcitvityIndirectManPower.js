 
import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
//import firebase from '../config/Firebase';
import firebase from '../config/Firebase/firebaseDb';
//import { withFirebaseHOC } from '../config/Firebase'


class addAcitvityIndirectManPower extends Component {
  constructor(props) {
    super(props);
    this.dbRef = firebase.firestore().collection('indirectManPower');
    this.state = {
      Project:'',
      projectId:this.props.navigation.state.params.JSON_projectId,
      User:'',
      Date: '',
      Status:'',
      ManPowerDescription: '',
      Contractor:'',
      Unit: '',
      Qty: '',
      Description: '',
      Location: '',
      isLoading: false
    };
  }



componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year,
    });
  }



  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  addAcitvity() {
    if(this.state.ManPowerDescription === ''){
     alert('Fill at least your ManPower Description!')
    } else {
      this.setState({
        isLoading: true,
      });      
      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
      this.dbRef.add({
        Project:this.state.projectId,
        User:currentUser.uid,
        Date: this.state.date,
        Status:'0',
        ManPowerDescription: this.state.ManPowerDescription,
        Contractor: this.state.Contractor,
        Unit: this.state.Unit,
        Qty: this.state.Qty,
        Description: this.state.Description,
        Location: this.state.Location,
      }).then((res) => {
        this.setState({
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
        this.props.navigation.navigate('IndirectManPower')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

goBack = () => this.props.navigation.navigate('IndirectManPower')

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
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={2}
              placeholder={'ManPower Description'}
              value={this.state.ManPowerDescription}
              onChangeText={(val) => this.inputValueUpdate(val, 'ManPowerDescription')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={2}
              placeholder={'Contractor'}
              value={this.state.Contractor}
              onChangeText={(val) => this.inputValueUpdate(val, 'Contractor')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={2}
              placeholder={'Unit'}
              value={this.state.Unit}
              onChangeText={(val) => this.inputValueUpdate(val, 'Unit')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={2} 
              keyboardType='numeric'
              placeholder={'Qty field should be numbers only'}
              value={this.state.Qty}
              onChangeText={(val) => this.inputValueUpdate(val, 'Qty')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={2}
              placeholder={'Activity Description'}
              value={this.state.Description}
              onChangeText={(val) => this.inputValueUpdate(val, 'Description')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={2}
              placeholder={'Location'}
              value={this.state.Location}
              onChangeText={(val) => this.inputValueUpdate(val, 'Location')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Add Acitvity'
            onPress={() => this.addAcitvity()} 
            color="#19AC52"
          />
        </View>


        <View style={styles.buttongoBack}>
            <Button
              title="Go Back"
              onPress={this.goBack}
              titleStyle={{
                color: '#F57C00'
              }}
              type='clear'
            />
        </View>


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    marginTop: 30,
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
    marginTop: 30,
  },
   buttongoBack: {
    marginBottom: 7, 
    marginTop: 15,
  }

})

export default addAcitvityIndirectManPower;