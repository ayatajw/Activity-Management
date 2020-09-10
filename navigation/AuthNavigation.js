import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import ForgotPassword from '../screens/ForgotPassword'
import Home2 from '../screens/Home2'
import AddProject from '../screens/AddProject'
import MarkAttendance from '../screens/MarkAttendance'
import ProjectDetails from '../screens/ProjectDetails'
import GeoDistance from '../screens/GeoDistance'
import Geofence from '../screens/Geofence'

import DirectManPower from '../screens/DirectManPower'
import addAcitvity from '../screens/addAcitvity'
import AcitvityDetails from '../screens/AcitvityDetails'


import Equipment from '../screens/Equipment'
import addActivityEquipment from '../screens/addActivityEquipment'
import AcitvityDetailsEquipment from '../screens/AcitvityDetailsEquipment'




import SendForCheck from '../screens/SendForCheck'
import addActivitySendForCheck from '../screens/addActivitySendForCheck'
import AcitvityDetailsSendForCheck from '../screens/AcitvityDetailsSendForCheck'



import IndirectManPower from '../screens/IndirectManPower'
import addAcitvityIndirectManPower from '../screens/addAcitvityIndirectManPower'
import AcitvityDetailsIndirectManPower from '../screens/AcitvityDetailsIndirectManPower'

import siteSupervisor from '../screens/siteSupervisor'
import Dashboard from '../screens/Dashboard'


const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    ForgotPassword: { screen: ForgotPassword },
     Home2: { screen: Home2 },
     AddProject: { screen: AddProject },
     MarkAttendance: { screen: MarkAttendance },
     ProjectDetails: { screen: ProjectDetails },
     GeoDistance: { screen: GeoDistance },
     Geofence: { screen: Geofence },
     
     DirectManPower: { screen: DirectManPower },
     addAcitvity: { screen: addAcitvity },
     AcitvityDetails: { screen: AcitvityDetails },


     IndirectManPower: { screen: IndirectManPower },
     addAcitvityIndirectManPower: { screen: addAcitvityIndirectManPower },
     AcitvityDetailsIndirectManPower: { screen: AcitvityDetailsIndirectManPower },


     SendForCheck: { screen: SendForCheck },
     addActivitySendForCheck: { screen: addActivitySendForCheck },
     AcitvityDetailsSendForCheck: { screen: AcitvityDetailsSendForCheck },


     Equipment: { screen: Equipment },
     addActivityEquipment: { screen: addActivityEquipment },
     AcitvityDetailsEquipment: { screen: AcitvityDetailsEquipment },
     siteSupervisor: { screen: siteSupervisor },
     Dashboard: { screen: Dashboard }




  },
  
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  },
)

export default AuthNavigation


