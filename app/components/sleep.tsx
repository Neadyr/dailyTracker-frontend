import { View, Text } from "react-native";
import { runOnJS } from "react-native-reanimated";
import { useState, useRef } from "react";
import {
  Pressable,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { CircleCheck, Lock } from "lucide-react-native";

export default function Sleep(props: any) {
  const [balanceValue, setBalanceValue] = useState<number>(0);
  const [adjustableWidth, setAdjustableWidth] = useState<string>("");
  const [sleepText, setSleepText] = useState<string>("00h00");
  const [sleepValue, setSleepValue] = useState<number>(0);
  let backgroundColor;
  let topBarColor;
  let TextColor;

  const lastZoneRef = useRef<string | null>(null);

  const panGesture = Gesture.Pan().onUpdate((e) => {
    let zone: string;
    let balance: number = 0;
    let sleepText: string;
    let value: number = 0;
    if (e.absoluteX < 30) {
      zone = "w-[0%]";
      sleepText = "0h00";
      balance = -1;
      value = 0;
    } else if (e.absoluteX < 45) {
      zone = "w-[5%]";
      sleepText = "0h30";
      balance = -1;
      value = 0.5;
    } else if (e.absoluteX < 60) {
      zone = "w-[10%]";
      sleepText = "1h00";
      balance = -1;
      value = 1;
    } else if (e.absoluteX < 75) {
      zone = "w-[15%]";
      sleepText = "1h30";
      balance = -1;
      value = 1.5;
    } else if (e.absoluteX < 90) {
      zone = "w-[20%]";
      sleepText = "2h00";
      balance = -1;
      value = 2;
    } else if (e.absoluteX < 105) {
      zone = "w-[25%]";
      sleepText = "2h30";
      balance = -1;
      value = 2.5;
    } else if (e.absoluteX < 120) {
      zone = "w-[30%]";
      sleepText = "3h00";
      balance = -1;
      value = 3;
    } else if (e.absoluteX < 135) {
      zone = "w-[35%]";
      sleepText = "3h30";
      balance = -1;
      value = 3.5;
    } else if (e.absoluteX < 150) {
      zone = "w-[40%]";
      sleepText = "4h00";
      balance = -1;
      value = 4;
    } else if (e.absoluteX < 165) {
      zone = "w-[45%]";
      sleepText = "4h30";
      balance = -1;
      value = 4.5;
    } else if (e.absoluteX < 180) {
      zone = "w-[50%]";
      sleepText = "5h00";
      balance = -1;
      value = 5;
    } else if (e.absoluteX < 195) {
      zone = "w-[55%]";
      sleepText = "5h30";
      balance = -1;
      value = 5.5;
    } else if (e.absoluteX < 210) {
      zone = "w-[60%]";
      sleepText = "6h00";
      balance = 0;
      value = 6;
    } else if (e.absoluteX < 225) {
      zone = "w-[65%]";
      sleepText = "6h30";
      balance = 0;
      value = 6.5;
    } else if (e.absoluteX < 240) {
      zone = "w-[70%]";
      sleepText = "7h00";
      balance = 1;
      value = 7;
    } else if (e.absoluteX < 255) {
      zone = "w-[75%]";
      sleepText = "7h30";
      balance = 1;
      value = 7.5;
    } else if (e.absoluteX < 270) {
      zone = "w-[80%]";
      sleepText = "8h00";
      balance = 1;
      value = 8;
    } else if (e.absoluteX < 285) {
      zone = "w-[85%]";
      sleepText = "8h30";
      balance = 1;
      value = 8.5;
    } else if (e.absoluteX < 300) {
      zone = "w-[90%]";
      sleepText = "9h00";
      balance = 1;
      value = 9;
    } else if (e.absoluteX < 315) {
      zone = "w-[95%]";
      sleepText = "9h30";
      balance = 0;
      value = 9.5;
    } else {
      zone = "w-[100%]";
      sleepText = "10h00";
      balance = 0;
      value = 10;
    }

    if (zone !== lastZoneRef.current) {
      lastZoneRef.current = zone;
      runOnJS(setAdjustableWidth)(zone);
      runOnJS(setSleepText)(sleepText);
      runOnJS(setBalanceValue)(balance);
      runOnJS(setSleepValue)(value);
    }
  });

  if (balanceValue > 0) {
    backgroundColor = "bg-[#e1fff3]";
    topBarColor = "bg-[#c7f7e4]";
    TextColor = "text-[#c7f7e4]";
  } else if (balanceValue === 0) {
    backgroundColor = "bg-[#eeeeee]";
    topBarColor = "bg-[#e0e0e0]";
    TextColor = "text-[#e0e0e0]";
  } else {
    backgroundColor = "bg-[#ffe1e1]";
    topBarColor = "bg-[#fccfcf]";
    TextColor = "text-[#fccfcf]";
  }

  const handleUpload = async () => {
    const sending = await fetch(
      `http://192.168.20.77:3000/saveSleep/${sleepValue}/${balanceValue}`,
      {
        method: "PUT",
      }
    );
    const response = await sending.json();

    response.result && props.clear(props.buttonName);
  };
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
          onPress={() => {
            handleUpload();
          }}
          className=" h-full w-[10%] rounded-tr-2xl justify-center items-center"
        >
          <CircleCheck size={16} color="#42a82c" />
        </Pressable>
      </View>

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
