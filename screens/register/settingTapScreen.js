import { View, TextInput, TouchableOpacity, Text, ScrollView, Alert} from 'react-native';
import styles from '../../styles/globalStyles';
import { form } from '../../constants/form';
import * as colors from '../../constants/color';
import ButtonGroup from '../../components/ButtonGroup';
import { useState } from 'react';

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

    return (
      <View style={[styles.background2, {justifyContent:'center',alignItems:'center'}]}>
        <TextInput
          value={dataRegister.line}
          onChangeText={(value)=> dataRegisterHandler('line', value)}
          placeholderTextColor={colors.placeholder}
          placeholder={form.line}
          style={styles.formField}
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
          style={{width:150, borderBottomWidth:1, borderColor:'black', backgroundColor:'green', borderRadius:10, marginTop:20}}
          onPress={addNewRosster}
        >
          <Text style={styles.title}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  