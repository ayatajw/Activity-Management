import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    
container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },


scrollcontainer: { backgroundColor: '#f2f2f2', width:'90%', },

/*Header*/ 
header:{ width:'90%', backgroundColor:'#fff', marginTop:'10%', padding: 5, flexDirection: 'row', },
headerlogobar: { width:'50%',  },
headerlogobarSignout: { width:'50%', },
headerlogobarLogo: { width: 150, height: 37, },
/*Header End*/

welcomebarmain:{ flex: 0, backgroundColor:'#fff', width:'90%', marginBottom:10, marginTop:1,    flexDirection: 'row', justifyContent:'center' },
welcomebarleft: {  width:'50%',   borderWidth:0,  },
welcomebarright: { width:'50%',  borderWidth:0,  justifyContent:'center', alignItems: 'center', },

welcomebar: { marginTop:0, marginBottom:5,  backgroundColor: "#f2f2f2", },
welcomebartitle: { marginTop: '0%', color: "#20232a",  fontSize: 16, width:'100%', fontWeight: "bold" },

directmanPowerBox: { flexDirection: 'row', width:'100%', marginTop:10, alignItems: 'center', justifyContent: 'center', },  
multiPojBox1: {  padding:10,  width:150, height: 'auto',  alignItems:'center', backgroundColor:'#fff', borderRadius:8, borderColor:'#d8d8d8', borderWidth:1, marginLeft:'0%', marginRight:'3%' },
multiPojBox2: {  padding:10, width:150, height: 'auto',  alignItems:'center',  backgroundColor:'#fff', borderRadius:8, borderColor:'#d8d8d8', borderWidth:1, marginLeft:'0%', },
directmanPowerBoxImage: { width: 60, height: 58,  },

weather: { marginTop:10, width:400, alignItems:'center', },
weatherbottom: { marginTop:0,  alignItems:'center', },
weathern: { marginTop:0, width:'100%', height:'auto', backgroundColor: '#fff' },
weatherimage: { width: 350, height: 50, },
weathcolor:{ color:'green', fontSize:10, marginLeft:'30%'},
 
 

});