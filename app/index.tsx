import { Text, View, StyleSheet} from "react-native";
import { blue } from "react-native-reanimated/lib/typescript/Colors";
import { Link } from 'expo-router';
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.centralText}>Bienvenue à la capsule !</Text>
        </View>
        <Link href="/about" style={styles.button}>
        Go to About screen
      </Link>
    </View>
  );
}

 const styles = StyleSheet.create({
  container : {
    backgroundColor : "blue",
    display: "flex",
    justifyContent : "center",
    alignItems: "center"
  },
  centralText : {
    color : "white"
  },
  button : {
    width : 150,
    height: 30,
    backgroundColor : "red"
  }
 })