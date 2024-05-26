import React, { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MyNavigation, StackRouteProp } from "../models/stackNav";
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
import { Recipe } from "../models/recipe";
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
  const [text, setText] = useState("");

  // 평점 저장함수
  const [rating, setRating] = useState(0);

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
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modal,
            {
              backgroundColor: "white",
              padding: 20,
              margin: 20,
              borderRadius: 10,
            },
          ]}
        >
          <Text style={{ marginBottom: 10, fontSize: 18 }}>
            평점을 입력해 주세요
          </Text>
          <StarRating rating={rating} onChange={setRating} />

          <TextInput
            label="한줄평"
            value={text}
            onChangeText={setText}
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
              mode="contained"
              icon="book"
              style={styles.button}
              onPress={() => {
                const updatedRecipe = updateRecipe(text, rating);
                onRecipeUpdate(updatedRecipe);
                navigation.push("메인"), saveRecipe(updatedRecipe);
              }}
            >
              레시피 저장
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => navigation.push("메인")}
            >
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
    bottom: -350,
  },
  modal: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 300,
  },
  button: {
    marginTop: 30,
    marginHorizontal: 5,
  },
});

export default RatingModal;
