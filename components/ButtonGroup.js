import { useState } from 'react';
import { View, Text, Image,TouchableOpacity } from 'react-native';
import styles from '../styles/globalStyles';

function ButtonGroup({data, onPress, field}) {
    const [btnSelected, setBtnSelected] = useState(0);
    
    const isSelectHandler = (isSelect, value) => {
        setBtnSelected(isSelect);
        onPress(field,value)
    }
    
    return(
        <View style={styles.containerRow}>
            {   
                data.map((gender, index)=>{
                    return(
                            <TouchableOpacity
                                key={index}
                                style= {index == btnSelected ? styles.buttonSelect:styles.button}
                                onPress={() => isSelectHandler(index, gender.value)}
                            >
                                <Image
                                    source={gender.image}
                                    style={{width:50, height:50}}
                                />
                            </TouchableOpacity>
                    )
                })
            }
        </View>
    )
  }

export default ButtonGroup;