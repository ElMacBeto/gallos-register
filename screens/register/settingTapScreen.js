import { View, TextInput, TouchableOpacity, Text, ScrollView, Alert,SafeAreaView} from 'react-native';
import { useEffect, useState } from 'react';
// my assets
import styles from '../../styles/globalStyles';
import * as colors from '../../constants/color';
// field data of form
import { form } from '../../constants/form';
// my component
import ButtonGroup from '../../components/ButtonGroup';
// database
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: "db",
});

export default function SettingsTapScreen(props) {
  
  useEffect(()=>{
    props.navigation.addListener('focus', () => {
      setDataRegister({line:'', 
      year:'', 
      gender:'macho', 
      plaque:'', 
      ring:'',
      leftLeg:'afuera',
      rightLeg:'afuera',
      noise:'izquierda',
      });
    })

  },[])
  // data to save 
  const [dataRegister, setDataRegister] = useState({
        line:'', 
        year:'', 
        gender:'macho', 
        plaque:'', 
        ring:'',
        leftLeg:'afuera',
        rightLeg:'afuera',
        noise:'izquierda',
  });
  // change field values to save
  const dataRegisterHandler = (field, data) => {
        setDataRegister({...dataRegister, [field]: data});
  };
  // validate and save rooster
  const addNewRosster= ()=>{
      if(!(dataRegister.line =='' || dataRegister.year =='' || 
           dataRegister.plaque =='' || dataRegister.ring =='')){
        
        addRooster(dataRegister);
        Alert.alert('guardado exisosamente');
        setDataRegister({line:'', 
          year:'', 
          gender:'macho', 
          plaque:'', 
          ring:'',
          leftLeg:'afuera',
          rightLeg:'afuera',
          noise:'izquierda',
        });
      props.navigation.navigate('Home');
      }else{
        Alert.alert('llene todo los campos')
      }
      
      
  };
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

    return (
      <SafeAreaView style={styles.background}>
        <ScrollView style={{width:'100%'}}>
          <View style={[styles.container,{alignSelf:'center'}]}>
            <TextInput
              value={dataRegister.line}
              onChangeText={(value)=> dataRegisterHandler('line', value)}
              placeholderTextColor={colors.placeholder}
              placeholder={form.line}
              style={[styles.formField, {marginTop:20}]}
            />
            <TextInput
              value={dataRegister.year}
              keyboardType='numeric'
              onChangeText={(value)=> dataRegisterHandler('year', value)}
              placeholderTextColor={colors.placeholder}
              placeholder={form.year}
              style={styles.formField}
            />
            {/**gender select */}
            <View style={styles.container}>
              <ButtonGroup 
                  data={form.gender.data} 
                  onPress={dataRegisterHandler} 
                  field={form.gender.field}
                  edit={dataRegister.gender}
                />
            </View>
            <TextInput
              value={dataRegister.plaque}
              keyboardType='numeric'
              onChangeText={(value)=> dataRegisterHandler('plaque', value)}
              placeholderTextColor={colors.placeholder}
              placeholder={form.plaque}
              style={styles.formField}
            />
            <TextInput
              value={dataRegister.ring}
              keyboardType='numeric'
              onChangeText={(value)=> dataRegisterHandler('ring', value)}
              placeholderTextColor={colors.placeholder}
              placeholder={form.ring}
              style={styles.formField}
            />
            {/*left leg marks*/}
            <View style={[styles.container,{marginBottom:0}]}>
              <ButtonGroup 
                  data={form.leftLeg.data} 
                  onPress={dataRegisterHandler} 
                  field={form.leftLeg.field}
                  edit={dataRegister.leftLeg}
                />
            </View>
            {/*right leg marks*/}
            <View style={[styles.container,{marginBottom:0}]}>
              <ButtonGroup 
                  data={form.rightLeg.data} 
                  onPress={dataRegisterHandler} 
                  field={form.rightLeg.field}
                  edit={dataRegister.rightLeg}
              />
            </View>
            {/*noise  marks*/}
            <View style={styles.container}>
              <ButtonGroup 
                data={form.noise.data} 
                onPress={dataRegisterHandler} 
                field={form.noise.field}
                edit={dataRegister.noise}
              />
            </View>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={addNewRosster}
              >
                <Text style={styles.title}>Add</Text>
            </TouchableOpacity>
            </View>
      </ScrollView>
    </SafeAreaView>
    );
  }
  