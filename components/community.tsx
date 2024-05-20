import WebView from "react-native-webview";

// Home, Profile 페이지에서 사용되는 웹뷰 컴포넌트
// https://gpttuie.web.app 에 연결되어 있음.
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
