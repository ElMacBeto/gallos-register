import { StyleSheet } from "react-native";
import * as colors from '../constants/color';

const styles = StyleSheet.create({
    background:{
        flex:1, 
        backgroundColor: colors.background1, 
        alignItems:'center', 
        borderTopEndRadius:100, 
        borderBottomStartRadius:100
    },
    background2:{
        width:'100%',
        height:'100%',
        flex:1, 
        position:'absolute',
        backgroundColor: colors.background1, 
        alignItems:'center', 
        borderTopStartRadius:100, 
        borderBottomEndRadius:100
    },
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        height:'100%',
        width:'100%',
        paddingRight:15,
        paddingLeft:15,
    },
    containerRow: {
        flexDirection:'row',
    },

    title:{
        color:'white',
        fontSize:20,
        margin:10,
        textAlign:'center',

    },
    title2:{
        color:'white',
        fontSize:14,
        margin:10,
        textAlign:'center',
    },
    title3:{
        color:'black',
        fontSize:14,
        margin:10,
        textAlign:'center',
    },
    formField:{
        width:'90%',
        borderWidth:2,
        borderColor:colors.white,
        borderRadius:5,
        fontSize:15,
        color:'white',
        padding:5,
        margin:5,
    },
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
    infoCard:{
        width:'90%', 
        backgroundColor:colors.white, 
        borderRadius:40, 
        alignItems:'center', 
        justifyContent:'center', 
        marginTop:80, 
        marginBottom:10
    }
  });

  export default styles;