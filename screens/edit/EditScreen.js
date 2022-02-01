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

export default function EditScreen(props) {
    
  const gallo =props.route.params.gallo;
  const value = props.route.params.value;
  const field = props.route.params.field;  
  //console.log(gallo)    
  const [dataRegister, setDataRegister] = useState({
      line:gallo.line, 
      year:gallo.year.toString(), 
      gender:gallo.gender, 
      plaque:gallo.plaque.toString(), 
      ring:gallo.ring.toString(),
      leftLeg:gallo.leftLeg,
      rightLeg:gallo.rightLeg,
      noise:gallo.noise,
  });
  const dataRegisterHandler = (field, data) => {
        setDataRegister({...dataRegister, [field]: data});
  };
  const SaveChange= ()=>{
    if(!(dataRegister.line =='' || dataRegister.year =='' || 
    dataRegister.plaque =='' || dataRegister.ring =='')){
      UpdateRooster();
      Alert.alert('actualizacion exitosa');
      props.navigation.navigate('Consult', {value, field});
    }else{
      Alert.alert('llene todo los campos')
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////
  const UpdateRooster = () => { 
    db.transaction(txn => {
      txn.executeSql(
        `UPDATE gallos SET line= ?, year= ?, gender= ?, plaque= ?, ring= ?, leftLeg= ?, rightLeg= ?, noise= ? WHERE id= ${gallo.id}`,
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
          console.log(`${dataRegister.line} actualizado`);
        },
        error => {
          console.log("error on adding rooster " + error.message);
        },
      );
    });
  };
////////////////////////////////////////////////////////////////////////////////////////
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
                edit={gallo.gender}
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
                    edit={gallo.leftLeg}
                />
            </View>
            {/*right leg marks*/}
            <View style={[styles.container,{marginBottom:0}]}>
                <ButtonGroup 
                    data={form.rightLeg.data} 
                    onPress={dataRegisterHandler} 
                    field={form.rightLeg.field}
                    edit={gallo.rightLeg}
                />
            </View>
            {/*noise  marks*/}
            <View style={styles.container}>
              <ButtonGroup 
                    data={form.noise.data} 
                    onPress={dataRegisterHandler} 
                    field={form.noise.field}
                    edit={gallo.noise}
                />
            </View>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={SaveChange}
              >
                <Text style={styles.title}>guardar</Text>
            </TouchableOpacity>
            </View>
      </ScrollView>
    </SafeAreaView>
    );
  }
  
  