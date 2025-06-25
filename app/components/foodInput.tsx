import { View, Text, TextInput } from "react-native";
import { useState, useRef } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { Trash2, Camera, RotateCcw } from "lucide-react-native";
import { Image } from "expo-image";
import {
  Pressable,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function FoodInput(props: any) {
  const [description, setDescription] = useState<string>("");

  const isLocked = true;
  const lockData = () => {};

  const [cursorPosition, setCursorPosition] = useState<string>("");
  const [balanceValue, setBalanceValue] = useState<number>(0);

  const lastZoneRef = useRef<string | null>(null);
  const lastBalanceRef = useRef<number | null>(null);

  const panGesture = Gesture.Pan().onUpdate((e) => {
    let zone: string;
    let balance: number;

    if (e.absoluteX < 155) {
      zone = "items-start";
      balance = -1;
    } else if (e.absoluteX < 200) {
      zone = "items-center";
      balance = 0;
    } else {
      balance = 1;
      zone = "items-end";
    }

    if (lastZoneRef.current !== zone) {
      lastZoneRef.current = zone;
      lastBalanceRef.current = balance;

      runOnJS(setCursorPosition)(zone);
      runOnJS(setBalanceValue)(balance);

      console.log("cursor position ->", props.buttonName, balance);
    }
  });

  let backgroundColor;
  let topBarColor;
  let sliderColor;

  if (balanceValue > 0) {
    console.log("good");
    backgroundColor = "bg-[#e1fff3]";
    topBarColor = "bg-[#c7f7e4]";
    sliderColor = "bg-[#c7f7e4]";
  } else if (balanceValue === 0) {
    backgroundColor = "bg-[#eeeeee]";
    topBarColor = "bg-[#e0e0e0]";
    sliderColor = "bg-[#e0e0e0]";
  } else {
    backgroundColor = "bg-[#ffe1e1]";
    topBarColor = "bg-[#fccfcf]";
    sliderColor = "bg-[#fccfcf]";
  }
  console.log(backgroundColor);
  return (
    <View
      className={`${backgroundColor} my-2 w-[100%] rounded-2xl flex-col justify-between items-between min-h-[200px]`}
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
      <View className="w-full rounded-b-2xl justify-center items-center">
        {props.preview ? (
          <>
            <Image
              source={props.preview}
              contentFit="cover"
              style={{
                width: 250,
                aspectRatio: 1,
                backgroundColor: "red",
                borderRadius: 10,
                marginTop: 10,
              }}
            ></Image>
            <Pressable
              onPress={() => props.openModal(props.buttonName)}
              className="absolute top-[225px] left-[249px] w-10 h-10 items-center justify-center bt-2 bt-red-200"
              style={{
                position: "absolute",
                top: 225,
                left: 249,
              }}
            >
              <RotateCcw color="white" />
            </Pressable>
          </>
        ) : (
          <Pressable
            onPress={() => props.openModal(props.buttonName)}
            className="w-24 h-24 rounded-2xl border-2 border-blue-200  justify-center items-center m-4 bg-red-200"
            style={{
              height: 100,
              width: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              borderWidth: 2,
              borderColor: "blue",
            }}
          >
            <Camera />
          </Pressable>
        )}
        <View className="w-[90%] h-[1px] bg-gray-300 separator mt-2"></View>

        <TextInput
          multiline
          numberOfLines={4}
          className="w-[95%] rounded-b-2xl "
          placeholder="Description"
          onChangeText={(value) => setDescription(value)}
        ></TextInput>
        <GestureDetector gesture={panGesture}>
          <View
            className={`${sliderColor} w-32 h-8 mb-2 rounded-3xl p-1 justify-center ${cursorPosition}`}
            style={{
              boxShadow: [
                {
                  offsetX: 0,
                  offsetY: 1,
                  blurRadius: 4,
                  spreadDistance: 0,
                  color: "rgba(0,0,0,0.25)",
                  inset: true,
                },
              ],
            }}
          >
            <View className="rounded-full h-[90%] aspect-[1/1] bg-white"></View>
          </View>
        </GestureDetector>
      </View>
    </View>
  );
}
