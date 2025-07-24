import { View, Text } from "react-native";
import { Laugh, Meh, Frown, Hourglass, Gift } from "lucide-react-native";
import { Pressable } from "react-native-gesture-handler";
export default function CalendarBubble(props: any) {
  let icon;
  let backgroundColor;
  if (props.balance === "good") {
    icon = <Laugh />;
    backgroundColor = "bg-[#c7f7e4]";
  } else if (props.balance === "neutral") {
    backgroundColor = "bg-[#e0e0e0]";
    icon = <Meh />;
  } else {
    backgroundColor = "bg-[#fccfcf]";
    icon = <Frown />;
  }
  const today = new Date();
  const match =
    today.getUTCFullYear() === new Date(props.date).getUTCFullYear() &&
    today.getMonth() === new Date(props.date).getMonth() &&
    today.getDay() === new Date(props.date).getDay();

  if (match) {
    backgroundColor = "bg-[#77d7f9]";
    icon = <Hourglass />;
  }
  if (props.hasGift) {
    icon = <Gift />;
  }
  return (
    <Pressable
      style={{ height: 70, width: "12%", margin: 3 }}
      onPress={() => {
        props.displayDay(props);
      }}
    >
      <View
        className={`wrap w-[100%] h-[100%] ${backgroundColor} rounded-md justify-between items-center py-2`}
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
        <Text>{icon}</Text>
        <View className="justify-center items-center">
          {!match ? (
            <>
              <Text className="font-medium text-xs">
                {props.date.slice(5, 10)}
              </Text>
              <Text style={{ fontSize: 8 }}>{props.date.slice(0, 4)}</Text>
            </>
          ) : (
            <>
              <Text className="font-medium text-xs">Today</Text>
              <View className="w-full h-2"></View>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
}
