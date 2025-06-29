import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { Pressable } from "react-native-gesture-handler";
export default function DropDown(props: { data: string[] | null }) {
  const { data } = props;

  const [hasBeenPressed, setHasBeenPressed] = useState<boolean>(false);
  const [pickedExercice, setPickedExercice] = useState<string>("");

  const pickExercice = (data: string) => {
    setPickedExercice(data);
    setHasBeenPressed(!hasBeenPressed);
  };
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
    <View className="w-[100%] h-[90%]">
      <Pressable
        style={{
          width: "90%",
          height: 30,
          backgroundColor: "red",
          borderRadius: 5,
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
        onPress={() => setHasBeenPressed(!hasBeenPressed)}
      >
        <Text>{pickedExercice || "Pick an exercice"}</Text>
      </Pressable>
      {hasBeenPressed && (
        <ScrollView
          className="absolute h-32 w-[90%] top-[30px] left-0 bg-gray-200 p-2"
          showsVerticalScrollIndicator={false}
        >
          {dropDown}
        </ScrollView>
      )}
    </View>
  );
}
