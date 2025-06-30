import { View, TouchableOpacity, Text } from "react-native";
import { useState, useEffect } from "react";
import {
  Pressable,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { Trash2 } from "lucide-react-native";
import InfiniteScroll from "./utilities/infiniteScroll";

import exercicesData from "../../exercices.json";

export default function Exercice(props: any) {
  const [balanceValue, setBalanceValue] = useState<number>(0);
  const [exercicesArray, setExercicesArray] = useState<string[] | null>(null);

  let backgroundColor;
  let topBarColor;
  let sliderColor;
  let separatorColor;

  useEffect(() => {
    let exercices: string[] = [];
    for (let elem of exercicesData.type) {
      for (let key in elem) {
        exercices.push(key);
        exercices.push("dash");
        for (let exercice of elem[key]) {
          exercices.push(exercice);
        }
      }
    }
    setExercicesArray(exercices);
  }, []);

  if (balanceValue > 0) {
    backgroundColor = "bg-[#e1fff3]";
    topBarColor = "bg-[#c7f7e4]";
    sliderColor = "bg-[#c7f7e4]";
    separatorColor = "bg-[#b8e4d2]";
  } else if (balanceValue === 0) {
    backgroundColor = "bg-[#eeeeee]";
    topBarColor = "bg-[#e0e0e0]";
    sliderColor = "bg-[#e0e0e0]";
    separatorColor = "bg-[#e0e0e0]";
  } else {
    backgroundColor = "bg-[#ffe1e1]";
    topBarColor = "bg-[#fccfcf]";
    sliderColor = "bg-[#fccfcf]";
    separatorColor = "bg-[#edc4c4]";
  }

  return (
    <View
      className={`${backgroundColor} my-2 w-[100%] rounded-2xl flex-col justify-between items-between min-h-[100px]`}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1230,
        },
        shadowOpacity: 0,
        shadowRadius: 3.84,

        elevation: 4,
      }}
    >
      <View
        className={`w-full h-8 rounded-t-2xl ${topBarColor} flex-row justify-between items-center px-2`}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 2,

          elevation: 1,
        }}
      >
        <Text>{props.buttonName}</Text>

        <Pressable
          onPress={() =>
            props.addToSelection({
              buttonName: props.buttonName,
              trigger: "trash",
            })
          }
          className=" h-full w-[10%] rounded-tr-2xl justify-center items-center"
        >
          <Trash2 size={16} color="#ff3333" />
        </Pressable>
      </View>
      {/* <View className="w-full h-[90%] bg-gray-200">{dropDown}</View> */}
      <View className="p-2">
        <InfiniteScroll data={exercicesArray}></InfiniteScroll>
        <InfiniteScroll data={null}></InfiniteScroll>
        <InfiniteScroll data={null}></InfiniteScroll>
      </View>
    </View>
  );
}
