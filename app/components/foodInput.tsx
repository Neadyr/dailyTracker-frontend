import { View, Text, TextInput } from "react-native";
import { useState, useRef } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import {
  Trash2,
  Camera,
  RotateCcw,
  Download,
  Smile,
  Meh,
  Frown,
  SquarePen,
  Check,
} from "lucide-react-native";
import { Image } from "expo-image";
import {
  Pressable,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

// WARNING : It seems Elements from react-native-gesture-handler doesn't support Nativewind/tailwind so classic style are applied to these elements
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
    let balance: number = 0;
    console.log(e.absoluteX);

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
    }
  });

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
      <View className="w-full rounded-b-2xl justify-center items-center pb-2">
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
                marginTop: 8,
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
          <View className="w-full items-center flex-row justify-center p-4">
            <View
              className={`w-[100px] h-[100px] items-center justify-center rounded-2xl ${topBarColor}`}
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
              <Pressable
                onPress={() => props.openModal(props.buttonName)}
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Camera color="#555555" />
              </Pressable>
            </View>
            <Text className="mx-2"> or </Text>
            <View
              className={`w-[100px] h-[100px] items-center justify-center rounded-2xl ${topBarColor}`}
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
              <Pressable
                onPress={() => props.pickImage(props.buttonName)}
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Download color="#555555" />
              </Pressable>
            </View>
          </View>
        )}

        <View
          className={`w-[90%] ${separatorColor} h-[1px] separator mt-2`}
        ></View>

        <Text
          numberOfLines={4}
          className={`w-[95%] rounded-b-2xl px-2 my-2 ${
            props.desc ? "text-black" : "text-gray-300"
          }`}
        >
          {props.desc || "No Description"}
        </Text>

        <GestureDetector gesture={panGesture}>
          <View
            className={`${sliderColor} w-32 h-8 my-2 rounded-3xl p-1 justify-center overflow-hidden ${
              cursorPosition ? cursorPosition : "items-center"
            }`}
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
            <View
              className="rounded-full h-[90%] aspect-[1/1] bg-white items-center justify-center"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1230,
                },
                shadowOpacity: 0,
                shadowRadius: 1,

                elevation: 2,
              }}
            >
              {balanceValue === 1 && <Smile color="#dddddd" size={16} />}
              {balanceValue === 0 && <Meh color="#dddddd" size={16} />}
              {balanceValue === -1 && <Frown color="#dddddd" size={16} />}
            </View>
          </View>
        </GestureDetector>
        <View className="w-[90%] flex-row justify-around px-12 py-2">
          <Pressable
            style={{
              height: 30,
              width: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fcfcfc",
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1230,
              },
              shadowOpacity: 0,
              shadowRadius: 1,

              elevation: 2,
            }}
          >
            <SquarePen />
          </Pressable>
          <Pressable
            style={{
              height: 30,
              width: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fcfcfc",
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1230,
              },
              shadowOpacity: 0,
              shadowRadius: 1,

              elevation: 2,
            }}
          >
            <Check />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
