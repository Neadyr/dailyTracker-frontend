import { View, Text } from "react-native";
import { useState, useContext } from "react";
import { Pressable } from "react-native-gesture-handler";
import { CircleCheck, Lock } from "lucide-react-native";
import Checkbox from "expo-checkbox";
import { DataContext } from "../_layout";

export default function Water(props: any) {
  const [balanceValue, setBalanceValue] = useState<number>(0);
  let backgroundColor;
  let topBarColor;
  let sliderColor;
  let separatorColor;

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

  const changeCheckboxValue = () => {
    if (balanceValue < 1) {
      setBalanceValue(1);
    } else {
      setBalanceValue(-1);
    }
  };

  const handleUpload = async () => {
    const sending = await fetch(
      `https://daily-tracker-backend-delta.vercel.app/saveWater/${balanceValue}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ water: balanceValue > 0 }),
      }
    );
    const response = await sending.json();

    if (response.result) {
      props.clear(props.buttonName);
    }
  };
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
          onPress={() => {
            handleUpload();
          }}
          className=" h-full w-[10%] rounded-tr-2xl justify-center items-center"
        >
          <CircleCheck size={16} color="#42a82c" />
        </Pressable>
      </View>
      <View className="min-h-[90px] w-full items-center justify-around px-16">
        <Text>Empty bottle ?</Text>
        <Pressable onPress={() => changeCheckboxValue()}>
          <Checkbox
            value={balanceValue > 0}
            color={balanceValue > 0 ? "#7fe0b9" : "#ec948a"}
            style={{ height: 50, width: 50, borderRadius: 10 }}
          />
        </Pressable>
      </View>
    </View>
  );
}
