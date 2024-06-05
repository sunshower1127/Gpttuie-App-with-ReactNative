import { Image } from "react-native";

// GPTTUIE 로고 이미지 컴포넌트
export default function Logo() {
  return (
    <Image
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/gpttuie.appspot.com/o/assets%2Flogo.png?alt=media&token=14b897aa-ce89-46c5-9621-8246ddfd7399",
      }}
      style={{ width: 40, height: 40, borderRadius: 20, opacity: 0.9 }}
    />
  );
}
