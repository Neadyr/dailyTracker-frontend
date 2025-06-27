import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  BackHandler,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Image } from "expo-image";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
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
} from "lucide-react-native";
import FoodInput from "../components/foodInput";
import Water from "../components/water";
import Sleep from "../components/sleep";
import Exercice from "../components/exercice";

import Animated, { withSpring, withTiming } from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";

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
  const [previewDescription, setPreviewDescription] = useState<string>("");
  const [lunchPreview, setLunchPreview] = useState<string>("");
  const [dinnerPreview, setDinnerPreview] = useState<string>("");
  const [extraPreview, setExtraPreview] = useState<string>("");
  const [bfDescription, setBFDescription] = useState<string>("");
  const [lunchDescription, setLunchDescription] = useState<string>("");
  const [dinnerDescription, setDinnerDescription] = useState<string>("");
  const [extraDescription, setExtraDescription] = useState<string>("");

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide
    );

    return () => {
      showSubscription.remove();
    };
  }, []);

  const handleKeyboardShow = (e: any) => {
    console.log(e);

    setIsKeyboardVisible(true);
    setKeyboardHeight(e.endCoordinates.height);
  };

  const handleKeyboardHide = () => {
    console.log("closed");
    setIsKeyboardVisible(false);
    setKeyboardHeight(0);
  };

  //Reanimated
  const customEntering = () => {
    "worklet";
    const animations = {
      transform: [{ scale: withSpring(1, { duration: 300 }) }],
      opacity: 1,
    };
    const initialValues = {
      transform: [{ scale: 0 }],
      opacity: 0,
    };
    return {
      initialValues,
      animations,
    };
  };

  const customExiting = () => {
    "worklet";
    const animations = {
      transform: [{ scale: withTiming(0, { duration: 300 }) }],
      opacity: 0,
    };
    const initialValues = {
      transform: [{ scale: 1 }],
      opacity: 1,
    };
    return {
      initialValues,
      animations,
    };
  };
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
      desc: bfDescription,
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
      desc: lunchDescription,
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
      desc: dinnerDescription,
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
      desc: extraDescription,
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
  const pickImage = async (from: string) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPreview(result.assets[0].uri);
    }
  };
  // Generating the inputs windows that are generated in the second part of the page
  const inputsArray = buttonData.map((data, i) => {
    if (
      selectedButton.some(
        (elem) =>
          elem.buttonName === data.buttonName && elem.currentState === true
      )
    )
      switch (data.buttonName) {
        case "Breakfast":
        case "Lunch":
        case "Dinner":
        case "Extra":
          return (
            <FoodInput
              key={i}
              {...data}
              openModal={openModal}
              addToSelection={addToSelection}
              isLocked={null}
              pickImage={pickImage}
            />
          );
          break;
        case "Water":
          return (
            <Water
              key={i}
              buttonName={data.buttonName}
              addToSelection={addToSelection}
            />
          );
          break;
        case "Sleep":
          return (
            <Sleep
              key={i}
              buttonName={data.buttonName}
              addToSelection={addToSelection}
            />
          );
          break;
        case "Exercice":
          return (
            <Exercice
              key={i}
              buttonName={data.buttonName}
              addToSelection={addToSelection}
            />
          );
          break;
      }
  });

  // Camera stuff //

  const takePicture = async () => {
    const photo: any = await cameraRef.current?.takePictureAsync({
      quality: 0.3,
    });
    console.log(photo.uri);
    photo && setPreview(photo.uri);
  };

  const validatePicture = () => {
    console.log(modalOpenedBy);
    if (preview || previewDescription) {
      switch (modalOpenedBy) {
        case "Breakfast":
          setBFPreview(preview);
          setBFDescription(previewDescription);
          break;
        case "Lunch":
          setLunchPreview(preview);
          setLunchDescription(previewDescription);
          break;
        case "Dinner":
          setDinnerPreview(preview);
          setDinnerDescription(previewDescription);
          break;
        case "Extra":
          setExtraPreview(preview);
          setExtraDescription(previewDescription);
          break;
        default:
          console.error("Photo taken from an unknown source");
      }
    }
    setModalOpened(false);
  };
  return (
    <View className="flex-1 justify-start items-center">
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
          className="w-[90%] px-1"
          keyboardShouldPersistTaps="handled"
        >
          {inputsArray}
        </ScrollView>
      </TouchableWithoutFeedback>

      {modalOpened && (
        <Animated.View
          className={`w-[100%] h-[100%] absolute z-50 justify-start items-start bg-[#00000099]`}
        >
          <Animated.View
            entering={customEntering}
            className="w-[100%] h-[100%] absolute z-50 justify-center items-center"
          >
            <Pressable
              className={`w-[100%] h-[100%] absolute z-50 ${
                keyboardHeight > 0 ? "justify-start" : "justify-center"
              } items-center pt-4`}
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
                      <View
                        className={`w-[90%] bg-gray-300 h-[1px] separator mt-2`}
                      ></View>
                      <TextInput
                        multiline
                        numberOfLines={2}
                        className="w-[95%] rounded-b-2xl "
                        placeholder="Description"
                        onChangeText={(value) =>
                          console.log(setPreviewDescription(value))
                        }
                      ></TextInput>
                      <View className="flex-row justify-between w-full px-4">
                        <TouchableOpacity
                          className=" w-28 h-14 rounded-xl mt-2 items-center justify-center bg-gray-100"
                          onPress={validatePicture}
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
                          <Text className="text-black">Validate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          className=" w-28 h-14 rounded-xl mt-2 items-center justify-center bg-gray-100"
                          onPress={() => setPreview("")}
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
                          <Text className="text-black">Retake</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <View className="h-[300px] w-[300px] animate-ping">
                        <View
                          className="w-full h-full overflow-hidden rounded-2xl"
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
                          <CameraView
                            style={{ flex: 1 }}
                            // @ts-ignore
                            ref={(ref) => (cameraRef.current = ref)}
                          ></CameraView>
                        </View>
                      </View>
                      <View className="flex-row justify-between w-full px-4">
                        <TouchableOpacity
                          className=" w-28 h-14 rounded-xl mt-2 items-center justify-center bg-gray-100"
                          onPress={takePicture}
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
                          <Text className="text-black">Take Picture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          className=" w-28 h-14 rounded-xl mt-2 items-center justify-center bg-gray-100"
                          onPress={closeModal}
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
                          <Text className="text-black">Close</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </Pressable>
          </Animated.View>
        </Animated.View>
      )}
    </View>
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
