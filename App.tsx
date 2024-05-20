import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import theme from "./constants/theme";
import StackNavigation from "./navigations/stackNavigation";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <StackNavigation />
    </PaperProvider>
  );
}
