import { View, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import react, { useState } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Coffee } from "lucide-react-native";

export default function Bubble(props: any) {
  const [isSelected, setIsSelected] = useState(false);

  const position = useSharedValue(-7);

  const press = () => {
    props.addToSelection(props.buttonName);
    setIsSelected(!isSelected);
    isSelected
      ? (position.value = position.value + 2)
      : (position.value = position.value + 6);
  };

  const release = () => {
    isSelected
      ? (position.value = position.value - 2)
      : (position.value = withSpring(position.value - 6, {
          duration: 350,
          dampingRatio: 0.2,
        }));
  };

  let iconColor;
  isSelected ? (iconColor = "#ffd33d") : (iconColor = "#b1b1b1");

  return (
    <View
      className={
        isSelected
          ? "relative w-[60px] h-[60px] rounded-xl justify-center items-end bg-[#fff1c0] px-4 shadow z-20 mb-5"
          : "relative w-[60px] h-[60px] rounded-xl justify-center items-end bg-[#e1e1e1] px-4 shadow z-20 mb-5"
      }
    >
      <Animated.View
        className="w-[60px] h-[60px] absolute bg-[#f8f8f8] z-10 rounded-xl flex-row items-center justify-between"
        style={{ top: position }}
      >
        <TouchableOpacity
          onPressIn={press}
          onPressOut={release}
          className="w-[60px] h-[60px] flex-col justify-between items-center pt-4"
          activeOpacity={0.9}
        >
          {props.iconElem}
          <Text
            className={
              isSelected ? "text-xs text-[#ffd33d]" : "text-xs text-[#b1b1b1]"
            }
          >
            {props.buttonName}
          </Text>
          {/* <Ionicons
            name="add-circle-outline"
            size={28}
            style={{ color: "#ffd33d" }}
          ></Ionicons> */}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
