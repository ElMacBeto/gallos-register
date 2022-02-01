import { StyleSheet } from "react-native";
import * as colors from '../constants/color';

const styles = StyleSheet.create({
    background:{
        flex:1, 
        width:'100%',
        backgroundColor: colors.background1, 
        alignItems:'center', 
        justifyContent:'center',
        borderTopEndRadius:100, 
        borderBottomStartRadius:0
    },
    container: {
        marginVertical:15,
        justifyContent: 'center',
        alignItems:'center',
        width:'80%',
    },
    containerRow: {
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        color:'white',
        fontSize:20,
        margin:10,
        textAlign:'center',

    },
    title2:{
        color:'white',
        fontSize:18,
        margin:10,
        textAlign:'center',
    },
    title3:{
        color:'black',
        fontSize:20,
        margin:10,
        textAlign:'center',
    },
    
    formField:{
        width:'90%',
        borderWidth:2,
        borderColor:colors.white,
        borderRadius:5,
        fontSize:18,
        color:'white',
        padding:5,
        margin:5,
    }, 
    // register and edit screens styles
    button:{
        justifyContent:'center',
        alignItems:'center',
        margin:2,
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#fff8',
        padding:8
    },
    buttonSelect:{
        justifyContent:'center',
        alignItems:'center',
        margin:2,
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#fff',
        padding:8
    },
    //summary info card style
    infoCard:{
        width:'90%', 
        backgroundColor:colors.white, 
        borderRadius:40, 
        alignItems:'center', 
        justifyContent:'center', 
        marginTop:80, 
        marginBottom:10
    },
    //register screen
    submitBtn:{
        width:150, 
        borderBottomWidth:1, 
        borderColor:'black', 
        backgroundColor:colors.submit, 
        borderRadius:10, 
        marginTop:20, 
        marginBottom:20,
    }
  });

  export default styles;