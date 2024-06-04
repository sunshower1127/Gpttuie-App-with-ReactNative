import WebView from "react-native-webview";
import { WebViewMessageEvent } from "react-native-webview/lib/WebViewTypes";
import { Recipe } from "../../models/recipe";
import { saveRecipe } from "../../components/saveRecipe";

export default function Search() {
  const handleMessage = (event: WebViewMessageEvent) => {
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
    <>
      <WebView
        source={{
          uri: "https://gpttuie.web.app/recipes",
          headers: { "Cache-Control": "no-cache" },
        }}
        onMessage={handleMessage}
      />
    </>
  );
}
