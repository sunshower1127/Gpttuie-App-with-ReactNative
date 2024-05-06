import { Image } from "react-native";

export default function Logo() {
  return (
    <Image
      source={require("../assets/logo.png")}
      style={{ width: 40, height: 40, borderRadius: 20, opacity: 0.9 }}
    />
  );
}
