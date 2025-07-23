import { View } from "react-native";
import CalendarBubble from "./calendarBubble";

export default function dailyComponent(props: any) {
  const daysData = props.data.map((innerData: any, i: number) => {
    return (
      <CalendarBubble
        key={i}
        first={i === 0}
        date={innerData.date}
        balance={innerData.balance}
        displayDay={props.displayDay}
      />
    );
  });

  return <View className="w-full flex-wrap flex-row">{daysData}</View>;
}
