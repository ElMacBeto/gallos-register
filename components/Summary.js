import { View, Text, Image, Alert } from 'react-native';
import styles from '../styles/globalStyles';
import { icons } from '../constants/imageRoute';

import { useState , useEffect} from 'react/cjs/react.development';
import {getDBConnection, createTable, getRoosterItems} from '../database/dataBase-services';

function Summary() {

    const [rooster, setRooster] = useState({male:0, total:0});
    const female = rooster.total-rooster.male;
    return (
           <View style={styles.containerRow}>
                <View style={{flex:1, alignItems:'center'}}>
                    <View style={styles.containerRow}>
                        <Image
                            source={icons.hen}
                            style={{width:50, height:65, marginRight:20}}
                        />
                        <Text style={styles.title3}>{female}</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Image
                            source={icons.rooster}
                            style={{width:70, height:65}}
                        />
                        <Text style={styles.title3}>{rooster.male}</Text>
                    </View>
                </View>
                <View   style={[styles.container, {flex:1}]}>
                    <Text style={{fontSize:24, borderBottomWidth:1, borderBottomColor:'black'}}>Total: {rooster.total}</Text>
                </View>
                
            </View>
    );
  }

export default Summary;