import { Image, StyleSheet } from "react-native";

export default function Logo() {
  return <Image source={require("../assets/logo.png")} style={styles.logo} />;
}

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 0.9,
  },
});
