import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { Recipe } from "../models/recipe";

// 이미지 picker 함수
export default async function handlePickImage(
  recipe: Readonly<Recipe>,
  setRecipe: React.Dispatch<React.SetStateAction<Readonly<Recipe>>>,
  index: number
) {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("미디어 라이브러리 권한을 허용해 주세요");
    return;
  }

  const pickImage = async (camera) => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    const result = camera
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);

    if (result.canceled) return;

    const updatedRecipe = {
      ...recipe,
      steps: recipe.steps.map((step, i) => {
        if (i !== index) return step;
        return { ...step, image: result.assets[0].uri };
      }),
    };
    setRecipe(updatedRecipe);
  };

  Alert.alert(
    "이미지 선택",
    "사진을 가져올 방법을 선택해주세요",
    [
      {
        text: "취소",
        style: "cancel",
      },

      {
        text: "카메라",
        onPress: async () => await pickImage(true),
      },
      {
        text: "갤러리",
        onPress: async () => await pickImage(false),
      },
    ],
    { cancelable: true }
  );
}
