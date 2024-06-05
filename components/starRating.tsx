import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Modal,
  PaperProvider,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import StarRating from "react-native-star-rating-widget";
import theme from "../constants/theme";
import { Recipe } from "../models/recipe";
import { MyNavigation } from "../models/stackNav";
import { saveRecipe } from "./saveRecipe";

type RatingModalProps = {
  onModalVisibilityChange: (visibility: boolean) => void;
  newRecipe: Recipe;
  onRecipeUpdate: (updatedRecipe: Recipe) => void;
};

const RatingModal = ({
  onModalVisibilityChange,
  newRecipe,
  onRecipeUpdate,
}: RatingModalProps) => {
  const navigation = useNavigation<MyNavigation>();

  const [visible, setVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true);
    onModalVisibilityChange(true); // 모달 visible 상태 전달
  };

  const hideModal = () => {
    setVisible(false);
    onModalVisibilityChange(false); // 모달 visible 상태 전달
  };

  // 한줄평 저장함수
  const [text, setText] = useState(newRecipe.oneLineReview);

  // 평점 저장함수
  const [rating, setRating] = useState(newRecipe.rating);

  //레시피 업데이트 함수
  const updateRecipe = (newText: string, newRating: number) => {
    const updatedRecipe = {
      ...newRecipe,
      oneLineReview: newText,
      rating: newRating,
    };
    return updatedRecipe;
  };

  return (
    <PaperProvider theme={theme}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[styles.modal]}
        >
          <Text style={{ marginBottom: 10, fontSize: 18 }}>
            평점을 입력해 주세요
          </Text>

          <StarRating rating={rating} onChange={setRating} />

          <TextInput
            label="한줄평을 입력해 주세요"
            mode="outlined"
            keyboardType="default"
            value={text}
            onChangeText={setText}
            multiline={true}
            style={{ marginTop: 5, width: "100%" }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 5,
            }}
          >
            <Button
              mode="outlined"
              icon="book"
              style={styles.button}
              onPress={() => {
                const updatedRecipe = updateRecipe(text, rating);
                onRecipeUpdate(updatedRecipe);
                navigation.push("메인"), saveRecipe(updatedRecipe);
              }}
            >
              {newRecipe.rating ? "닫기" : "레시피 저장"}
            </Button>
            {newRecipe.rating ? null : (
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => navigation.push("메인")}
              >
                저장하지 않고 닫기
              </Button>
            )}
          </View>
        </Modal>
      </Portal>
      <Button
        mode="contained"
        icon="check"
        buttonColor={theme.colors.primary}
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
    bottom: -50,
  },
  modal: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 300,
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  button: {
    marginTop: 30,
    marginHorizontal: 5,
  },
});

export default RatingModal;
