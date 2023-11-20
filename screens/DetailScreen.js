import React, { useEffect,useState } from "react";
import { ScrollView, StyleSheet, Text, View} from "react-native";

const DetailScreen = ({ route }) => {
  const { hike } = route.params;

  return(
    <ScrollView >
      <View style={styles.container}>
        <Text style={styles.textTittle}>Name of the Hike</Text>
        <Text style={styles.textInfo}>{hike.nameHike}</Text>
        <Text style={styles.textTittle}>Location</Text>
        <Text style={styles.textInfo}>{hike.locationHike}</Text>
        <Text style={styles.textTittle}>Date of  the Hike</Text>
        <Text style={styles.textInfo}>{hike.dateHike}</Text>
        <Text style={styles.textTittle}>Parking</Text>
        <Text style={styles.textInfo}>{hike.parking}</Text>
        <Text style={styles.textTittle}>Length of the Hike</Text>
        <Text style={styles.textInfo}>{hike.lengthHike}</Text>
        <Text style={styles.textTittle}>Difficulty level</Text>
        <Text style={styles.textInfo}>{hike.difficultyLevel}</Text>
        <Text style={styles.textTittle}>Description</Text>
        <Text style={styles.textInfo}>{hike.description}</Text> 
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
  },
  textTittle:{
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 20,
  },
  textInfo: {
    width: '100%',
    height: 40,
    fontSize: 18,
    backgroundColor: '#ddddff',
    paddingHorizontal: 10,
    paddingVertical: 7,
  }

});
export default DetailScreen;


