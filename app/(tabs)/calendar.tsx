import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
  BackHandler,
  Keyboard,
} from "react-native";
import { Image } from "expo-image";
import MonthComponent from "../components/MonthComponent";
import { useState, useCallback, useContext, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { DataContext } from "../_layout";
import Animated, { withSpring } from "react-native-reanimated";
import { Hourglass, Check, X, Gift } from "lucide-react-native";

export default function Calendar() {
  const { data } = useContext(DataContext);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [allDays, setAllDays] = useState<any[]>();
  const [today, setToday] = useState<any>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [timeSinceLastGift, setTimeSinceLastGift] = useState(0);

  useFocusEffect(
    useCallback(() => {
      fetch(
        "https://daily-tracker-backend-delta.vercel.app/getFormattedAllDays"
      )
        .then((response) => response.json())
        .then((data) => {
          setAllDays(data.days);
        });
      fetch("https://daily-tracker-backend-delta.vercel.app/lastGift")
        .then((response) => response.json())
        .then((lastGift) => {
          setTimeSinceLastGift(lastGift.timeSinceLastGift);
        });
    }, [])
  );

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

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleKeyboardShow = (e: any) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  const handleKeyboardHide = () => {
    setKeyboardHeight(0);
  };

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

  const displayDay = async (bubbleData: any) => {
    const sending = await fetch(
      `https://daily-tracker-backend-delta.vercel.app/getSingleDay/${bubbleData.date}`
    );
    const response = await sending.json();
    if (response.result) {
      setModalOpen(true);
      setModalData(response.today);
    }
  };

  const days = allDays?.map((data, i) => {
    return (
      <View className="w-full" key={i}>
        <Text className="text-3xl font-extrabold">{Object.keys(data)[0]}</Text>
        <MonthComponent
          data={data[Object.keys(data)[0]]}
          displayDay={displayDay}
        />
      </View>
    );
  });

  console.log(timeSinceLastGift);

  return (
    <>
      <View
        className=" w-full h-[20%] justify-center items-center"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1230,
          },
          shadowOpacity: 0,
          shadowRadius: 1,

          elevation: 4,
        }}
      >
        <View className="bg-white px-4 py-2 rounded-xl w-[80%] justify-center items-center">
          <Text className="text-2xl font-bold">Overall recap</Text>
          <Text className="text-xl font-semibold">
            {data.streak} day{Number(data.streak) > 1 && "s"} streak
          </Text>
          <View className="absolute h-6 w-6 right-2 bottom-2 items-center justify-center">
            <Gift color={timeSinceLastGift > 3 ? "#ffd33d" : "grey"} />
          </View>
        </View>
      </View>
      <ScrollView>
        <View className="justify-center items-start w-full h-full  flex-wrap flex-row px-2">
          {days}
        </View>
      </ScrollView>
      {modalOpen && (
        <Animated.View
          className={`w-[100%] h-[100%] absolute z-50 justify-start items-start bg-[#00000099]`}
        >
          <Animated.View
            entering={customEntering}
            className="w-[100%] h-[100%] absolute z-50 justify-center items-center py-10"
          >
            <TouchableWithoutFeedback className="w-[90%] h-[90%] p-2 bg-gray-600 rounded-2xl justify-center items-center">
              <ScrollView
                className="w-[90%] px-10 py-4 rounded-2xl bg-[#eaeaea]"
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
                contentContainerStyle={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Text className="font-bold text-xl w-[80%] text-center bg-white px-4 py-2 rounded-md">
                  {modalData.date ? modalData.date.slice(0, 10) : "Date"}
                </Text>
                <View
                  className={`w-[100%] bg-gray-300 h-[2px] separator my-2`}
                ></View>
                <View className="flex-row justify-between items-center px-12">
                  {modalData.sleep && (
                    <>
                      <View className="w-full justify-center items-center">
                        <Text>
                          Sleep : {modalData.sleep ? modalData.sleep : "0"}h
                        </Text>
                      </View>
                    </>
                  )}

                  <>
                    <View className="w-full justify-center items-center flex-row">
                      <Text>Water :</Text>
                      {modalData.water ? (
                        <Check color={"green"} />
                      ) : (
                        <X color={"red"} />
                      )}
                    </View>
                  </>
                </View>
                <View
                  className={`w-[100%] bg-gray-300 h-[1px] separator my-2`}
                ></View>
                {modalData.breakfastImg &&
                  modalData.breakfastImg !== "jeun" && (
                    <>
                      <Text>Breakfast</Text>
                      <View
                        className={`w-[90%] bg-gray-300 h-[1px] separator my-2`}
                      ></View>
                      <View className="h-[300px] w-[300px]">
                        <View className="w-full h-full overflow-hidden rounded-2xl">
                          <Image
                            source={modalData.breakfastImg}
                            style={{
                              width: "100%",
                              aspectRatio: 1,
                              borderRadius: 10,
                              marginTop: 6,
                              marginBottom: 2,
                            }}
                          ></Image>
                        </View>
                      </View>
                      {modalData.breakfastDesc ? (
                        <Text className="py-2">{modalData.breakfastDesc}</Text>
                      ) : (
                        <Text>No Description</Text>
                      )}
                      <View
                        className={`w-[100%] bg-gray-300 h-[1px] separator my-2`}
                      ></View>
                    </>
                  )}
                {modalData.lunchImg && modalData.lunchImg !== "jeun" && (
                  <>
                    <Text>Lunch</Text>
                    <View
                      className={`w-[90%] bg-gray-300 h-[1px] separator my-2`}
                    ></View>
                    <View className="h-[300px] w-[300px]">
                      <View className="w-full h-full overflow-hidden rounded-2xl">
                        <Image
                          source={modalData.lunchImg}
                          style={{
                            width: "100%",
                            aspectRatio: 1,
                            borderRadius: 10,
                            marginTop: 2,
                            marginBottom: 2,
                          }}
                        ></Image>
                      </View>
                    </View>
                    {modalData.lunchDesc ? (
                      <Text className="py-2">{modalData.lunchDesc}</Text>
                    ) : (
                      <Text>No Description</Text>
                    )}
                    <View
                      className={`w-[100%] bg-gray-300 h-[1px] separator my-2`}
                    ></View>
                  </>
                )}
                {modalData.dinnerImg && modalData.dinnerImg !== "jeun" && (
                  <>
                    <Text>Dinner</Text>
                    <View className="h-[300px] w-[300px]">
                      <View className="w-full h-full overflow-hidden rounded-2xl">
                        <Image
                          source={modalData.dinnerImg}
                          style={{
                            width: "100%",
                            aspectRatio: 1,
                            borderRadius: 10,
                            marginTop: 2,
                            marginBottom: 2,
                          }}
                        ></Image>
                      </View>
                    </View>
                    {modalData.dinnerDesc ? (
                      <Text className="py-2">{modalData.dinnerDesc}</Text>
                    ) : (
                      <Text>No Description</Text>
                    )}
                    <View
                      className={`w-[100%] bg-gray-300 h-[1px] separator my-2`}
                    ></View>
                  </>
                )}
                {modalData.extras.length > 0 && (
                  <>
                    <Text>Extras</Text>
                    {modalData.extras.map((data: any, i: number) => {
                      return (
                        <>
                          <View key={i} className="h-[300px] w-[300px]">
                            <View className="w-full h-full overflow-hidden rounded-2xl">
                              <Image
                                source={data.extraImg}
                                style={{
                                  width: "100%",
                                  aspectRatio: 1,
                                  borderRadius: 10,
                                  marginTop: 2,
                                  marginBottom: 2,
                                }}
                              ></Image>
                            </View>
                          </View>

                          <Text className="py-2">{data.extraDesc}</Text>

                          <View
                            className={`w-[100%] bg-gray-300 h-[1px] separator my-2`}
                          ></View>
                        </>
                      );
                    })}
                  </>
                )}
                <Pressable
                  className="w-[50%] h-8 bg-white rounded-md justify-center items-center mb-6"
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
                  onPress={() => closeModal()}
                >
                  <Text>Close</Text>
                </Pressable>
              </ScrollView>
            </TouchableWithoutFeedback>
          </Animated.View>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centralText: {
    color: "white",
  },
  title: {
    backgroundColor: "white",
    width: "100%",
    height: "10%",
  },
});
