import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as colors from '../constants/color';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  
);

const RoosterList = ({gallos}) => {

    const DATA= gallos;
    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? colors.primary : colors.white;
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <View style={styles.item}>
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title2}>Gallos Registrados</Text>
            <FlatList
                refreshing={true}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    width:'80%',
    backgroundColor:'white',
    borderWidth:1,
    borderRadius:10
    
  },
  item: {
    padding: 5,
    marginHorizontal: 5,
    borderBottomWidth:0,
  
  },
  title: {
    fontSize: 16,
    textAlign:'center'
  },
  title2:{
    width:'100%',
    textAlign:'center', 
    color:'black', 
    fontSize:20, 
    marginVertical:10,
    borderBottomWidth:1,
    borderRadius:10
  }
});

export default RoosterList;