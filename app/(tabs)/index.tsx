import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Button,
} from "react-native";
import { Image } from "expo-image";
import { CameraView, useCameraPermissions, Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
import React, { useState, useEffect, useRef, useContext } from "react";
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
import Animated, {
  withSpring,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";
import { DataContext } from "../_layout";
import { CountUp } from "use-count-up";
export default function Index() {
  const { setData, data } = useContext(DataContext);
  type selectedObjectType = {
    buttonName: string | null;
    trigger: string | null;
    currentState: boolean;
  };

  type todayDataType = {
    breakfastImg: string;
    breakfastDesc: string;
    lunchImg: string;
    lunchDesc: string;
    dinnerImg: string;
    dinnerDesc: string;
    extraImg: string;
    extraDesc: string;
    sleep: number;
    water: boolean;
    exercice: string;
    balance: number[];
    date: string;
  };
  const formattedDate = moment().format("dddd, MMMM Do YYYY");

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [modalOpenedBy, setModalOpenedBy] = useState<string>("");
  const [todayData, setTodayData] = useState<todayDataType | null>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedButton, setSelectedButton] = useState<selectedObjectType[]>([
    { buttonName: "breakfast", trigger: null, currentState: false },
    { buttonName: "lunch", trigger: null, currentState: false },
    { buttonName: "dinner", trigger: null, currentState: false },
    { buttonName: "extra", trigger: null, currentState: false },
    { buttonName: "water", trigger: null, currentState: false },
    { buttonName: "sleep", trigger: null, currentState: false },
    { buttonName: "exercice", trigger: null, currentState: false },
  ]);

  const [lockedInput, setLockedInput] = useState<boolean>(false);
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

  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);
  const [countUpCanShow, setCountUpCanShow] = useState<boolean>(false);
  const [valueToCountUp, setValueToCountUp] = useState<number>(12313);

  // const [hasPermission, setHasPermission] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const result = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(result && result?.status === "granted");
  //   })();
  // }, []);

  // if (!hasPermission) {
  //   return <View />;
  // }

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow
    );

    fetch("https://daily-tracker-backend-delta.vercel.app/initDay")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setValueToCountUp(data.dayStreak);
          setCountUpCanShow(true);
          setHasInitialized(true);
        }
        setData({ streak: data.dayStreak, lastFail: data.timeSinceLastBadDay });
      });

    return () => {
      showSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      closeModal();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    if (hasInitialized) {
      fetch("https://daily-tracker-backend-delta.vercel.app/checkToday")
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setTodayData(data.today);
          }
        });
    }
  }, [hasInitialized, lockedInput]);

  const closeModal = () => {
    setModalOpened(false);
    setModalOpenedBy("");
  };

  const handleKeyboardShow = (e: any) => {
    setIsKeyboardVisible(true);
    setKeyboardHeight(e.endCoordinates.height);
  };
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white font-semi-bold">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            width: 60,
            height: 20,
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1230,
            },
            shadowOpacity: 0,
            shadowRadius: 1,

            elevation: 2,
          }}
          onPress={requestPermission}
        >
          <Text>grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const clear = (name: string) => {
    setPreviewDescription("");
    switch (name) {
      case "breakfast":
        setBFPreview("");
        setBFDescription("");
        setLockedInput(!lockedInput);
        break;
      case "lunch":
        setLunchPreview("");
        setLunchDescription("");
        setLockedInput(!lockedInput);
        break;
      case "dinner":
        setDinnerPreview("");
        setDinnerDescription("");
        setLockedInput(!lockedInput);
        break;
      case "extra":
        setExtraPreview("");
        setExtraDescription("");
        setLockedInput(!lockedInput);
        break;
      case "exercice":
        setLockedInput(!lockedInput);
        break;
      case "sleep":
        setLockedInput(!lockedInput);
        break;
      default:
        console.error("Photo taken from an unknown source");
    }
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

  //Handling back button on android

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
      buttonName: "breakfast",
      iconElem: (
        <Coffee
          color={
            selectedButton.some(
              (elem) =>
                elem.buttonName === "breakfast" && elem.currentState === true
            )
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
      preview: bfPreview,
      desc: bfDescription,
      locked: todayData?.breakfastImg !== "",
    },
    {
      buttonName: "lunch",
      iconElem: (
        <Sandwich
          color={
            selectedButton.some(
              (elem) =>
                elem.buttonName === "lunch" && elem.currentState === true
            )
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
      preview: lunchPreview,
      desc: lunchDescription,
      locked: todayData?.lunchImg !== "",
    },
    {
      buttonName: "dinner",
      iconElem: (
        <CookingPot
          color={
            selectedButton.some(
              (elem) =>
                elem.buttonName === "dinner" && elem.currentState === true
            )
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
      preview: dinnerPreview,
      desc: dinnerDescription,
      locked: todayData?.dinnerImg !== "",
    },
    {
      buttonName: "extra",
      iconElem: (
        <Donut
          color={
            selectedButton.some(
              (elem) =>
                elem.buttonName === "extra" && elem.currentState === true
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
      buttonName: "water",
      iconElem: (
        <Droplet
          color={
            selectedButton.some(
              (elem) =>
                elem.buttonName === "water" && elem.currentState === true
            )
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
      locked: todayData?.water !== null,
    },
    {
      buttonName: "sleep",
      iconElem: (
        <Bed
          color={
            selectedButton.some(
              (elem) =>
                elem.buttonName === "sleep" && elem.currentState === true
            )
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
      locked: todayData?.sleep !== 0,
    },
    {
      buttonName: "exercice",
      iconElem: (
        <Dumbbell
          color={
            selectedButton.some(
              (elem) =>
                elem.buttonName === "exercice" && elem.currentState === true
            )
              ? "#ffd33d"
              : "#737169"
          }
        />
      ),
      good: true,
      locked: todayData?.exercice !== "",
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
        isSelected={
          currentElement && !data.locked ? currentElement.currentState : false
        }
        from={currentElement ? currentElement.trigger : null}
        isLocked={data.locked}
      />
    );
  });

  const clearPreview = (from: string) => {
    switch (from) {
      case "breakfast":
        setBFPreview("");
        setBFDescription("");
        break;
      case "lunch":
        setLunchPreview("");
        setLunchDescription("");
        break;
      case "dinner":
        setDinnerPreview("");
        setDinnerDescription("");
        break;
      case "extra":
        setExtraPreview("");
        setExtraDescription("");
        break;
      default:
        console.error("Photo taken from an unknown source");
    }
  };
  const openModal = (from: string) => {
    setPreview("");
    setModalOpenedBy(from);
    setModalOpened(true);
  };

  const pickImage = async (from: string) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setPreview(result.assets[0].uri);
      setModalOpenedBy(from);
      setModalOpened(true);
    }
  };
  // Generating the inputs windows that are generated in the second part of the page
  const inputsArray = buttonData.map((data, i) => {
    if (
      selectedButton.some(
        (elem) =>
          elem.buttonName === data.buttonName && elem.currentState === true
      ) &&
      !data.locked
    )
      switch (data.buttonName) {
        case "breakfast":
        case "lunch":
        case "dinner":
        case "extra":
          return (
            <FoodInput
              key={i}
              {...data}
              openModal={openModal}
              clearPreview={clearPreview}
              addToSelection={addToSelection}
              isLocked={data.locked}
              clear={clear}
              pickImage={pickImage}
            />
          );
          break;
        case "water":
          return (
            <Water
              key={i}
              buttonName={data.buttonName}
              addToSelection={addToSelection}
              isLocked={data.locked}
              clear={clear}
            />
          );
          break;
        case "sleep":
          return (
            <Sleep
              key={i}
              buttonName={data.buttonName}
              addToSelection={addToSelection}
              isLocked={data.locked}
              clear={clear}
            />
          );
          break;
        case "exercice":
          return (
            <Exercice
              key={i}
              buttonName={data.buttonName}
              addToSelection={addToSelection}
              isLocked={data.locked}
              clear={clear}
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

    photo && setPreview(photo.uri);
  };

  const validatePicture = () => {
    if (preview || previewDescription) {
      switch (modalOpenedBy) {
        case "breakfast":
          setBFPreview(preview);
          setBFDescription(previewDescription);
          break;
        case "lunch":
          setLunchPreview(preview);
          setLunchDescription(previewDescription);
          break;
        case "dinner":
          setDinnerPreview(preview);
          setDinnerDescription(previewDescription);
          break;
        case "extra":
          setExtraPreview(preview);
          setExtraDescription(previewDescription);
          break;
        default:
          console.error("Photo taken from an unknown source");
      }
    }
    setPreviewDescription("");
    setModalOpened(false);
  };

  if (!hasInitialized) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white font-bold text-3xl">Welcome</Text>
        <Text className="text-white font-bold text-3xl">
          To your Daily Tracker
        </Text>
      </View>
    );
  }

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
          {inputsArray.some((e) => e !== undefined) ? (
            inputsArray
          ) : (
            <Text className="w-full h-full text-center mt-[200px]">
              Press any button to start saving you data
            </Text>
          )}
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
                        onChangeText={(value) => setPreviewDescription(value)}
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
      {countUpCanShow && (
        <View className="w-full h-full bg-[#000000bb] absolute z-50 items-center justify-center">
          <Pressable
            onPress={() => setCountUpCanShow(false)}
            className="w-full h-full absolute z-50 items-center justify-center"
          >
            <Text className="text-white font-bold text-[135px]">
              <CountUp isCounting end={valueToCountUp} duration={3} />
            </Text>
          </Pressable>
        </View>
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
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
});
