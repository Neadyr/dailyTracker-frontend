import { View, TouchableOpacity, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import {
  Pressable,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { Trash2, CircleCheck } from "lucide-react-native";
import InfiniteScroll from "./utilities/infiniteScroll";

import exercicesData from "../../exercices.json";

export default function Exercice(props: any) {
  const [balanceValue, setBalanceValue] = useState<number>(0);
  const [exercicesArray, setExercicesArray] = useState<string[] | null>(null);
  const [arrayLength, setArrayLength] = useState<number>(null);
  const [exerciceDescription, setExerciceDescription] = useState<string>("");
  let backgroundColor;
  let topBarColor;
  let sliderColor;
  let separatorColor;

  useEffect(() => {
    let exercices: string[] = [];
    for (let elem of exercicesData.type) {
      for (let key in elem) {
        for (let exercice of elem[key]) {
          exercices.push(exercice);
        }
      }
    }
    setExercicesArray(exercices);
    setArrayLength(exercices.length - 1 || 0);
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

  const handleUpload = async (from: boolean) => {
    const sending = await fetch(
      `https://daily-tracker-backend-delta.vercel.app/saveExercice/1`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exercice: from ? exerciceDescription : "break",
        }),
      }
    );
    const response = await sending.json();

    if (response.result) {
      props.clear(props.buttonName);
    }
  };

  //Ajouter bouton repos
  return (
    <View
      className={`bg-[#eeeeee] my-2 w-[100%] rounded-2xl justify-between items-between min-h-[100px]`}
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
        className={`w-full h-8 rounded-t-2xl bg-[#e0e0e0] flex-row justify-between items-center px-2`}
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
          onPress={() => {
            handleUpload(true);
          }}
          className=" h-full w-[10%] rounded-tr-2xl justify-center items-center"
        >
          <CircleCheck size={16} color="#42a82c" />
        </Pressable>
      </View>
      {/* <View className="w-full h-[90%] bg-gray-200">{dropDown}</View> */}
      <View className="p-2 justify-center items-center">
        {/* <InfiniteScroll
          data={exercicesArray}
          arrayLength={arrayLength}
        ></InfiniteScroll>
        <InfiniteScroll data={null} arrayLength={0}></InfiniteScroll> */}
        <TextInput
          style={{ marginTop: 0 }}
          multiline
          numberOfLines={4}
          placeholder="Describe your session here"
          onChangeText={(value) => setExerciceDescription(value)}
          value={exerciceDescription}
        ></TextInput>
        <Pressable
          onPress={() => handleUpload(false)}
          style={{
            backgroundColor: "white",
            width: 60,
            height: 20,
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1230,
            },
            shadowOpacity: 0,
            shadowRadius: 1,

            elevation: 2,
          }}
        >
          <Text>Break</Text>
        </Pressable>
      </View>
    </View>
  );
}
