import { View, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import react, { useState } from "react";

export default function Bubble() {
  const [isPressed, setIsPressed] = useState(false);

  const test = () => {
    setIsPressed(true);
    console.log("hello");
  };
  const test2 = () => {
    setIsPressed(false);
  };

  return (
    <View className="relative w-[90%] h-[50px] rounded-full justify-center items-end bg-[#e1e1e1] px-4 shadow z-20 mb-5">
      <View
        className={
          isPressed
            ? "w-[109.5%] h-[50px] absolute bg-[#f8f8f8] z-10 rounded-full flex-row items-center justify-between px-4"
            : "w-[109.5%] h-[50px] absolute bg-[#f8f8f8] z-10 top-[-4] rounded-full flex-row items-center justify-between px-4"
        }
      >
        <Text>Add Breakfast</Text>
        <TouchableOpacity onPressIn={test} onPressOut={test2}>
          <Ionicons
            name="add-circle-outline"
            size={28}
            style={{ color: "#ffd33d" }}
          ></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
}
