import { View, TextInput, TouchableOpacity, Text, ScrollView, Alert,SafeAreaView} from 'react-native';
import styles from '../../styles/globalStyles';
import { form } from '../../constants/form';
import * as colors from '../../constants/color';
import ButtonGroup from '../../components/ButtonGroup';
import { useState } from 'react';
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: "db",
});

export default function SettingsTapScreen(props) {
    const [dataRegister, setDataRegister] = useState({
        line:'', 
        year:'', 
        gender:'roster', 
        plaque:'', 
        ring:'',
        leftLeg:'adentro',
        rightLeg:'adentro',
        noise:'izquierda',
      });
    const dataRegisterHandler = (field, data) => {
        setDataRegister({...dataRegister, [field]: data});
    }
    const addNewRosster= ()=>{
      console.log(dataRegister)
      Alert.alert('guardado exisosamente');
      addRooster(dataRegister);
      setDataRegister({line:'', 
        year:'', 
        gender:'roster', 
        plaque:'', 
        ring:'',
        leftLeg:'adentro',
        rightLeg:'adentro',
        noise:'izquierda',
      });
      props.navigation.navigate('Home');
    }
  //////////////////////////////////////////////////////////////////////////////////////
  const addRooster = () => {
    
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO gallos (line, year, gender, plaque, ring, leftLeg, rightLeg, noise) VALUES (?,?,?,?,?,?,?,?)`,
        [ dataRegister.line, 
          dataRegister.year, 
          dataRegister.gender, 
          dataRegister.plaque, 
          dataRegister.ring,
          dataRegister.leftLeg,
          dataRegister.rightLeg,
          dataRegister.noise
        ],
        (sqlTxn, res) => {
          console.log(`${dataRegister.line} category added successfully`);
        },
        error => {
          console.log("error on adding rooster " + error.message);
        },
      );
    });
  };
////////////////////////////////////////////////////////////////////////////////////////
    return (
      <SafeAreaView style={[styles.background2, {width:'100%',justifyContent:'center',alignItems:'center'}]}>
        <ScrollView style={{width:'100%'}}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <TextInput
              value={dataRegister.line}
              onChangeText={(value)=> dataRegisterHandler('line', value)}
              placeholderTextColor={colors.placeholder}
              placeholder={form.line}
              style={[styles.formField, {marginTop:20}]}
            />
            <TextInput
              value={dataRegister.year}
              onChangeText={(value)=> dataRegisterHandler('year', value)}
              placeholderTextColor={colors.placeholder}
              placeholder={form.year}
              style={styles.formField}
            />
            {/**gender select */}
            <View style={{marginTop:20, marginBottom:20}}>
              <ButtonGroup 
                data={form.gender.data} 
                onPress={dataRegisterHandler} 
                field={form.gender.field}/>
            </View>
            <TextInput
              value={dataRegister.plaque}
              onChangeText={(value)=> dataRegisterHandler('plaque', value)}
              placeholderTextColor={colors.placeholder}
              placeholder={form.plaque}
              style={styles.formField}
            />
            <TextInput
              value={dataRegister.ring}
              onChangeText={(value)=> dataRegisterHandler('ring', value)}
              placeholderTextColor={colors.placeholder}
              placeholder={form.ring}
              style={styles.formField}
            />
            {/*left leg marks*/}
            <View style={{marginTop:20}}>
              <ButtonGroup 
                data={form.leftLeg.data} 
                onPress={dataRegisterHandler} 
                field={form.leftLeg.field}/>
            </View>
            {/*right leg marks*/}
            <View style={{marginTop:20}}>
              <ButtonGroup 
                data={form.rightLeg.data} 
                onPress={dataRegisterHandler} 
                field={form.rightLeg.field}/>
            </View>
            {/*noise  marks*/}
            <View style={{marginTop:20}}>
              <ButtonGroup 
                data={form.noise.data} 
                onPress={dataRegisterHandler} 
                field={form.noise.field}/>
            </View>
              <TouchableOpacity
                style={{width:150, borderBottomWidth:1, borderColor:'black', backgroundColor:'green', borderRadius:10, marginTop:20, marginBottom:20}}
                onPress={addNewRosster}
              >
                <Text style={styles.title}>Add</Text>
            </TouchableOpacity>
            </View>
      </ScrollView>
    </SafeAreaView>
    );
  }
  
  