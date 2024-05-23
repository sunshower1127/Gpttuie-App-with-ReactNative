import WebView from "react-native-webview";
import { Recipe } from "./recipes";
import { saveRecipes } from "../../components/saveRecipe";

export default function Home() {
  const handleMessage = (event) => {
    const { name, data }: { name: string; data: Recipe } = JSON.parse(
      event.nativeEvent.data
    );
    if (name !== "Recipe") return;
    console.log("Downloaded Recipe : ", data);
    // saveRecipes([data]);
    alert("레시피 저장 완료");
  };
  return (
    <WebView
      source={{
        uri: "https://gpttuie.web.app/",
        headers: { "Cache-Control": "no-cache" },
      }}
      onMessage={handleMessage}
    />
  );
}
