import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState , useEffect} from 'react/cjs/react.development';
import { RadioButton } from 'react-native-paper';
import { useCallback } from 'react';
//my components
import Summary from '../../components/Summary';
// my assets
import * as colors from '../../constants/color';
import styles from '../../styles/globalStyles';
import { icons } from '../../constants/imageRoute';
// database
import {getDBConnection, saveRoosterItems, getRoosterItems, createTable} from '../../database/dataBase-services'

export default function HomeScreen() {

  //-- use navigate function 
  const navigation = useNavigation();
  // change placeholder text hook----------------------------------------------------------------------
  const [placeholdertText, setPlaceholderText] = useState('year: ');
  //select field for search
  const [checked, setChecked] = useState('year');
  //The data to search for roosters is used in the search function. -------------------------------------------------
  const [dataSearch, setDataSearch] =useState('');
  //refresh summary and text input field, create talbe and get init data --------------------------------------------------------------
  useEffect(async() => {
    setPlaceholderText('year:');
    setChecked('year');
    setDataSearch(''); 
    
    const db = await getDBConnection();
    await createTable(db);
    const storedRoosterItems = await getRoosterItems(db);
    console.log(storedRoosterItems)
    
  }, []);
 //search function, ahorita tengo implementada la funcion de add en la tabla para pobrar... esta si funciona bien------------------------------------------------------------------------------------
  const Search= async ()=>{
    if(!dataSearch==''){
      try {
        const newRooster={
          line:'radio', 
          year:'2020', 
          gender:'macho', 
          plaque:'1', 
          ring:'1',
          leftLeg:'afuera',
          rightLeg:'afuera',
          noise:'izquierda',
        };
        const db = await getDBConnection();
        await saveRoosterItems(db,newRooster);
        await getRoosterItems(db);
      } catch (error) {
        console.error(error);
      }
    }else{
      Alert.alert('Introduzca valor para buscar')
    }
  }
  //--------------------------------------------------------------------------------------------------
  const placeholderTextHandler = (typeOfSearch)=>{
        setPlaceholderText(typeOfSearch);
  }
  // get data sumarry---------------------------------------------------------------------------------  
  
  return (
    <View style={[styles.background]}>
      {/*summary module */}
      <View style={[styles.infoCard,{marginBottom:20}]}>
            <Text style={styles.title3}>Resumen</Text>
            <Summary/>
      </View>
      {/*searching module */}
      <View style={styles.container}>
        <View style={styles.containerRow}>
              <TextInput 
                  value={dataSearch}
                  style={[styles.formField]}
                  placeholder={placeholdertText}
                  placeholderTextColor={colors.placeholder}
                  onChangeText={ (value) => setDataSearch(value)}
              />
              <TouchableOpacity
                onPress={ Search }
              >
                <Image
                  source={icons.search}
                  style={{width:33, height:40, margin:5}}
                />
              </TouchableOpacity>
        </View>   
        <View style={[styles.containerRow, {justifyContent:'center', marginTop:5}]}>
            <Text style={[styles.title2, {marginRight:10}]}>buscar por: </Text>
            <Text style={[styles.title2, {marginRight:10}]}> año</Text>
            <RadioButton
              uncheckedColor={colors.secundary}
              color={colors.secundary}
              value="year"
              status={ checked === 'year' ? 'checked' : 'unchecked' }
              onPress={() => {
                  setChecked('year');
                  placeholderTextHandler('year:');
                }
              }
            />
            <Text style={[styles.title2, {marginRight:10}]}> placa</Text>
            <RadioButton
              uncheckedColor={colors.secundary}
              color={colors.secundary}
              value="plaque"
              status={ checked === 'plaque' ? 'checked' : 'unchecked' }
              onPress={() => {
                  setChecked('plaque');
                  placeholderTextHandler('plaque:');
                }
              }
            />
        </View>
      </View>
    </View>
  );
}