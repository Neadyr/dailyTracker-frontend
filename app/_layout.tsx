import { Stack } from "expo-router";
import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { createContext, useState } from "react";

type dataContextType = {
  data: { streak: string; lastFail: string };
  setData: any;
};
export const DataContext = createContext<dataContextType>({
  data: { streak: "", lastFail: "" },
  setData: (): void => {},
});

export default function RootLayout() {
  const [data, setData] = useState<any>(null);

  return (
    <GestureHandlerRootView>
      <DataContext.Provider value={{ data, setData }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </DataContext.Provider>
    </GestureHandlerRootView>
  );
}
