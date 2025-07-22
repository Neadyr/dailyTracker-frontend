import { View, Text, ScrollView } from "react-native";
import { useState, useRef, useMemo, useEffect } from "react";
import {
  Pressable,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { runOnJS, useSharedValue } from "react-native-reanimated";

export default function InfiniteScroll(props: {
  data: string[] | null;
  arrayLength: number;
}) {
  const { data, arrayLength } = props;
  const [value, setValue] = useState<number>(0);
  const lastPositionRef = useSharedValue(0);
  const lastValueRef = useSharedValue(0);

  const dataLength = useSharedValue(0);

  useEffect(() => {
    if (typeof arrayLength === "number" && arrayLength !== null) {
      dataLength.value = arrayLength;
    }
  }, [arrayLength]);

  // const pickExercice = (data: string) => {
  //   setPickedExercice(data);
  //   setHasBeenPressed(!hasBeenPressed);
  // };

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          lastPositionRef.value = 0;
        })
        .onUpdate((e) => {
          const dy = e.translationY - lastPositionRef.value;

          const threshold = 15;
          if (dy > threshold) {
            lastPositionRef.value += threshold;
            lastValueRef.value += 1;
            if (dataLength.value > 0 && lastValueRef.value > dataLength.value) {
              lastValueRef.value = 0;
              runOnJS(setValue)(0);
            } else {
              runOnJS(setValue)(lastValueRef.value);
            }
          }
          if (dy < -threshold) {
            lastPositionRef.value -= threshold;
            lastValueRef.value -= 1;

            if (dataLength.value > 0 && lastValueRef.value < 0) {
              lastValueRef.value = dataLength.value;
              runOnJS(setValue)(arrayLength);
            } else {
              runOnJS(setValue)(lastValueRef.value);
            }
          }
        }),
    []
  );
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
