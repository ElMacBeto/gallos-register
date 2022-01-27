import { View, Text, Image } from 'react-native';
import styles from '../styles/globalStyles';
import { icons } from '../constants/imageRoute';

function Summary({female, male}) {
    return (
           <View style={{flexDirection:'row', width:'100%'}}>
                <View style={{flex:1, alignItems:'center'}}>
                    <View style={styles.containerRow}>
                        <Image
                            source={icons.hen}
                            style={{width:50, height:65, marginRight:20}}
                        />
                        <Text style={[styles.title, {color:'black'}]}>{female}</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Image
                            source={icons.rooster}
                            style={{width:70, height:65}}
                        />
                        <Text style={[styles.title, {color:'black'}]}>{male}</Text>
                    </View>
                </View>
                <View   style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:24, borderBottomWidth:1, borderBottomColor:'black'}}>Total: {female+male}</Text>
                </View>
                
            </View>
    );
  }

export default Summary;