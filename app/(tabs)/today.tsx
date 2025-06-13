import { Text, View, StyleSheet, TextInput} from "react-native";
import { Link } from 'expo-router';
import moment from 'moment';

import React, {useState} from 'react';

 // ----- / Color code / ----- //
 //    Dark : #212A31        //
 //    Darkish : #2e3944     //
 //    Blue : #124e56        //
 //    Greensih : #748D92    //
 //    Grey : #D3D9D4        //
 //    Gold : #25291e        //
 // ---------- \o/ ----------- //

export default function Index() {
  const formattedDate = moment().format("dddd, MMMM Do YYYY")
  const [breakfastDesc, setBreakfastDesc] = useState("")
  const [lunchDesc, setLunchDesc] = useState("")
  const [dinnerDesc, setDinnerDesc] = useState("")
  const [waterAmount, setWaterAmount] = useState("")
  const [sleepAmount, setSleepAmount] = useState("")

  return (
    <View
      style={styles.container}
    >
      <View style={styles.title}>
        <Text style={styles.titleText}>{formattedDate}</Text>
        <Text style={styles.titleText}>Git push</Text>

      </View>
        {/* Possibility to take a picture of the breakfast*/}
        <TextInput style={styles.description} placeholderTextColor="#D3D9D4" placeholder="Breakfast description" value={breakfastDesc} onChangeText={(value) => setBreakfastDesc(value)}></TextInput>
        {/* Possibility to take a picture of the lunch*/}
        <TextInput style={styles.description} placeholderTextColor="#D3D9D4" placeholder="Lunch description" value={lunchDesc} onChangeText={(value) => setLunchDesc(value)}></TextInput>
        {/* Possibility to take a picture of the dinner*/}
        <TextInput style={styles.description} placeholderTextColor="#D3D9D4" placeholder="Dinner description" value={dinnerDesc} onChangeText={(value) => setDinnerDesc(value)}></TextInput>
        <TextInput style={styles.description} keyboardType="numeric" placeholderTextColor="#D3D9D4" placeholder="Water amount"></TextInput>
        <TextInput style={styles.description} placeholderTextColor="#D3D9D4" placeholder="Workout description"></TextInput>
        <TextInput style={styles.description} keyboardType="numeric" placeholderTextColor="#D3D9D4" placeholder="Sleep"></TextInput>
    </View>
  );
}

 const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "#2e3944",
    display: "flex",
    justifyContent : "flex-start",
    alignItems: "center",
  },
  centralText : {
    color : "white"
  },
  title : {
    width : "100%",
    height: "15%",
    backgroundColor : "#212A31",
    display : "flex",
    alignItems : "center",
    justifyContent : "center",
    borderRadius : 3,
    paddingTop : 15
  },
  titleText : {
    color : '#748D92',
    fontSize : 24,
  },
  description : {
    color : "white",
    width : "95%",
    backgroundColor : "#2e3944",
    borderRadius : 3,
    margin : 20,
    paddingHorizontal : 10
    }
 })


