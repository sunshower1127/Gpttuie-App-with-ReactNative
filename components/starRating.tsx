import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal, PaperProvider, Portal, Text } from "react-native-paper";
import StarRating from "react-native-star-rating-widget";

// 레시피 프로세스 마지막 단계에서 레시피 평점을 입력받는 모달
const RatingModal = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  };

  // 평점 저장함수
  const [rating, setRating] = useState(0);

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[styles.modal, containerStyle]}
        >
          <Text style={{ marginBottom: 10, fontSize: 18 }}>
            평점을 입력해 주세요
          </Text>
          <StarRating rating={rating} onChange={setRating} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
            }}
          >
            <Button
              mode="contained"
              icon="book"
              style={styles.button}
              onPress={showModal}
            >
              레시피 저장
            </Button>
            <Button mode="contained" style={styles.button} onPress={showModal}>
              저장하지 않고 닫기
            </Button>
          </View>
        </Modal>
      </Portal>
      <Button
        mode="contained"
        icon="check"
        buttonColor="purple"
        onPress={showModal}
        style={styles.check}
      >
        완료
      </Button>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  check: {
    position: "absolute",
    right: 0,
    bottom: -470,
  },
  modal: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 300,
  },
  button: {
    marginTop: 10,
    marginHorizontal: 5,
  },
});

export default RatingModal;
