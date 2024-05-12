import WebView from "react-native-webview";

export default function Subscribes() {
  return (
    <WebView
      source={{
        uri: "https://gpttuie.web.app/create-post",
        headers: { "Cache-Control": "no-cache" },
      }}
    />
  );
}
