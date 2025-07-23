import { View, Text } from "react-native";

import DailyComponent from "./DailyComponent";

export default function MonthComponent(props: any) {
  const daysData = props.data.map((innerData: any, i: number) => {
    return (
      <View className="w-full " key={i}>
        <Text className="text-2xl font-semibold">
          {Object.keys(innerData)[0]}
        </Text>
        <DailyComponent
          data={innerData[Object.keys(innerData)[0]]}
          displayDay={props.displayDay}
        />
      </View>
    );
  });

  return <View>{daysData}</View>;
}
