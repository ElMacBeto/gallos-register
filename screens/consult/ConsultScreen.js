import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: "db",
});
const gallo ={
  line:'giro',
  year:2020,
  gender:'macho',
  plaque:10,
  ring:20,
  leftLeg:'afuera',
  reghtLeg:'afuera',
  noise:'izquierda',
}

export default function ConsultScreen({route}) {
  const { refreshList } = route.params;
  console.log(refreshList);
  return (
    <View style={styles.infocard}>
      <Text style={styles.plaque}>numero de placa: {gallo.plaque}</Text>
      <Text>Gallo {gallo.line} del año {gallo.year}</Text>
      <Text>Marcas:</Text>
      <Text>pata izquierda {gallo.leftLeg}, pata derecha {gallo.leftLeg}, nariz {gallo.noise}</Text>
      <View style={{flexDirection:'row', alignItems:'stretch'}}>
        <Text>delete </Text>
        <Text> edit</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infocard:{
    alignSelf:'center',
    width:'80%',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:20,
    padding:5
  },
  plaque:{
    width:'100%',
    backgroundColor:'red',
    textAlign:'center',
    color:'white',
    padding:3,
    borderRadius:10
  }
})