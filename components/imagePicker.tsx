import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

// 이미지 picker 함수
const handlePickImage = async (recipe, index) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("미디어 라이브러리 권한을 허용해 주세요");
    return;
  }

  Alert.alert(
    "이미지 선택",
    "카메라로 사진을 찍거나 갤러리에서 선택하세요.",
    [
      {
        text: "카메라",
        onPress: async () => await pickImageFromCamera(recipe, index),
      },
      {
        text: "갤러리",
        onPress: async () => await pickImageFromGallery(recipe, index),
      },
    ],
    { cancelable: true }
  );
};

const pickImageFromCamera = async (recipe, index) => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const newSteps = [...recipe.steps];
    newSteps[index].image = result.assets[0].uri;
    return recipe;
  }
};

const pickImageFromGallery = async (recipe, index) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const newSteps = [...recipe.steps];
    newSteps[index].image = result.assets[0].uri;
    return recipe;
  }
};

export default handlePickImage;
