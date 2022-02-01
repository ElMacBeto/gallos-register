import { View, Text, Alert, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { openDatabase } from "react-native-sqlite-storage";
import { useState , useEffect} from 'react/cjs/react.development';
import * as colors from '../../constants/color';
import {icons} from '../../constants/imageRoute';

const db = openDatabase({
  name: "db",
});

export default function ConsultScreen({route, navigation}) {

  const [gallos, setGallos] = useState([]);
  
  const field = route.params.field;
  const value = route.params.value;
  //const gallos = route.params.gallosData;
  //console.log(route.params.field)
  //delte function
  const deleteRooster = async (id) => {
    await db.transaction(  (txn) => {
      txn.executeSql(
      `DELETE FROM gallos WHERE id=${id}`,
      [],
      (sqlTxn, res) => {
        getRoosterByField(field, value);
        console.log("gallo eliminado");
        
        
      },
      error => {
        console.log("error on getting categories " + error.message);
      },
    );
  });
};
  // delete confirm function
  const confirmDelete = (id) =>   
    Alert.alert(
      "Eliminar gallo",
      "Estas seguro de eliminar el gallo?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteRooster(id)
         }
      ]
    );
  //-------------------------------------------------------------------------------------------------------
  const getRoosterByField = async (field, value ) => {
    await db.transaction( (txn) => {
      txn.executeSql(
      `SELECT * FROM gallos WHERE ${field}=${value}`,
      [],
      (sqlTxn, res) => {
        //console.log("gallos retrieved successfully");
        let len = res.rows.length;

        if (len > 0) {
          let results = [];
          for (let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            results.push({  
                id: item.id, 
                line: item.line,  
                year: item.year,
                gender: item.gender,
                plaque: item.plaque,
                ring: item.ring,
                leftLeg: item.leftLeg,
                rightLeg: item.rightLeg,
                noise: item.noise  
              });    
          }
          setGallos(results);
        }
      },
      error => {
        console.log("error on getting categories " + error.message);
      },
    );
  });
};
  //-------------------------------------------------------------------------------------------------------
  useEffect(async() => {
    navigation.addListener('focus', async () => {
      await getRoosterByField(field, value);

    })
  }, []);
  //--------------------------------------------------------------------------------------------------------
  return (
    <ScrollView style={{flex:1,width:'100%', backgroundColor:colors.background1}}>
    <View style={{width:'100%', marginVertical:10}}>
      {
        gallos.map((gallo, index) => {
          const genderImage = gallo.gender=='macho' ? icons.rooster:icons.hen;
          const genderImageSize= gallo.gender == 'macho'? {width:45, height:40}:{width:40, height:45}

          return(
            <View style={styles.infocard} key={index}>
              <View style={[styles.header, {flexDirection:'row'}]}>
                  <Text style={{color:'white', fontSize:18, marginStart:6}}>numero de placa: {gallo.plaque}</Text>
                  <View style={{ marginHorizontal:6, paddingHorizontal:6, borderColor:'white',borderWidth:1, borderRadius:50, justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity
                      style={{}}
                      onPress={() => confirmDelete(gallo.id)}
                    >
                      <Text style={{color:'white',fontSize:18, }}>X</Text>
                    </TouchableOpacity>
                  </View>
              </View>
                <Text style={styles.textGallo}> {gallo.line} del año {gallo.year}</Text>
                <Text style={[styles.textGallo,{borderTopWidth:1}]}>Marcas:</Text>
                <Text style={styles.marcas}>Pata izquierda {gallo.leftLeg}, pata derecha {gallo.rightLeg}, nariz {gallo.noise}</Text>
                <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
                  <TouchableOpacity
                    style={{}}
                    onPress={()=> navigation.navigate('Edit',{gallo, value, field})}
                  >
                    <Image
                      source={icons.edit}
                      style={{width:27, height:30}}
                    />
                  </TouchableOpacity>
                  <Image
                    source={genderImage}
                    style= {genderImageSize}
                  />
                </View>
            </View> 
          )
        })
      }
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  infocard:{
    flex:1,
    alignSelf:'center',
    width:'80%',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderRadius:10,
    padding:10,
    marginVertical:5,
    backgroundColor: colors.white
  },
  header:{
    width:'100%',
    backgroundColor:colors.infoCardHeader,
    justifyContent:'space-between',
    color:'white',
    padding:3,
    borderRadius:10
  },
  textGallo:{
    width:'100%',
    textAlign:'left',
    marginLeft:10,
    marginRight:10,
    marginVertical:5,
    fontSize:16,
    color: colors.infoCardTitle
  },
  marcas:{
    width:'100%',
    textAlign:'left',
    marginLeft:10,
    marginRight:10,
    marginVertical:5,
    fontSize:16,
    color: colors.infoCardTitle
  }
})