import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState , useEffect} from 'react/cjs/react.development';
import { RadioButton } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
//my components
import Summary from '../../components/Summary';
import RoosterList from '../../components/RoosterList';
// my assets
import * as colors from '../../constants/color';
import styles from '../../styles/globalStyles';
import { icons } from '../../constants/imageRoute';
// database
import { openDatabase, enablePromise } from "react-native-sqlite-storage";

const db = openDatabase({
  name: "db",
});

export default function HomeScreen() {

  const isFocused = useIsFocused();

  const [gallos, setGallos] = useState([]);

  const [searchGallo, setSearchGallo] = useState([]);

 /////////////////////////////////////////////////////////////////////////////////////////////
  const createTables = async () => {
      await db.transaction( async (txn) => {
        await txn.executeSql(
          `CREATE TABLE IF NOT EXISTS gallos (id INTEGER PRIMARY KEY AUTOINCREMENT, line VARCHAR(40), year INTEGER, gender VARCHAR(25), plaque INTEGER, ring INTEGER, leftLeg VARCHAR(25), rightLeg VARCHAR(25), noise VARCHAR(25))`,
          [],
          (sqlTxn, res) => {
            console.log("table created successfully");
          },
          error => {
            console.log("error on creating table " + error.message);
          },
        );
      });
  };  
///////////////////////////////////////////////////////////////////////////////////////////////
const getRooster = async () => {
      await db.transaction( async (txn) => {
       await txn.executeSql(
        `SELECT * FROM gallos ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log("gallos retrieved successfully");
          let len = res.rows.length;
  
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
        },
      );
    });
};
///////////////////////////////////////////////////////////////////////////////////////////////
const getRoosterByField =  (field, value ) => {
   try {
    db.transaction( (txn) => {
      txn.executeSql(
      `SELECT * FROM gallos WHERE ${field}=${value}`,
      [],
      (sqlTxn, res) => {
        console.log("gallos retrieved successfully");
        let len = res.rows.length;

        if (len > 0) {
          let results = [];
          for (let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            results.push({  
                id: item.id, 
                title: item.line+item.year,  
                year: item.year,
                gender: item.gender,
                plaque: item.plaque,
                ring: item.ring,
                leftLeg: item.leftLeg,
                rightLeg: item.rightLeg,
                noise: item.noise  
              });
          }
          setGallosetSearchGallo(results);
        }
      },
      error => {
        console.log("error on getting categories " + error.message);
      },
    );
  });
   } catch (error) {
     console.log(error);
   }
};
///////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(async() => {
    await createTables();
    await getRooster();
    //console.log(gallos)
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////////////
  const navigation = useNavigation();
  //info to summary
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
  // change placegolder text hook///////////////////////////////////////////////////////////////////////////////////////////////
  const [placeholdertText, setPlaceholderText] = useState('year: ');////////////////////////////////////////////////////////////
  //select searching by ... value///////////////////////////////////////////////////////////////////////////////////////////////
  const [checked, setChecked] = useState('year');///////////////////////////////////////////////////////////////////////////////
  //data to search//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [dataSearch, setDataSearch] =useState('');//////////////////////////////////////////////////////////////////////////////
  //placeholder value///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const placeholderTextHandler = (typeOfSearch)=>{//////////////////////////////////////////////////////////////////////////////
      setPlaceholderText(typeOfSearch);/////////////////////////////////////////////////////////////////////////////////////////
  }/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //start searching
  const Search= async ()=>{
      await getRoosterByField(checked, dataSearch);  
      console.log(searchGallo)
      //navigation.navigate('Consult', {refreshList: 'getRooster'});
    }

  return (
    <View style={[styles.background, {justifyContent:'center',alignItems:'center'}]}>
      {/*summary module */}
      <View style={styles.infoCard}>
            <Text style={[styles.title, {color:colors.black}]}>Summary</Text>
            <Summary female={data.summary.famele} male={data.summary.male} />
      </View>
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
      </View>
      <View style={{flex:1}}>
        <RoosterList gallos={isFocused? gallos:{id:'', title:''}} />
      </View>
    </View>
  );
}