import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import Logo from "../../components/logo";
import { MyNavigation } from "../../models/stackNav";
import TabNavigation from "../../navigations/tapNavigation";

export default function Main() {
  const navigation = useNavigation<MyNavigation>();
  return (
    <>
      <Appbar.Header mode="small" style={styles.appbar} elevated>
        <Appbar.Content title={<Logo />} />
        <Appbar.Action
          icon="information-outline"
          onPress={() => navigation.navigate("컨택트")}
        />
      </Appbar.Header>
      <TabNavigation />
    </>
  );
}
const styles = StyleSheet.create({
  appbar: {
    marginTop: -10,
    paddingTop: 10,
    paddingBottom: 5,
  },
});
