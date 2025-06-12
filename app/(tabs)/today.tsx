import { Text, View, StyleSheet} from "react-native";
import { Link } from 'expo-router';
import moment from 'moment';


export default function Index() {
  const formattedDate = moment()
  formattedDate.locale("fr")
  
  return (
    <View
      style={styles.container}
    >
      <View style={styles.title}>
        <Text style={styles.titleText}>{formattedDate.format("dddd, MMMM Do YYYY")}</Text>
      </View>
    </View>
  );
}

 const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "#25292e",
    display: "flex",
    justifyContent : "flex-start",
    alignItems: "center",
    paddingTop : 30,
  },
  centralText : {
    color : "white"
  },
  title : {
    width : "100%",
    height: "10%",
    backgroundColor : "#2d3137",
    display : "flex",
    alignItems : "center",
    justifyContent : "center"
  },
  titleText : {
    color : 'white',
    fontSize : 28,
  }
 })