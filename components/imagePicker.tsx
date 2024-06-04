import * as ImagePicker from "expo-image-picker";

//이미지 picker 함수
const handlePickImage = async (recipe, index) => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    alert("카메라 권한을 허용해 주세요");
    return;
  }

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

export default handlePickImage;
