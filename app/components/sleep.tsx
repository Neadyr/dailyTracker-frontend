import { View, TouchableOpacity, Text } from "react-native";
import { runOnJS } from "react-native-reanimated";
import { useState, useEffect, useRef } from "react";
import {
  Pressable,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { Trash2 } from "lucide-react-native";
import Slider from "@react-native-community/slider";

export default function Sleep(props: any) {
  const [balanceValue, setBalanceValue] = useState<number>(0);
  const [adjustableWidth, setAdjustableWidth] = useState<string>("");
  const [sleepText, setSleepText] = useState<string>("00h00");

  let backgroundColor;
  let topBarColor;
  let sliderColor;
  let TextColor;

  const lastZoneRef = useRef<string | null>(null);
  const lastBalanceRef = useRef<number | null>(null);

  const panGesture = Gesture.Pan().onUpdate((e) => {
    let zone: string;
    let balance: number = 0;
    let sleepText: string;
    if (e.absoluteX < 30) {
      zone = "w-[0%]";
      sleepText = "0h00";
      balance = -1;
    } else if (e.absoluteX < 45) {
      zone = "w-[5%]";
      sleepText = "0h30";
      balance = -1;
    } else if (e.absoluteX < 60) {
      zone = "w-[10%]";
      sleepText = "1h00";
      balance = -1;
    } else if (e.absoluteX < 75) {
      zone = "w-[15%]";
      sleepText = "1h30";
      balance = -1;
    } else if (e.absoluteX < 90) {
      zone = "w-[20%]";
      sleepText = "2h00";
      balance = -1;
    } else if (e.absoluteX < 105) {
      zone = "w-[25%]";
      sleepText = "2h30";
      balance = -1;
    } else if (e.absoluteX < 120) {
      zone = "w-[30%]";
      sleepText = "3h00";
      balance = -1;
    } else if (e.absoluteX < 135) {
      zone = "w-[35%]";
      sleepText = "3h30";
      balance = -1;
    } else if (e.absoluteX < 150) {
      zone = "w-[40%]";
      sleepText = "4h00";
      balance = -1;
    } else if (e.absoluteX < 165) {
      zone = "w-[45%]";
      sleepText = "4h30";
      balance = -1;
    } else if (e.absoluteX < 180) {
      zone = "w-[50%]";
      sleepText = "5h00";
      balance = -1;
    } else if (e.absoluteX < 195) {
      zone = "w-[55%]";
      sleepText = "5h30";
      balance = -1;
    } else if (e.absoluteX < 210) {
      zone = "w-[60%]";
      sleepText = "6h00";
      balance = 0;
    } else if (e.absoluteX < 225) {
      zone = "w-[65%]";
      sleepText = "6h30";
      balance = 0;
    } else if (e.absoluteX < 240) {
      zone = "w-[70%]";
      sleepText = "7h00";
      balance = 1;
    } else if (e.absoluteX < 255) {
      zone = "w-[75%]";
      sleepText = "7h30";
      balance = 1;
    } else if (e.absoluteX < 270) {
      zone = "w-[80%]";
      sleepText = "8h00";
      balance = 1;
    } else if (e.absoluteX < 285) {
      zone = "w-[85%]";
      sleepText = "8h30";
      balance = 1;
    } else if (e.absoluteX < 300) {
      zone = "w-[90%]";
      sleepText = "9h00";
      balance = 1;
    } else if (e.absoluteX < 315) {
      zone = "w-[95%]";
      sleepText = "9h30";
      balance = 0;
    } else {
      zone = "w-[100%]";
      sleepText = "10h00";
      balance = 0;
    }

    if (zone !== lastZoneRef.current) {
      lastZoneRef.current = zone;
      console.log(zone);
      runOnJS(setAdjustableWidth)(zone);
      runOnJS(setSleepText)(sleepText);
      runOnJS(setBalanceValue)(balance);
    }
  });

  if (balanceValue > 0) {
    backgroundColor = "bg-[#e1fff3]";
    topBarColor = "bg-[#c7f7e4]";
    sliderColor = "bg-[#c7f7e4]";
    TextColor = "text-[#c7f7e4]";
  } else if (balanceValue === 0) {
    backgroundColor = "bg-[#eeeeee]";
    topBarColor = "bg-[#e0e0e0]";
    sliderColor = "bg-[#e0e0e0]";
    TextColor = "text-[#e0e0e0]";
  } else {
    backgroundColor = "bg-[#ffe1e1]";
    topBarColor = "bg-[#fccfcf]";
    sliderColor = "bg-[#fccfcf]";
    TextColor = "text-[#fccfcf]";
  }

  return (
    <View
      className={`${backgroundColor} my-2 w-[100%] rounded-2xl flex-col justify-between items-between min-h-[100px] overflow-hidden`}
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

      {/* <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor={"#FFFFFF"}
        maximumTrackTintColor="#000000"
        step={1}
        thumbTintColor="black"
      /> */}
      <GestureDetector gesture={panGesture}>
        <View className="min-h-[90px] ">
          <View
            className={`h-[90px] ${
              adjustableWidth ? adjustableWidth : "w-[50%]"
            } justify-center overflow-hidden bg-[#00000011] z-20`}
          ></View>
          <View className="w-full h-[90%] absolute items-center justify-center ">
            <Text className={`absolute  ${TextColor} text-[80px] mb-2 z-10`}>
              {sleepText}
            </Text>
          </View>
        </View>
      </GestureDetector>
    </View>
  );
}
