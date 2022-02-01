import { useEffect, useState } from 'react';
import { View, Image,TouchableOpacity } from 'react-native';
import styles from '../styles/globalStyles';

function ButtonGroup(props) {
    //console.log(props.edit);
    //const initValue = value=='macho' ? 1 : 0
    let editValue = 0;
    const edit = props.edit;
    const data = props.data;
    const onPress = props.onPress;
    const field = props.field;
    //--------------------------------------------------------------------------------------------------
    const [btnSelected, setBtnSelected] = useState(0);
    // select initial value for gender an marks---------------------------------------------------------
    const initValue =  () => {
        if(field=='gender'){
            editValue = edit=='macho'? 0 : 1;
        }
        if(field == 'leftLeg'){
            editValue = edit =='afuera'? 0 : editValue
            editValue = edit =='adentro'? 1 : editValue
            editValue = edit =='las dos'? 2 : editValue
            editValue = edit =='ninguna'? 3 : editValue
        }
        if(field == 'rightLeg'){
            editValue = edit =='afuera'? 0 : editValue
            editValue = edit =='adentro'? 1 : editValue
            editValue = edit =='las dos'? 2 : editValue
            editValue = edit =='ninguna'? 3 : editValue
        }
        if(field == 'noise'){
            editValue = edit =='izquierda'? 0 : editValue
            editValue = edit =='derecha'? 1 : editValue
            editValue = edit =='las dos'? 2 : editValue
            editValue = edit =='ninguna'? 3 : editValue
        }
    }
    //--------------------------------------------------------------------------------------------------
    useEffect( () => {
        initValue();
        isSelectHandler(editValue, edit)
    },[])
    //--------------------------------------------------------------------------------------------------
    const isSelectHandler = (isSelect, value) => {
        //console.log(value)
        setBtnSelected(isSelect);
        onPress(field,value)
    }
    //console.log(data)
    return(
        <View style={styles.containerRow}>
            {   
                data.map((field, index)=>{
                    return(
                            <TouchableOpacity
                                key={index}
                                style= {index == btnSelected ? styles.buttonSelect:styles.button}
                                onPress={() => isSelectHandler(index, field.value)}
                            >
                                <Image
                                    source={field.image}
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