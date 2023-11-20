import React, { useState, useEffect } from "react";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-element-dropdown';
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import Database from "../Database";
import moment from "moment";
import { Picker } from '@react-native-picker/picker';


const UpdateScreen = ({ route }) => {
  const { hike } = route.params;
  const [nameHike, setNameHike] = useState("");
  const [locationHike, setLocationHike] = useState("");
  const [dateHike, setDateHike] = useState("");
  const [parking, setParking] = useState("");
  const [lengthHike, setLengthHike] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDifficultyPickerVisible, setDifficultyPickerVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setNameHike(hike.nameHike);
      setLocationHike(hike.locationHike);
      setDateHike(hike.dateHike);
      setParking(hike.parking);
      setLengthHike(hike.lengthHike);
      setDifficulty(hike.difficultyLevel);
      setDescription(hike.description);
    };

    fetchData();
  }, [hike]);


  const options = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const optionsDifficluytLevel = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
    { label: 'Very High', value: 'Very High' },
  ];

  const renderItem = (item) => {
    return(
      <Text>{item.label}</Text>
    )
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateHike) => {
    setDateHike(moment(dateHike).format('DD/MM/YYYY'));
    hideDatePicker();
  };




  const handleUpdateHike = async () => {
    await Database.updateHike(hike.id, nameHike, locationHike, dateHike, parking, lengthHike, difficulty, description);
  
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Name Hike:</Text>
      <TextInput
        style={styles.input}
        value={nameHike}
        onChangeText={setNameHike}
        placeholder="Enter name hike "
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={locationHike}
        onChangeText={setLocationHike}
        placeholder="Enter location hike "
      />
      
      <Text style={styles.label}>Date of the hike:</Text>
      <Pressable onPress={showDatePicker} >     
        <TextInput
          style={styles.input}
          value={dateHike}
          editable={false}
          placeholder="Select date hike "
        />
      </Pressable>
      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <Text style={styles.label}>Parking:</Text>
      <TextInput
        style={styles.input}
        value={parking}
        onChangeText={setParking}
        placeholder="Choose parking"
        editable={false}
      />
      <Dropdown
        style ={styles.dropdown}
        data={options}
        value={parking}
        onChange={item => {
          setParking(item.value);
        }}
        placeholder=""
        renderItem={renderItem}
      />
      <Text style={styles.label}>Length of the hike:</Text>
      <TextInput
        style={styles.input}
        value={lengthHike}
        onChangeText={setLengthHike}
        placeholder="Enter Length hike "
      />
      <Text style={styles.label}>Difficulty Level:</Text>
      <TextInput
        style={styles.input}
        value={difficulty}
        onChangeText={setDifficulty}
        placeholder="Choose level"
        editable={false}
      />
      <Dropdown
        style ={styles.dropdown}
        data={optionsDifficluytLevel}
        value={difficulty}
        onChange={item => {
          setDifficulty(item.value);
        }}
        placeholder=""
        renderItem={renderItem}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />
      <TouchableOpacity style={styles.addButton} onPress={handleUpdateHike}>
        <Text style={styles.addButtonText}>Update Hike</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    fontStyle: 'bold',
    borderRadius: 4,
    marginBottom: 8,
    padding: 8,
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
  dropdown:{
    transform: [{translateY: -40}]
  },
  text: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 20,
},
pickerContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'white',
},
pickerText: {
  fontSize: 18,
  marginBottom: 5,
},
});

export default UpdateScreen;


