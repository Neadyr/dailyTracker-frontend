import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import Bubble from "../components/bubble";
// ----- / Color code / ----- //
//    Dark : #212A31        //
//    Darkish : #2e3944     //
//    Darkishish: #34414e   //
//    Blue : #124e56        //
//    Greensih : #748D92    //
//    Grey : #D3D9D4        //
//    Gold : #ffd33d        //
// ---------- \o/ ----------- //

export default function Index() {
  const formattedDate = moment().format("dddd, MMMM Do YYYY");
  const [breakfastDesc, setBreakfastDesc] = useState("");
  const [lunchDesc, setLunchDesc] = useState("");
  const [dinnerDesc, setDinnerDesc] = useState("");
  const [waterAmount, setWaterAmount] = useState("");
  const [sleepAmount, setSleepAmount] = useState("");

  const handleSubmit = () => {
    //Handle submit logic
  };

  return (
    <View className="flex-1 justify-start items-center">
      <StatusBar hidden={true} />
      <View className="mt-20 mb-10">
        <Text className="text-black text-2xl font-bold">{formattedDate}</Text>
      </View>
      <Bubble />
      {/* <View className="w-full bg-red-200 h-20 mb-10"></View> */}
      <Bubble />
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e3944",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  centralText: {
    color: "white",
  },
  title: {
    width: "100%",
    height: "15%",
    backgroundColor: "#212A31",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    paddingTop: 15,
  },
  titleText: {
    color: "#748D92",
    fontSize: 24,
  },
  description: {
    width: "95%",
    backgroundColor: "#2e3944",
    borderRadius: 3,
    margin: 20,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "#748D92",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
