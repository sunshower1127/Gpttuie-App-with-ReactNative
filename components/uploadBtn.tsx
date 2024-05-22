import React, { useRef, useState } from "react";
import { Button, Modal } from "react-native-paper";
import WebView from "react-native-webview";
import { Recipe } from "../models/recipe";

export default function uploadBtn(recipe: Recipe) {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const webRef = useRef<WebView>();
  const handleLoad = () => {
    webRef.current.postMessage(
      JSON.stringify({ name: "Recipe", data: recipe })
    );
  };
  return (
    <>
      <Button mode="contained" onPress={showModal}>
        Share
      </Button>
      <Modal visible={visible} onDismiss={hideModal}>
        <WebView
          source={{
            uri: "https://gpttuie.web.app/create-post",
            headers: { "Cache-Control": "no-cache" },
          }}
          onLoad={handleLoad}
          ref={webRef}
        />
      </Modal>
    </>
  );
}
