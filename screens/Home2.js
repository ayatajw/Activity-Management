import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'

import { Image } from 'react-native-elements'

class Home2 extends Component {
  handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }

  goToHome = () => this.props.navigation.navigate('Home')

  render() {
    return (
      <View style={styles.container}>


<View style={styles.logobar}>
      <Image style={styles.logobarLogo} source={require('../assets/logo-small.png')} />
      <Text style={{width: 120, height: 10,}}>_  </Text>
  </View>

<View style={styles.welcomebar}>
    <Text style={styles.welcomebartitle}>Welcome <Text style={{width: 200, height: 10, color:'#000',}}>Ayat</Text> </Text>
    <Text style={styles.welcomebarMarkAttendance}>Mark Attendance</Text>
  </View>

<View style={styles.activeproj1}>
    <Text style={styles.activeprojtitle}>ACTIVE  <Text style={{ fontWeight: "bold",}}>PROJECTS</Text></Text>
    <Text style={styles.activeprojtitle}> </Text>
  </View>

<View>
      <Image style={styles.activeprojPic} source={require('../assets/p-01.png')} />
  </View>

<View style={{ borderWidth: 2, borderColor: '#f3f3f3'}}>
    <Text style={styles.activeprojprojp1}>Florence Galleria</Text>
    <Text style={styles.activeprojprojp2}>Pakistan First Luxury Boutique Mall </Text>
  </View>
  


<View style={styles.activeproj2}>
    <Text style={styles.activeprojtitle}>PAST <Text style={{ fontWeight: "bold",}}>PROJECTS</Text></Text>
    <Text style={styles.activeprojtitle}> </Text>
  </View>



<View style={{flexDirection: 'row', width:300, marginTop:-10, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', }}>

      <View style={styles.multiPojBox}>
          <Image style={{width: 150, height: 124, }} source={require('../assets/p1.png')} />
          <View style={{ borderWidth: 2, borderColor: '#f3f3f3', width: 150, height: 40,}}>
              <Text style={styles.projp1}>Florence Galleria</Text>
              <Text style={styles.projp2}>Pakistan Luxury Boutique Mall </Text>
          </View>    
       </View>
       
      <View style={styles.multiPojBox}>
          <Image style={{width: 150, height: 124, }} source={require('../assets/p2.png')} />
          <View style={{ borderWidth: 2, borderColor: '#f3f3f3', width: 150, height: 40,}}>
              <Text style={styles.projp1}>Florence Galleria</Text>
              <Text style={styles.projp2}>Pakistan Luxury Boutique Mall </Text>
          </View>    
       </View>
        
       
</View>
 
<View style={{marginTop:20, }}>
      <Image style={styles.addPbtn} source={require('../assets/add_p.png')} />
</View>
  

 <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToHome}
          titleStyle={{
            color: '#F57C00'
          }}
          type='clear'
        />




     <Button  title='Signout'  onPress={this.handleSignout}  titleStyle={{ color: '#F57C00'  }} type='clear' />


      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

welcomebartitle: { 
    marginTop: 5, paddingVertical: 8, color: "#20232a", textAlign: "center", fontSize: 15, width:200, height:50, fontWeight: "bold"
  },

multiPojBox: { 
    flexDirection: 'column', padding:5, paddingTop:0, paddingRight:0,
  },

projp1: { 
    marginTop: 0, paddingVertical: 0, color: "#000", textAlign: "center", fontSize: 10, fontWeight: "bold"
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
    padding: 7, marginTop: 10, borderColor:'#555c8f', borderRadius:5,  borderWidth: 1, color: "#555c8f", textAlign: "center", fontSize: 13, width:120, height:35,  fontWeight: "bold"
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


logobar: {
          flex: 0, marginTop:10, padding: 0, flexDirection: 'row', 
},

logobarLogo: {
          width: 200, height: 50, 
},

welcomebar: {
          flex: 0, marginTop:10, flexDirection: 'row', backgroundColor: "#f2f2f2",
},

activeproj1: {
          flex: 0, marginLeft:30, marginTop:10, marginBottom:-15, flexDirection: 'row', backgroundColor: "#fff",
},

activeproj2: {
          flex: 0, marginLeft:20, marginTop:10, marginBottom:-5, flexDirection: 'row', backgroundColor: "#fff",
}


















})

export default withFirebaseHOC(Home2)
