import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  BackHandler,
  Keyboard,
} from "react-native";
import { Image } from "expo-image";

import { SafeAreaView } from "react-native-safe-area-context";
import { blue } from "react-native-reanimated/lib/typescript/Colors";
import { useState, useCallback, useContext, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { Laugh, Meh, Frown, Hourglass } from "lucide-react-native";
import { DataContext } from "../_layout";
import CalendarBubble from "../components/calendarBubble";
import Animated, { withSpring, withTiming } from "react-native-reanimated";

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

  useFocusEffect(
    useCallback(() => {
      fetch("http://192.168.20.77:3000/getAllDays")
        .then((response) => response.json())
        .then((data) => {
          setToday(data.days[0]);
          setAllDays(data.days.reverse().splice(1));
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

  const generateCalendar = (array: any) => {
    let formattedArray: any = [];
    for (let element of array) {
      const currentYear = moment(element.date).year().toString();
      const currentMonth = months[moment(element.date).month()];
      const currentDay = moment(element.date).day().toString();
      let yearBlock = formattedArray.find((current: any) =>
        current.hasOwnProperty(currentYear)
      );
      // console.log("yearblock =>", yearBlock);
      if (yearBlock) {
        let monthBlock = yearBlock[currentYear].find((current: any) =>
          current.hasOwnProperty(currentMonth)
        );
        if (monthBlock) {
          monthBlock[currentMonth].push(currentDay);
        } else {
          yearBlock[currentYear].push({ [currentMonth]: [] });
        }
      } else {
        formattedArray.push({ [currentYear]: [] });
      }
    }

    // console.log("Final Array =>", formattedArray);
    setAllDays(formattedArray);
  };

  const displayDay = async (bubbleData: any) => {
    const sending = await fetch(
      `http://192.168.20.77:3000/getSingleDay/${bubbleData.date}`
    );
    const response = await sending.json();
    console.log(response);
    if (response.result) {
      setModalData(response.today);
      setModalOpen(true);
    }
  };

  const days = allDays?.map((data, i) => {
    return <CalendarBubble key={i} {...data} displayDay={displayDay} />;
  });

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
        <Text>
          {data.streak} day{Number(data.streak) > 1 && "s"} streak
        </Text>
      </View>
      <ScrollView>
        <View className="justify-center items-start w-full h-full  flex-wrap flex-row px-2">
          <View
            className={`wrap w-[12%] h-[70px] bg-blue-200 rounded-md m-1 justify-between items-center py-2`}
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
            <Hourglass />
            <View className="justify-center items-center">
              <Text style={{ fontSize: 8 }}>Today</Text>
            </View>
          </View>
          {days}
        </View>
      </ScrollView>
      {modalOpen && (
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
                  <ScrollView>
                    {modalData.sleep && (
                      <>
                        <View className="w-full justify-center items-center">
                          <Text>{modalData.sleep}h of sleep</Text>
                        </View>
                        <View
                          className={`w-[90%] bg-gray-300 h-[1px] separator mt-2`}
                        ></View>
                      </>
                    )}
                    {modalData.water ? (
                      <>
                        <View className="w-full justify-center items-center">
                          <Text>Enough water has been drunk !</Text>
                        </View>
                        <View
                          className={`w-[90%] bg-gray-300 h-[1px] separator mt-2`}
                        ></View>
                      </>
                    ) : (
                      <>
                        <View className="w-full justify-center items-center">
                          <Text>Drink MOAR</Text>
                        </View>
                        <View
                          className={`w-[90%] bg-gray-300 h-[1px] separator mt-2`}
                        ></View>
                      </>
                    )}
                    {modalData.breakfastImg &&
                      modalData.breakfastImg !== "jeun" && (
                        <>
                          <Text>Breakfast</Text>{" "}
                          <View
                            className={`w-[90%] bg-gray-300 h-[1px] separator mt-2`}
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
                            <Text className="py-2">
                              {modalData.breakfastDesc}
                            </Text>
                          ) : (
                            <Text>No Description</Text>
                          )}
                          <View
                            className={`w-[90%] bg-gray-300 h-[1px] separator mt-2`}
                          ></View>
                        </>
                      )}
                    <Text>Lunch</Text>{" "}
                    {modalData.lunchImg && modalData.lunchImg !== "jeun" ? (
                      <>
                        <View
                          className={`w-[90%] bg-gray-300 h-[1px] separator mt-2`}
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
                          className={`w-[90%] bg-gray-300 h-[1px] separator mt-2`}
                        ></View>
                      </>
                    ) : (
                      <Text>No data yet</Text>
                    )}
                    {modalData.dinnerImg && modalData.dinnerImg !== "jeun" && (
                      <>
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
                          className={`w-[90%] bg-gray-300 h-[1px] separator mt-2`}
                        ></View>
                      </>
                    )}
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </Pressable>
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
