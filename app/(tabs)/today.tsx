import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  SafeAreaView,
  BackHandler,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Bubble from "../components/bubble";
import {
  Coffee,
  Sandwich,
  CookingPot,
  Donut,
  Droplet,
  Bed,
  Dumbbell,
  Trash2,
  Camera,
} from "lucide-react-native";
import CameraComponent from "./camera";
// ----- / Color code / ----- //
//    Dark : #212A31        //
//    Darkish : #2e3944     //
//    Darkishish: #34414e   //
//    Blue : #124e56        //
//    Greensih : #748D92    //
//    Grey : #D3D9D4        //
//    Gold : #ffd33d        //
// ---------- \o/ ----------- //

export default function Index() {
  type selectedObjectType = {
    buttonName: string | null;
    trigger: string | null;
    currentState: boolean;
  };
  const { uri } = useLocalSearchParams();
  console.log("Params", uri);
  const formattedDate = moment().format("dddd, MMMM Do YYYY");
  const [breakfastDesc, setBreakfastDesc] = useState<string>("");
  const [lunchDesc, setLunchDesc] = useState<string>("");
  const [dinnerDesc, setDinnerDesc] = useState<string>("");
  const [waterAmount, setWaterAmount] = useState<string>("");
  const [sleepAmount, setSleepAmount] = useState<string>("");
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const [selectedButton, setSelectedButton] = useState<selectedObjectType[]>([
    { buttonName: "Breakfast", trigger: null, currentState: false },
    { buttonName: "Lunch", trigger: null, currentState: false },
    { buttonName: "Dinner", trigger: null, currentState: false },
    { buttonName: "Extra", trigger: null, currentState: false },
    { buttonName: "Water", trigger: null, currentState: false },
    { buttonName: "Sleep", trigger: null, currentState: false },
    { buttonName: "Exercice", trigger: null, currentState: false },
  ]);

  useEffect(() => {
    const backAction = () => {
      setModalOpened(false);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // Checking for currentState and sets it to the opposite, changes trigger too for animation purposes
  const addToSelection = (elem: { buttonName: string; trigger: string }) => {
    if (
      selectedButton.some(
        (e) => e.buttonName === elem.buttonName && e.currentState === true
      )
    ) {
      setSelectedButton(
        selectedButton.map((e) => {
          if (e.buttonName === elem.buttonName && e.currentState === true) {
            return {
              buttonName: elem.buttonName,
              trigger: elem.trigger,
              currentState: false,
            };
          } else {
            return {
              buttonName: e.buttonName,
              trigger: e.trigger,
              currentState: e.currentState,
            };
          }
        })
      );
    } else {
      setSelectedButton(
        selectedButton.map((e) => {
          if (e.buttonName === elem.buttonName && e.currentState === false) {
            return {
              buttonName: elem.buttonName,
              trigger: elem.trigger,
              currentState: true,
            };
          } else {
            return {
              buttonName: e.buttonName,
              trigger: e.trigger,
              currentState: e.currentState,
            };
          }
        })
      );
    }
  };
  // Top page buttons data, with lucide icons and color directly handled there
  const buttonData = [
    {
      buttonName: "Breakfast",
      iconElem: (
        <Coffee
          color={
            selectedButton.some(
              (elem) =>
                elem.buttonName === "Breakfast" && elem.currentState === true
            )
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
    },
    {
      buttonName: "Lunch",
      iconElem: (
        <Sandwich
          color={
            selectedButton.some(
              (elem) =>
                elem.buttonName === "Lunch" && elem.currentState === true
            )
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
    },
    {
      buttonName: "Dinner",
      iconElem: (
        <CookingPot
          color={
            selectedButton.some(
              (elem) =>
                elem.buttonName === "Dinner" && elem.currentState === true
            )
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
    },
    {
      buttonName: "Extra",
      iconElem: (
        <Donut
          color={
            selectedButton.some(
              (elem) =>
                elem.buttonName === "Extra" && elem.currentState === true
            )
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: false,
    },
    {
      buttonName: "Water",
      iconElem: (
        <Droplet
          color={
            selectedButton.some(
              (elem) =>
                elem.buttonName === "Water" && elem.currentState === true
            )
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
    },
    {
      buttonName: "Sleep",
      iconElem: (
        <Bed
          color={
            selectedButton.some(
              (elem) =>
                elem.buttonName === "Sleep" && elem.currentState === true
            )
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
    },
    {
      buttonName: "Exercice",
      iconElem: (
        <Dumbbell
          color={
            selectedButton.some(
              (elem) =>
                elem.buttonName === "Exercice" && elem.currentState === true
            )
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
    },
  ];
  // Generating the button array with all according logic, isSelected and trigger
  const buttonArray = buttonData.map((data, i) => {
    const currentElement = selectedButton.find(
      (elem) => elem.buttonName === data.buttonName
    );

    return (
      <Bubble
        {...data}
        key={i}
        addToSelection={addToSelection}
        isSelected={currentElement ? currentElement.currentState : false}
        from={currentElement ? currentElement.trigger : null}
      />
    );
  });
  const openModal = () => {
    setModalOpened(!modalOpened);
  };
  // Generating the inputs windows that are generated in the second part of the page
  const inputsArray = buttonData.map((data, i) => {
    if (
      selectedButton.some(
        (elem) =>
          elem.buttonName === data.buttonName && elem.currentState === true
      )
    )
      return (
        <View
          key={i}
          className="bg-[#eeeeee] my-2 w-[100%] rounded-2xl flex-col justify-between items-between z-20 min-h-[200px]"
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
            className="w-full h-8 rounded-t-2xl bg-[#eaeaea] flex-row justify-between items-center pl-2"
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
            <Text>{data.buttonName}</Text>

            <TouchableOpacity
              onPress={() =>
                addToSelection({
                  buttonName: data.buttonName,
                  trigger: "trash",
                })
              }
              className=" h-full w-[10%] rounded-tr-2xl justify-center items-center"
            >
              <Trash2 size={16} color="#ff3333" />
            </TouchableOpacity>
          </View>
          <View className="w-full rounded-b-2xl justify-center items-center">
            <TouchableOpacity
              onPress={openModal}
              className="w-24 h-24 rounded-2xl border-2 border-blue-200  justify-center items-center m-4"
            >
              <Camera />
            </TouchableOpacity>
            <TextInput
              multiline
              numberOfLines={4}
              className="w-full  rounded-b-2xl"
            ></TextInput>
          </View>
        </View>
      );
  });
  console.log(modalOpened);
  return (
    <>
      <KeyboardAvoidingView
        className="flex-1 justify-start items-center "
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar hidden={true} />
        <View className="mt-10 mb-10">
          <Text className="text-black text-2xl font-bold">{formattedDate}</Text>
        </View>
        <View className="flex-row gap-2 flex-wrap w-full justify-center">
          {buttonArray}
        </View>
        <View className="w-[90%] h-[1px] bg-gray-200 separator"></View>
        <ScrollView className="w-[90%] h-[50%] mt-4">{inputsArray}</ScrollView>
      </KeyboardAvoidingView>
      {modalOpened && (
        <Pressable
          className="w-[100%] h-[100%] absolute z-50 justify-center items-center transition-all duration-300 opacity-1"
          onPress={openModal}
        >
          <TouchableWithoutFeedback className="w-[90%] p-2 bg-gray-600 rounded-2xl justify-center items-center">
            <View
              className="w-[90%] justify-center items-center px-2 py-4 rounded-2xl bg-[#eaeaea]"
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
              <View className="h-[300px] w-[300px]">
                <CameraComponent />
              </View>
              <View className="flex-row justify-between w-full px-4">
                <TouchableOpacity className=" w-28 h-14 rounded-xl border-4 border-white mt-2"></TouchableOpacity>
                <TouchableOpacity className=" w-28 h-14 rounded-xl border-4 border-white mt-2"></TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e3944",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  centralText: {
    color: "white",
  },
  title: {
    width: "100%",
    height: "15%",
    backgroundColor: "#212A31",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    paddingTop: 15,
  },
  titleText: {
    color: "#748D92",
    fontSize: 24,
  },
  description: {
    width: "95%",
    backgroundColor: "#2e3944",
    borderRadius: 3,
    margin: 20,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "#748D92",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
