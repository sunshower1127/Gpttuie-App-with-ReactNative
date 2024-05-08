import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Animated, // 추가: 애니메이션을 위해 Animated import
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const RecipeStep = () => {
  const [steps, setSteps] = useState([{ image: null, description: "" }]);
  const scrollX = new Animated.Value(0); // 추가: 페이지 스크롤 위치를 추적하기 위한 Animated.Value

  const pickImage = async () => {
    // 권한 요청 수정
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newSteps = [...steps];
    }
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, 300); // 수정: 페이지 너비로 scrollX를 나눔 (300은 카드 너비)

    return (
      <View style={styles.dotContainer}>
        {steps.map((_, i) => {
          // Animated.View 및 interpolate를 사용하여 동적 스타일링
          const opacity = dotPosition.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3], // 현재 페이지의 점은 불투명
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={[styles.dot, { opacity }]} // 수정: 동적으로 opacity 적용
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {step.image ? (
              <Image source={{ uri: step.image }} style={styles.image} />
            ) : (
              <Text style={styles.cameraText}>Touch to take a photo</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.recipeTitle}>요리 이름</Text>
          <Text style={styles.servingInfo}>Serving</Text>
          <Text style={styles.ingredientsTitle}>요리 재료</Text>
          <Text style={styles.stepsTitle}>요리 단계</Text>
        </View>
      ))}
      {renderDots()}
      <TextInput
        style={[styles.input, { marginTop: 50, maxHeight: 120 }]}
        placeholder="요리 단계 입력"
        multiline
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    marginTop: 20,
    height: 600,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: 300,
    height: 200,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  cameraText: {
    fontSize: 16,
    color: "#999",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: 300,
  },
  dotContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#333",
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  servingInfo: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default RecipeStep;
