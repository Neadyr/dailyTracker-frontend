import { Text, View, StyleSheet } from "react-native";
import { blue } from "react-native-reanimated/lib/typescript/Colors";

export default function Calendar() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.centralText}>Bienvenue à la capsule !</Text></View>
    </View>
  );
}

 const styles = StyleSheet.create({
  container : {
    backgroundColor : "blue",
    width : "100%",
    height : "100%",
    display: "flex",
    justifyContent : "center",
    alignItems: "center"
  },
  centralText : {
    color : "white"
  }
 })