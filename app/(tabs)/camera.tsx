import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Image} from "expo-image"
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [preview, setPreview] = useState<string | null>("")
  const cameraRef = useRef<CameraView | null>(null);

  const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }


  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

    const takePicture = async () => {    
        console.log("coucou")             
    const photo: any = await cameraRef.current?.takePictureAsync({ quality: 0.3 }); // Javascript
    // const photo: any = await cameraRef.current?.takePictureAsync({ quality: 0.3 }); // Typescript
    photo && setPreview(photo.uri) || "";         
  };

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
console.log(preview)

  const renderPicture = () => {
    console.log("PICTOUUURE");
    const retakePicture = () => {
        setPreview(null)
    }
    return (
        <View>
            <Image 
                source={preview}
                contentFit='contain'
                placeholder={{ blurhash }}
                style={{ width: 300, aspectRatio: 1 }}>
            </Image>
            <TouchableOpacity style={styles.retakeButton} onPress={retakePicture}><Text style={styles.retake}>Take another picture</Text></TouchableOpacity>
        </View>
    )
  }

  const renderCameraView = () => {
    console.log("CAMIRAVIOU");

    return (
        <CameraView style={styles.camera} facing={facing} ref={(ref) => (cameraRef.current = ref)}>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.text} onPress={takePicture}>Take Picture</Text>
            </TouchableOpacity>
            </View>
        </CameraView>
    );
  }


  return (
    <View style={styles.container}>
        {preview ? renderPicture() : renderCameraView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  imagePreview : {
    width: 1000,
    height: 1000
  },
  retake: {
    color: "black"
  },
  retakeButton: {
    width: 300,
    height: 150,
    backgroundColor: "green"
  }
});
