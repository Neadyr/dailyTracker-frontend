import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { blue } from "react-native-reanimated/lib/typescript/Colors";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [preview, setPreview] = useState<string | null>("");
  const cameraRef = useRef<CameraView | null>(null);

  const isFocused = useIsFocused();

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  if (!permission || !isFocused) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    const photo: any = await cameraRef.current?.takePictureAsync({
      quality: 0.3,
    }); // Typescript
    (photo && setPreview(photo.uri)) || "";
  };

  const goBack = () => {
    //Closing modal
    console.log("Going back");
  };
  const renderPicture = () => {
    const retakePicture = () => {
      setPreview(null);
    };
    return (
      <View>
        <Image
          source={preview}
          contentFit="contain"
          placeholder={{ blurhash }}
          style={{ width: 300, aspectRatio: 1 }}
        ></Image>
        <TouchableOpacity style={styles.retakeButton} onPress={retakePicture}>
          <Text style={styles.retake}>Take another picture</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCameraView = () => {
    return (
      <View className="w-full h-full overflow-hidden rounded-2xl">
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={(ref) => (cameraRef.current = ref)}
        ></CameraView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {preview ? renderPicture() : renderCameraView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    borderRadius: "25px",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "15%",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  imagePreview: {
    width: 1000,
    height: 1000,
  },
  retake: {
    color: "black",
  },
  retakeButton: {
    width: 300,
    height: 150,
    backgroundColor: "green",
  },
  shotButton: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    borderWidth: 5,
    borderColor: "#ffffff",
    opacity: 0.9,
  },
  return: {
    width: 50,
    height: 50,
    backgroundColor: "red",
  },
  topButtonContainer: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: "10%",
  },
});
