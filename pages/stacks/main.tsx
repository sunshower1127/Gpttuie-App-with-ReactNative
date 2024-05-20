import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import Logo from "../../components/logo";
import { StackNavigation } from "../../models/stackNav";
import TabNavigation from "../../navigations/tapNavigation";

export default function Main() {
  const navigation = useNavigation<StackNavigation>();
  return (
    <>
      <Appbar.Header mode="small" style={styles.appbar} elevated>
        <Appbar.Content title={<Logo />} />
        <Appbar.Action
          icon="bell"
          onPress={() => navigation.navigate("알림")}
        />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate("검색")}
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
