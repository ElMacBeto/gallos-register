import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as colors from '../../constants/color';
import styles from '../../styles/globalStyles';
import { icons } from '../../constants/imageRoute';
import { useState , useEffect} from 'react/cjs/react.development';
import { RadioButton } from 'react-native-paper';
import Summary from '../../components/Summary';

export default function HomeScreen() {
 
  const navigation = useNavigation();
  //remplace to firebase database 
  const data ={
    user:'Macias',
    summary:{
          famele: 80,
          male: 56
       },
    graphic:{
          label:["2016", "2017","2018", "2019", "2020", "2021"],
          datasets: [
            {
              data: [20, 25, 28, 30, 20, 30]
            }
          ]  
       }  
  } 
  //
  const [placeholdertText, setPlaceholderText] = useState('year: ');
  //select searching by ... value
  const [checked, setChecked] = useState('year');
  //data to search
  const [dataSearch, setDataSearch] =useState('');
  //placeholder value
  const placeholderTextHandler = (typeOfSearch)=>{
      setPlaceholderText(typeOfSearch);
  }
  //start searching
  const Search= ()=>{
      //here must to be the searching function
      //navigation.navigate('SearchScreen',{'searchBy':checked, 'dataToSearch':dataSearch});
      console.log('buscar por: '+checked+' '+dataSearch);
    }

  return (
    <View style={[styles.background, {justifyContent:'center',alignItems:'center'}]}>
      
        {/*searching module */}
        <View style={styles.container, {width:'90%', marginTop:20}}>
          <View style={styles.containerRow}>
              <TextInput 
                  value={dataSearch}
                  style={[styles.formField]}
                  placeholder={placeholdertText}
                  placeholderTextColor={colors.placeholder}
                  onChangeText={ (value) => setDataSearch(value)}
              />
              <TouchableOpacity
                onPress={Search}
              >
                <Image
                  source={icons.search}
                  style={{width:33, height:40, margin:5}}
                />
              </TouchableOpacity>
          </View>   
          <View style={[styles.containerRow, {justifyContent:'center', marginTop:5}]}>
            <Text style={[styles.title2, {marginRight:10}]}>Search by:</Text>
            <Text style={[styles.title2, {marginRight:10}]}> year</Text>
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
            <Text style={[styles.title2, {marginRight:10}]}> plaque</Text>
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
          <Text></Text>
        </View>

        {/*summary module */}
        <View style={styles.infoCard}>
            <Text style={[styles.title, {color:colors.black}]}>Summary</Text>
            <Summary female={data.summary.famele} male={data.summary.male} />
      </View>
    </View>
  );
}