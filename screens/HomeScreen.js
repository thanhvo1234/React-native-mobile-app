import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Database from "../Database";

const HomeScreen = ({ navigation }) => {
  const [hikes, setHikes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Database.getHikes();
        setHikes(data);
      } catch (error) {
        console.log("Error fetching Hikes", error);
      }
    };

    fetchData();
  }, [isFocused]);

  const handleDeleteHike = async (id) => {
    await Database.deleteHike(id);
    const data = await Database.getHikes();
    setHikes(data);
  };

  const renderHikeItem = ({ item }) => (

    <View style={styles.borderItems}>
      <TouchableOpacity
        style={styles.hikeItem}
        onPress={() => navigation.navigate("Detail", { hike: item })}
      >
        <Text style={styles.textSize}>{item.nameHike}</Text>
        <View style={styles.linear}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteHike(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => navigation.navigate("Update", { hike: item })}
            >
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
        </View>
        
      </TouchableOpacity>
    </View>

  );

  return (
    
      <View style={styles.container}>
        
        <FlatList
          data={hikes}
          renderItem={renderHikeItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Entry")}
        >
          <Text style={styles.addButtonText}>Add Hike</Text>
        </TouchableOpacity>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textSize:{
    fontSize: 25,
    fontWeight: "bold",
  },
  borderItems:{
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    width: '100%',
    marginVertical: 5,
    justifyContent: 'space-between',
    alignContent: 'center',
  
  },
  hikeItem: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 8,
  },
  linear: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    paddingTop: 10,
  },
  updateButton: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  deleteButtonText: {
    color: "white",
  },
  updateButtonText: {
    color: "white",
  },
  addButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;