import WebView from "react-native-webview";

export default function Profile() {
  return (
    <WebView
      source={{
        uri: "https://gpttuie.web.app/profile",
        headers: { "Cache-Control": "no-cache" },
      }}
    />
  );
}
