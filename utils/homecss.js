import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    

container: {  flex: 0, marginTop: 0, backgroundColor: '#f2f2f2', },
preloader: { left: 0, right: 0, top: 0, bottom: 0, position: 'absolute', alignItems: 'center', justifyContent: 'center' },

viewAll: { flex: 0, backgroundColor: '#f2f2f2', alignItems: 'center', justifyContent: 'center', },


projp1: { marginTop: 0, paddingVertical: 0, color: "#000", textAlign: "center", fontSize: 10, fontWeight: "bold" },
projp2: { marginTop: 0, paddingVertical: 0, color: "#a6a6a6", textAlign: "center", fontSize: 10, },


activeprojprojp1: { width:300, marginTop: 0, paddingVertical: 0, color: "#000", textAlign: "center", fontSize: 15, fontWeight: "bold"},


activeprojName: { marginTop: 5, textAlign: "center", fontSize: 14, color: '#000', fontWeight:'bold', },
activeprojDesc: { marginTop: 0, marginBottom:5, color: "#a6a6a6", textAlign: "center", fontSize: 12, },


/*Welcome*/ 
welcomebar: { marginTop:'2%', paddingBottom:0, width:'90%', flexDirection: 'row', borderWidth:0, backgroundColor: "#f2f2f2", },
welcomebartitle: { marginTop: '2%', marginLeft:'3%', color: "#20232a",   fontSize: 12, width:'60%', borderWidth:0,  fontWeight: "bold" },
welcomebarMarkAttendance2: { marginTop: '1%', marginBottom:'1%', marginLeft:'10%', padding:5, borderColor:'#F57C00', borderRadius:5,  borderWidth: 1, color: "#F57C00", textAlign: "center", fontSize: 12, width:100,   fontWeight: "bold" },
welcomebarMarkAttendance: { marginTop: '1%', marginBottom:'1%', marginLeft:'10%', padding:5, borderColor:'#555c8f', borderRadius:5,  borderWidth: 1, color: "#555c8f", textAlign: "center", fontSize: 12, width:100,   fontWeight: "bold" },
/*Welcome End*/
 

/*addPbtn: { width: 320, height: 37, },*/  


/*Header*/ 
header:{ width:'90%', backgroundColor:'#fff', marginTop:'10%', padding: 5, flexDirection: 'row', },
headerlogobar: { width:'50%',  },
headerlogobarSignout: { width:'50%', },
headerlogobarLogo: { width: 150, height: 37, },
/*Header End*/


/*logomain: { flex: 0, marginTop:'10%', borderWidth:1, width:'90%', padding: 0, flexDirection: 'row', },
logobar: { width:180, },
logobarSignout: { width:'50%', },
logobarLogo: { width: 150, height: 37, },*/

multiPojBox: { width:'90%', marginTop:'2%', alignItems: 'center', justifyContent: 'center', borderWidth:1, borderColor: '#f3f3f3'  },
activeprojtitle: { marginTop: 5, paddingVertical: 8, color: "#555c8f", marginLeft:'1%', fontSize: 14, width:'90%', },
activeprojPic: { width: 320, height: 200, },  
activeproj1: {   marginTop:0, marginBottom:0, width:'100%', backgroundColor: "#fff", },
activeproj2: {    marginTop:10, marginBottom:-5, flexDirection: 'row', backgroundColor: "#fff", },
projdec:{ borderWidth: 0, backgroundColor:'#fff', width:'100%',  },
projimagefull: { borderWidth:0, width:'100%' }




});