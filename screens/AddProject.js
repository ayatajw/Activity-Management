import React, { Component, Fragment } from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Button, Image, Text, CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import { withFirebaseHOC } from '../config/Firebase'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password should be at least 6 characters '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required'),
  check: Yup.boolean().oneOf([true], 'Please check the agreement')
})

class AddProject extends Component {
  state = {
    passwordVisibility: true,
    confirmPasswordVisibility: true,
    passwordIcon: 'ios-eye',
    confirmPasswordIcon: 'ios-eye'
  }

  goToLogin = () => this.props.navigation.navigate('Login')
  goToHome = () => this.props.navigation.navigate('Home')
 

   

  handleOnAddProject = async (values, actions) => {
    const { name, email, password } = values

    try {
      const response = await this.props.firebase.signupWithEmail(
        email,
        password
      )

      if (response.user.pid) {
        const { pid } = response.user
        const projectData = { email, name, pid }
        await this.props.firebase.createNewProject(projectData)
        this.props.navigation.navigate('App')
      }
    } catch (error) {
      // console.error(error)
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

  render() {
    const {
      passwordVisibility,
      confirmPasswordVisibility,
      passwordIcon,
      confirmPasswordIcon
    } = this.state
    return (
      <KeyboardAvoidingView
        style={styles.container}
        enabled
        behavior='padding'

      >

<View style={{ flex: 0, marginTop:0, width:400, marginLeft:10, padding: 0, flexDirection: 'row', }}>
    <View style={styles.logobar}>
      <Image style={styles.logobarLogo} source={require('../assets/logo-small.png')} />
    </View>
    <View style={styles.logobarSignout}>
      <Button  title='Signout'  onPress={this.handleSignout}  titleStyle={{ color: '#F57C00', marginLeft:70, }} type='clear' />
    </View>
 </View>
 <View style={styles.welcomebar}>
    <Text style={styles.welcomebartitle}>Welcome <Text style={{width: 200, height: 10, color:'#000',}}>Ayat</Text> </Text>
    <Text style={styles.welcomebarMarkAttendance} onPress={this.goToMarkAttendance}> </Text>
</View>



        <ScrollView>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              check: false
            }}
            onSubmit={(values, actions) => {
              this.handleOnAddProject(values, actions)
            }}
            validationSchema={validationSchema}>
            {({
              handleChange,
              values,
              handleSubmit,
              errors,
              isValid,
              touched,
              handleBlur,
              isSubmitting,
              setFieldValue
            }) => (
                <Fragment>
                  <FormInput
                    name='name'
                    value={values.name}
                    onChangeText={handleChange('name')}
                    placeholder='Project name'
                    iconName='md-person'
                    iconColor='#2C384A'
                    onBlur={handleBlur('name')}
                  />
                  <ErrorMessage errorValue={touched.name && errors.name} />
                  <FormInput
                    name='email'
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder='Enter email'
                    autoCapitalize='none'
                    iconName='ios-mail'
                    iconColor='#2C384A'
                    onBlur={handleBlur('email')}
                  />
                  <ErrorMessage errorValue={touched.email && errors.email} />
                   
                   
                   
                  <CheckBox
                    containerStyle={styles.checkBoxContainer}
                    checkedIcon='check-box'
                    iconType='material'
                    uncheckedIcon='check-box-outline-blank'
                    title='Agree to terms and conditions'
                    checkedTitle='You agreed to our terms and conditions'
                    checked={values.check}
                    onPress={() => setFieldValue('check', !values.check)}
                  />
                  <View style={styles.buttonContainer}>
                    <FormButton
                      buttonType='outline'
                      onPress={handleSubmit}
                      title='AddProject'
                      buttonColor='#F57C00'
                      disabled={!isValid || isSubmitting}
                      loading={isSubmitting}
                    />
                  </View>
                  <ErrorMessage errorValue={errors.general} />

                </Fragment>
              )}
          </Formik>
           

        <Button
          title="Home"
          onPress={this.goToHome}
          titleStyle={{
            color: '#F57C00'
          }}
          type='clear'
        />


        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 25
  },
  checkBoxContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff'
  },




 welcomebartitle: { 
      marginTop: 5, marginLeft:20, paddingVertical: 8, color: "#20232a", textAlign: "left", fontSize: 15, width:200, height:50, fontWeight: "bold"
    },

  welcomebarMarkAttendance: { 
      padding: 7, marginTop: 10, borderColor:'#555c8f', borderRadius:5,  borderWidth: 0, color: "#555c8f", textAlign: "center", fontSize: 13, width:120, height:35,  fontWeight: "bold"
    },
    
  welcomebar: {
            flex: 0, margin: 10, marginTop:10, width:370, flexDirection: 'row', backgroundColor: "#f2f2f2",
  },

  logobar: {
                width:200,   
  },


  logobarSignout: {
                width:150,  
  },

  logobarLogo: {
            width: 150, height: 37, 
  },



})

export default withFirebaseHOC(AddProject)
