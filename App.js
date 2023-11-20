import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import Database from "./Database";
import DetailScreen from "./screens/DetailScreen";
import EntryScreen from "./screens/EntryScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import UpdateScreen from "./screens/UpdateScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {MaterialIcons} from "react-native-vector-icons";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(() => {
    Database.initDatabase();
  }, []);
  {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home Screen" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Update" component={UpdateScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

function Home(){
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Add" component={EntryScreen} options={{tabBarLabel:"Add Hike" , tabBarIcon: ()=> (<MaterialIcons name="add-location" size={24} color="#000"/>)}} />
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel:"Home" , tabBarIcon: ()=> (<MaterialIcons name="home" size={24} color="#000"/>)}}/>
      <Tab.Screen name="Search" component={SearchScreen} options={{tabBarLabel:"Search" , tabBarIcon: ()=> (<MaterialIcons name="search" size={24} color="#000"/>)}}/>
    </Tab.Navigator>
  );
}



  

export default App;
