import { View, Text, Image } from 'react-native';
import styles from '../styles/globalStyles';
import { icons } from '../constants/imageRoute';

function Summary({male, total}) {
    const female = total-male;
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
                        <Text style={styles.title3}>{male}</Text>
                    </View>
                </View>
                <View   style={[styles.container, {flex:1}]}>
                    <Text style={{fontSize:24, borderBottomWidth:1, borderBottomColor:'black'}}>Total: {total}</Text>
                </View>
                
            </View>
    );
  }

export default Summary;