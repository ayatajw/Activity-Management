import React from 'react'
import { Image } from 'react-native-elements'

const AppLogo = () => (
  <Image
    source={require('../assets/flame.png')}
    style={{ width: 200, height: 128 }}
  />
)

export default AppLogo
