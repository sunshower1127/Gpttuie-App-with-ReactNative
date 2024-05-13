import WebView from "react-native-webview";

export default function Home() {
  return (
    <WebView
      source={{
        uri: "https://gpttuie.web.app/",
        headers: { "Cache-Control": "no-cache" },
      }}
    />
  );
}
