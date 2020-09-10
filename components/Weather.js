import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';

const Weather = ({ weather, temperature }) => {
  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[weather].color }
      ]}
    >
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          size={120}
          name={weatherConditions[weather].icon}
          color={'#fff'}
        />
       
      </View>
      

<View style={styles.bodyContainermain}>


      <View style={styles.bodyContainer1}>
         <Text style={styles.tempText}>{temperature}˚<Text style={styles.tempcentigrate}>c</Text></Text>
      </View>

      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
        <Text style={styles.subtitle}>
          {weatherConditions[weather].subtitle}
        </Text>
      </View>
</View>


    </View>
  );
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
     backgroundColor:'red',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor:'#0e2477'
  },
  tempText: {
    fontSize: 40,
    color: '#fff'
  },

  tempcentigrate: {
    fontSize:0,

  },
  
  bodyContainer: {
    flex: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 15,
    marginBottom: 10,

    
  },

  bodyContainer1: {
    flex: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 5,
    marginBottom: 10,
    marginTop:20,

  },

 bodyContainermain: {
    flex: 0,
    backgroundColor:'#0e2477', 
    flexDirection: 'row',
  },

  title: {
    fontSize: 14,
    color: '#fff',
  },
  subtitle: {
    fontSize: 12,
    color: '#fff'
  }
});

export default Weather;