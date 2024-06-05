import WebView, { WebViewMessageEvent } from "react-native-webview";
import { Recipe } from "../models/recipe";
import { saveRecipe } from "./saveRecipe";
import { Share } from "react-native";

export default function DownloadableWebView({ path }: { path?: string }) {
  const handleMessage = async (event: WebViewMessageEvent) => {
    console.log(event.nativeEvent.data);
    if (event.nativeEvent.data.startsWith("Share")) {
      const url = event.nativeEvent.data.slice(5).trim();
      console.log("Shared Recipe URL: ", url);
      await Share.share({
        url,
        title: "Gpttuie에서 지금 레시피를 확인해보세요!",
        message: url,
      });
      console.log("Done.");
      return;
    }

    const { name, data }: { name: string; data: Recipe } = JSON.parse(
      event.nativeEvent.data
    );
    if (name !== "Recipe") return;
    const recipe = data;
    console.log("Downloaded Recipe : ", recipe);
    saveRecipe({ ...recipe, id: Date.now().toString() });
    alert("레시피 저장 완료");
  };
  return (
    <WebView
      source={{
        uri: "https://gpttuie.web.app/" + (path ? path : ""),
        headers: { "Cache-Control": "no-cache" },
      }}
      onMessage={handleMessage}
    />
  );
}
