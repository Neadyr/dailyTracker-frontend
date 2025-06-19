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
import {
  Coffee,
  Sandwich,
  CookingPot,
  Donut,
  Droplet,
  Bed,
  Dumbbell,
} from "lucide-react-native";

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
  const [breakfastDesc, setBreakfastDesc] = useState<string>("");
  const [lunchDesc, setLunchDesc] = useState<string>("");
  const [dinnerDesc, setDinnerDesc] = useState<string>("");
  const [waterAmount, setWaterAmount] = useState<string>("");
  const [sleepAmount, setSleepAmount] = useState<string>("");
  const [selectedButton, setSelectedButton] = useState<string[]>([]);

  const addToSelection = (elem: string) => {
    if (selectedButton.find((e) => e === elem)) {
      setSelectedButton(selectedButton.filter((e) => e !== elem));
    } else {
      setSelectedButton([...selectedButton, elem]);
    }
  };
  const buttonData = [
    {
      buttonName: "Breakfast",
      iconElem: (
        <Coffee
          color={
            selectedButton.find((elem) => elem === "Breakfast")
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
    },
    {
      buttonName: "Lunch",
      iconElem: (
        <Sandwich
          color={
            selectedButton.find((elem) => elem === "Lunch")
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
    },
    {
      buttonName: "Dinner",
      iconElem: (
        <CookingPot
          color={
            selectedButton.find((elem) => elem === "Dinner")
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
    },
    {
      buttonName: "Extra",
      iconElem: (
        <Donut
          color={
            selectedButton.find((elem) => elem === "Extra")
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: false,
    },
    {
      buttonName: "Water",
      iconElem: (
        <Droplet
          color={
            selectedButton.find((elem) => elem === "Water")
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
    },
    {
      buttonName: "Sleep",
      iconElem: (
        <Bed
          color={
            selectedButton.find((elem) => elem === "Sleep")
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
    },
    {
      buttonName: "Exercice",
      iconElem: (
        <Dumbbell
          color={
            selectedButton.find((elem) => elem === "Exercice")
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
    },
  ];

  const buttonArray = buttonData.map((data, i) => {
    return <Bubble {...data} key={i} addToSelection={addToSelection} />;
  });
  return (
    <View className="flex-1 justify-start items-center">
      <StatusBar hidden={true} />
      <View className="mt-20 mb-10">
        <Text className="text-black text-2xl font-bold">{formattedDate}</Text>
      </View>
      {/* <Bubble name="Breakfast" icon={<Coffee />} />
      <Bubble name="Lunch" icon={<Sandwich />} /> */}
      <View className="flex-row gap-2 flex-wrap w-full justify-center">
        {buttonArray}
      </View>
      <View className="w-[90%] h-[1px] bg-gray-200 "></View>
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
