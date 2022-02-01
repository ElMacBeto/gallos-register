import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState , useEffect} from 'react/cjs/react.development';
import { RadioButton } from 'react-native-paper';
//my components
import Summary from '../../components/Summary';
import RoosterList from '../../components/RoosterList';
// my assets
import * as colors from '../../constants/color';
import styles from '../../styles/globalStyles';
import { icons } from '../../constants/imageRoute';
// database
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
  name: "db",
});

export default function HomeScreen() {

const [gallos, setGallos] = useState([]);
 /////////////////////////////////////////////////////////////////////////////////////////////
const createTables = async () => {
  try {   
    await db.transaction(  (txn) => {
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS gallos (id INTEGER PRIMARY KEY AUTOINCREMENT, line VARCHAR(40), year INTEGER, gender VARCHAR(25), plaque INTEGER, ring INTEGER, leftLeg VARCHAR(25), rightLeg VARCHAR(25), noise VARCHAR(25))`,
            [],
            (sqlTxn, res) => {
              //console.log("table created successfully");
            },
            error => {
              console.log("error on creating table " + error.message);
            },
          );
    });
  } catch (error) {
    throw error;
    }     
  };  
///////////////////////////////////////////////////////////////////////////////////////////////
const getRooster = async () => {
  try {
      await db.transaction( (txn) => {
        txn.executeSql(
        `SELECT * FROM gallos ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          //console.log("gallos retrieved successfully");
          let len = res.rows.length;
          setSumamry({...summary, ['total']:len});
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({  
                              id: item.id, 
                              title: `${item.line} placa: ${item.plaque}`,  
                            });
            }
            setGallos(results);
          }
        },
        error => {
          console.log("error on getting categories " + error.message);
          throw error;
        },
      );
    });
  } catch (error) {
    console.log(error.message)
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////
const getRoosterByField = async (field, value ) => {
  try {
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
            navigation.navigate('Consult', {gallosData: results, field, value})
            
            //setSearchGallo(results);
          }
      },
      error => {
        console.log("error on getting categories " + error.message);
      },
    );
  });
  }catch (error) {
    throw error;
  } 
};
 //start searching-----------------------------------------------------------------------------
const Search= async ()=>{
  if(!dataSearch==''){
    await getRoosterByField(checked, dataSearch)
  }else{
    Alert.alert('Introduzca valor para buscar')
  }
 
}
///////////////////////////////////////////////////////////////////////////////////////////////
const getSumarryData = async () => {
  try {
    await db.transaction( (txn) => {
      txn.executeSql(
      `SELECT * FROM gallos WHERE gender ='macho'`,
      [],
      (sqlTxn, res) => {
        //console.log("gallos retrieved machos");
        let len = res.rows.length;
        setSumamry({... summary,['machos']:len})
      },
      error => {
        console.log("error on getting categories " + error.message);
      },
    );
  });
} catch (error) {
    
}
};
//////////////////////--------------------------------------------------------------------------
  useEffect(async() => {

    setPlaceholderText('year:');
    setChecked('year');
    setDataSearch(''); 

    try {
      await createTables()
      .then(()=> setSumamry({machos:0, total:0}))
      .then(async()=>await getSumarryData())
      .catch((error) => {
        throw error
      })
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  /////////////////////////////////////////////////////////////////////////////////////////////
  const navigation = useNavigation();
  // change placegolder text hook///////////////////////////////////////////////////////////////////////////////////////////////
  const [placeholdertText, setPlaceholderText] = useState('year: ');
  //select searching by ... value
  const [checked, setChecked] = useState('year');
  //data to search///////////
  const [dataSearch, setDataSearch] =useState('');
  //------------------------------------------------------------------------------------------------

  //// summary data hook------------------------------------------------------------------------------
  const [summary, setSumamry] = useState({machos:0, total:0})
  const placeholderTextHandler = (typeOfSearch)=>{
        setPlaceholderText(typeOfSearch);
  }
  // get data sumarry--------------------------------------------------------------------------------  
  return (
    <View style={[styles.background]}>
      {/*summary module */}
      <View style={[styles.infoCard,{marginBottom:20}]}>
            <Text style={styles.title3}>Resumen</Text>
            <Summary male={summary.machos} total={summary.total} />
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