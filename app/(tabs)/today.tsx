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
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

import { Link, useLocalSearchParams } from "expo-router";
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
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
import FoodInput from "../components/foodInput";
export default function Index() {
  type selectedObjectType = {
    buttonName: string | null;
    trigger: string | null;
    currentState: boolean;
  };
  const formattedDate = moment().format("dddd, MMMM Do YYYY");

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [modalOpenedBy, setModalOpenedBy] = useState<string>("");

  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedButton, setSelectedButton] = useState<selectedObjectType[]>([
    { buttonName: "Breakfast", trigger: null, currentState: false },
    { buttonName: "Lunch", trigger: null, currentState: false },
    { buttonName: "Dinner", trigger: null, currentState: false },
    { buttonName: "Extra", trigger: null, currentState: false },
    { buttonName: "Water", trigger: null, currentState: false },
    { buttonName: "Sleep", trigger: null, currentState: false },
    { buttonName: "Exercice", trigger: null, currentState: false },
  ]);

  const [lockedInput, setLockedInput] = useState<[string] | null>(null);
  // Preview Bloc //
  const [preview, setPreview] = useState<string>("");

  const [bfPreview, setBFPreview] = useState<string>("");
  const [lunchPreview, setLunchPreview] = useState<string>("");
  const [dinnerPreview, setDinnerPreview] = useState<string>("");
  const [extraPreview, setExtraPreview] = useState<string>("");
  const [bfDescription, setBFDescription] = useState<string>("");
  const [lunchDescription, setLunchDescription] = useState<string>("");
  const [dinnerDescription, setDinnerDescription] = useState<string>("");
  const [extraDescription, setExtraDescription] = useState<string>("");

  //Handling back button on android
  useEffect(() => {
    const backAction = () => {
      closeModal();
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
      preview: bfPreview,
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
      preview: lunchPreview,
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
      preview: dinnerPreview,
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
      preview: extraPreview,
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
  const openModal = (from: string) => {
    setPreview("");
    setModalOpenedBy(from);
    setModalOpened(true);
  };
  const closeModal = () => {
    setModalOpened(false);
    setModalOpenedBy("");
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
        <FoodInput
          key={i}
          {...data}
          openModal={openModal}
          addToSelection={addToSelection}
          isLocked={null}
        />
      );
  });

  // Camera stuff //

  const takePicture = async () => {
    const photo: any = await cameraRef.current?.takePictureAsync({
      quality: 0.3,
    });
    photo && setPreview(photo.uri);
  };

  const validatePicture = () => {
    if (preview) {
      switch (modalOpenedBy) {
        case "Breakfast":
          setBFPreview(preview);
          break;
        case "Lunch":
          setLunchPreview(preview);
          break;
        case "Dinner":
          setDinnerPreview(preview);
          break;
        case "Extra":
          setExtraPreview(preview);
          break;
        default:
          console.error("Photo taken from an unknown source");
      }
    }
    setModalOpened(false);
  };
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
        <TouchableWithoutFeedback accessible={false}>
          <ScrollView
            className="w-[90%] h-[50%] mt-4 px-1"
            keyboardShouldPersistTaps="handled"
          >
            {inputsArray}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {modalOpened && (
        <Pressable
          className="w-[100%] h-[100%] absolute z-50 justify-center items-center"
          onPress={closeModal}
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
              {preview ? (
                <>
                  <View className="h-[300px] w-[300px]">
                    <View className="w-full h-full overflow-hidden rounded-2xl">
                      <Image
                        source={preview}
                        contentFit="cover"
                        style={{
                          width: "100%",
                          aspectRatio: 1,
                          backgroundColor: "red",
                          borderRadius: 10,
                          marginTop: 10,
                        }}
                      ></Image>
                    </View>
                  </View>
                  <View className="flex-row justify-between w-full px-4">
                    <TouchableOpacity
                      className=" w-28 h-14 rounded-xl border-4 border-white mt-2 items-center justify-center"
                      onPress={validatePicture}
                    >
                      <Text className="text-black">Validate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className=" w-28 h-14 rounded-xl border-4 border-white mt-2 items-center justify-center"
                      onPress={() => setPreview("")}
                    >
                      <Text className="text-black">Retake</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View className="h-[300px] w-[300px]">
                    <View className="w-full h-full overflow-hidden rounded-2xl">
                      <CameraView
                        style={{ flex: 1 }}
                        // @ts-ignore
                        ref={(ref) => (cameraRef.current = ref)}
                      ></CameraView>
                    </View>
                  </View>
                  <View className="flex-row justify-between w-full px-4">
                    <TouchableOpacity
                      className=" w-28 h-14 rounded-xl border-4 border-white mt-2 items-center justify-center"
                      onPress={takePicture}
                    >
                      <Text className="text-black">Take Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className=" w-28 h-14 rounded-xl border-4 border-white mt-2 items-center justify-center"
                      onPress={closeModal}
                    >
                      <Text className="text-black">Close</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
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
