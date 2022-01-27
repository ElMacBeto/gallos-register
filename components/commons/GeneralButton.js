
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/globalStyles';

function GeneralButton(props) {
    return (
            <TouchableOpacity 
                style={[styles.button, {backgroundColor:props.btnColor}]}
                onPress={props.onPress}    
            >
                <View>
                    <Text 
                        style={[styles.title, {color:props.txtColor}]}
                    >
                        {props.text}
                    </Text>
                </View>
            </TouchableOpacity>
    );
  }

export default GeneralButton;