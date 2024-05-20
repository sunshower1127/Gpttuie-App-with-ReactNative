import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import StackNavigation from "./navigations/stackNavigation";
import theme from "./constants/theme";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <StackNavigation />
    </PaperProvider>
  );
}
