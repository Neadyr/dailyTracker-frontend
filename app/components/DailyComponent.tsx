import { View } from "react-native";
import CalendarBubble from "./calendarBubble";

export default function dailyComponent(props: any) {
  const daysData = props.data.map((innerData: any, i: number) => {
    const pattern = new RegExp(/gift/i);

    console.log(innerData.extras);

    return (
      <CalendarBubble
        key={i}
        first={i === 0}
        date={innerData.date}
        balance={innerData.balance}
        displayDay={props.displayDay}
        hasGift={innerData.extras.some((e: any) => pattern.test(e.extraDesc))}
      />
    );
  });

  return <View className="w-full flex-wrap flex-row">{daysData}</View>;
}
