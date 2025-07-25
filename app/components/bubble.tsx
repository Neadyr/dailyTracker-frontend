import { View, TouchableOpacity, Text } from "react-native";
import { useState, useEffect } from "react";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { Lock } from "lucide-react-native";

export default function Bubble(props: any) {
  // ANIMATIOOOOOOOOON
  const position = useSharedValue(-7);

  const [isUsable, setIsUsable] = useState<boolean>(true);
  const [hasPressed, setHasPressed] = useState<boolean>(false);

  useEffect(() => {
    if (!props.locked) {
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
      }, 300);
    } else {
      position.value = withSpring(position.value - 4, {
        duration: 350,
        dampingRatio: 0.2,
      });
    }
  }, [props.isSelected]);

  if (props.locked) {
    return (
      <View
        className={
          "relative w-[40px] h-[40px] rounded-xl justify-center items-end bg-[#c1c1c1] shadow z-20 mb-5"
        }
      >
        <Animated.View
          className="w-[40px] h-[40px] absolute bg-[#737169] z-10 rounded-xl flex-row items-center justify-between"
          style={{ top: position }}
        >
          <TouchableOpacity
            className="w-[40px] h-[40px] flex-col justify-center items-center"
            activeOpacity={0.9}
          >
            <Lock color={"#f8f8f8"} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
  const press = () => {
    if (isUsable) {
      setHasPressed(true);
      props.isSelected
        ? (position.value = position.value + 2)
        : (position.value = position.value + 6);
    } else {
      return;
    }
  };

  const release = () => {
    if (isUsable && hasPressed) {
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
          ? "relative w-[40px] h-[40px] rounded-xl justify-center items-end bg-goldLight shadow z-20 mb-5"
          : "relative w-[40px] h-[40px] rounded-xl justify-center items-end bg-[#e1e1e1] shadow z-20 mb-5"
      }
    >
      <Animated.View
        className="w-[40px] h-[40px] absolute bg-[#f8f8f8] z-10 rounded-xl flex-row items-center justify-between"
        style={{ top: position }}
      >
        <TouchableOpacity
          onPressIn={press}
          onPressOut={release}
          className="w-[40px] h-[40px] flex-col justify-between items-center"
          activeOpacity={0.9}
        >
          {props.iconElem}
          <Text
            className={
              props.isSelected
                ? "text-[9px] text-[#ffd33d]"
                : "text-[9px] text-[#b1b1b1]"
            }
          >
            {props.buttonName}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
