import { View, Text, ScrollView } from "react-native";
import { useState, useRef, useMemo, useEffect } from "react";
import {
  Pressable,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { runOnJS, useSharedValue } from "react-native-reanimated";

export default function InfiniteScroll(props: { data: string[] | null }) {
  const { data } = props;

  const [hasBeenPressed, setHasBeenPressed] = useState<boolean>(false);
  const [pickedExercice, setPickedExercice] = useState<string>("");
  // const [current, setPickedExercice] = useState<string>("");
  const [value, setValue] = useState<number>(0);

  const lastPositionRef = useSharedValue(0);
  const lastValueRef = useRef<number>(0);

  const pickExercice = (data: string) => {
    setPickedExercice(data);
    setHasBeenPressed(!hasBeenPressed);
  };

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          lastValueRef.current = value;
          lastPositionRef.value = 0;
        })
        .onUpdate((e) => {
          // currentPositionRef.current = Math.round(e.absoluteY);
          const dy = e.translationY - lastPositionRef.value;

          const threshold = 15;
          if (dy > threshold) {
            lastPositionRef.value += threshold;
            lastValueRef.current -= 1;
            runOnJS(setValue)(lastValueRef.current);
          }
          if (dy < -threshold) {
            lastPositionRef.value -= threshold;

            lastValueRef.current += 1;
            runOnJS(setValue)(lastValueRef.current);
          }
        }),
    []
  );

  const dropDown = data?.map((data: string, i: number) => {
    if (data === "cardio" || data === "calistenic" || data === "activity") {
      return (
        <View key={i}>
          <Text className="text-gray-600 h-6">{data}</Text>
        </View>
      );
    } else if (data === "dash") {
      return <View key={i} className="w-full h-[1px] bg-black my-[1px]"></View>;
    } else {
      return (
        <Pressable key={i} onPress={() => pickExercice(data)}>
          <Text className="text-blue-200 my-2">{data}</Text>
        </Pressable>
      );
    }
  });
  return (
    <GestureDetector gesture={panGesture}>
      <View
        style={{
          width: "100%",
          height: 30,
          borderRadius: 5,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 2,
          display: "flex",
          justifyContent: "center",
          paddingLeft: 10,
          elevation: 1,
        }}
        // onPress={() => setHasBeenPressed(!hasBeenPressed)}
      >
        {data ? <Text>{data[value]}</Text> : <Text>{value}</Text>}
      </View>
    </GestureDetector>
  );
}
