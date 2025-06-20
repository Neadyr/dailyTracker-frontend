import { View, TouchableOpacity, Text } from "react-native";
import { useState, useEffect } from "react";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

export default function Bubble(props: any) {
  const position = useSharedValue(-7);
  const [isUsable, setIsUsable] = useState<boolean>(true);

  useEffect(() => {
    if (!props.isSelected && props.from === "itself") {
      position.value = withSpring(position.value - 6, {
        duration: 350,
        dampingRatio: 0.2,
      });
    } else if (!props.isSelected && props.from === "trash") {
      position.value = withSpring(position.value - 4, {
        duration: 350,
        dampingRatio: 0.2,
      });
    } else {
      position.value = position.value - 2;
    }
    setTimeout(() => {
      setIsUsable(true);
    }, 350);
  }, [props.isSelected]);

  const press = () => {
    if (isUsable) {
      props.isSelected
        ? (position.value = position.value + 2)
        : (position.value = position.value + 6);
    } else {
      return;
    }
  };

  const release = () => {
    if (isUsable) {
      props.addToSelection({ buttonName: props.buttonName, trigger: "itself" });
      setIsUsable(false);
    } else {
      return;
    }
  };

  return (
    <View
      className={
        props.isSelected
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
              props.isSelected
                ? "text-xs text-[#ffd33d]"
                : "text-xs text-[#b1b1b1]"
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
