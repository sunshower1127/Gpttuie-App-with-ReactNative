import WebView from "react-native-webview";

export default function Community({ nav }: { nav: string }) {
  const handleMessage = (event: any) => {
    console.log(event.nativeEvent.data);
  };
  return (
    <WebView
      source={{
        uri: `https://gpttuie.web.app${nav}`,
        headers: { "Cache-Control": "no-cache" },
      }}
      onMessage={handleMessage}
    />
  );
}
