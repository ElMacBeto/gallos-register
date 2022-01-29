import React, { useState } from "react";
import { FlatList, SafeAreaView, RefreshControl, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as colors from '../constants/color';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const RoosterList = ({gallos}) => {

    const DATA= gallos;
    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? colors.primary : colors.white;
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={{textAlign:'center', color:'white', fontSize:20, marginBottom:10}}>Gallos Registrados</Text>
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
  },
  item: {
    padding: 5,
    marginHorizontal: 5,
    borderBottomWidth:1
  },
  title: {
    fontSize: 16,
  },
});

export default RoosterList;