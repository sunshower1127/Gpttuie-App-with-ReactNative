import React, { useState } from "react";
import { Button, Modal } from "react-native-paper";
import Community from "./community"; // Community 컴포넌트를 임포트합니다.

export default function uploadBtn() {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <Button mode="contained" onPress={showModal}>
        Share
      </Button>
      <Modal visible={visible} onDismiss={hideModal}>
        <Community nav="/upload" />
      </Modal>
    </>
  );
}
