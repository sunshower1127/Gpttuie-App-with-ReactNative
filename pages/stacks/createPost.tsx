import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useRef } from "react";
import WebView from "react-native-webview";
import { MyNavigation, StackRouteProp } from "../../models/stackNav";

export default function CreatePost() {
  const webRef = useRef<WebView>();
  const navigation = useNavigation<MyNavigation>();
  const route = useRoute<RouteProp<StackRouteProp, "게시물_작성">>();
  const recipe = route.params;

  const handleMessage = (event: any) => {
    if (event.nativeEvent.data === "submit") {
      console.log("Submit Btn Clicked");
      webRef.current.postMessage(
        JSON.stringify({ name: "Recipe", data: recipe })
      );
      console.log("Recipe Data Sent");
    } else if (event.nativeEvent.data === "posted") {
      console.log("Post Success");
      navigation.pop(-1);
    }
  };
  return (
    <>
      <WebView
        source={{
          uri: "https://gpttuie.web.app/create-post",
          headers: { "Cache-Control": "no-cache" },
        }}
        onMessage={handleMessage}
        ref={webRef}
      />
    </>
  );
}
