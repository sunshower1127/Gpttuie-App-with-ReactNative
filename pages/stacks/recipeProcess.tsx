import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { IconButton, MD3Colors, AnimatedFAB } from "react-native-paper";
import RatingModal from "../../components/starRating";
import IngredientList from "../../components/IngredientList";
import PageIndicator from "../../components/PageIndicator";
import handlePickImage from "../../components/ImagePicker";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackRouteProp } from "../../models/stackNav";
import { useNavigation } from "@react-navigation/native"; //추가사항
import { MyNavigation } from "../../models/stackNav"; //추가사항

const RecipeProcess = () => {
  //레시피 저장정보 불러오가
  const navigation = useNavigation<MyNavigation>();
  const route = useRoute<RouteProp<StackRouteProp, "레시피_프로세스">>();
  const [recipe, setRecipe] = useState(route.params);
  const title = route.params.title;
  const ingredients = recipe.ingredients || [];
  const servingSize = recipe.servingSize;
  const country = recipe.country;
  const steps = recipe.steps || [];
  const description = steps.map((step) => step.description).join("\n");
  const rating = recipe.rating;
  const oneLineReview = recipe.oneLineReview;

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // Modal 보이는지 여부 설정 함수
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalVisibility = (visible) => {
    setIsModalVisible(visible);
  };

  // 업데이트된 레시피 객체를 처리하는 로직 작성
  const handleRecipeUpdate = (updatedRecipe) => {
    setRecipe(updatedRecipe);
  };

  // Card 안에 들어갈 요소들
  const renderItem = ({ item, index }) => (
    <View style={[styles.card, isModalVisible && styles.cardModalVisible]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
      </View>

      {index != 0 && (
        <TouchableOpacity
          onPress={() => {
            handlePickImage(recipe, index);
          }}
          style={[
            styles.imageContainer,
            isModalVisible && styles.cardModalVisible,
          ]}
        >
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.image} />
          ) : (
            <IconButton icon="camera" iconColor={MD3Colors.error50} size={30} />
          )}
        </TouchableOpacity>
      )}

      {index != 0 && (
        <Text style={styles.stepDescription}>{item.description}</Text>
      )}

      {index === recipe.steps.length - 1 && (
        <View>
          <RatingModal
            onModalVisibilityChange={handleModalVisibility}
            newRecipe={recipe}
            onRecipeUpdate={handleRecipeUpdate}
          />
        </View>
      )}

      {index === 0 && (
        <View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 30,
              color: "darkgreen",
            }}
          >
            재료
          </Text>
          <IngredientList ingredients={recipe.ingredients} />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recipe.steps}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          setCurrentIndex(
            Math.floor(
              event.nativeEvent.contentOffset.x / Dimensions.get("window").width
            )
          );
        }}
      />

      <PageIndicator scrollX={scrollX} pages={recipe.steps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  card: {
    width: Dimensions.get("window").width,
    padding: 16,
    backgroundColor: "white",
    flex: 1,
  },
  imageContainer: {
    height: 200,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginLeft: 5,
  },
  servingInfo: {
    fontSize: 16,
    marginTop: 24,
    marginRight: 5,
  },
  ingredinet: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stepDescription: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
  timerText: {
    position: "absolute",
    margin: 20,
    fontSize: 40,
    fontWeight: "bold",
    color: "yellowgreen",
  },
  timer: {
    position: "absolute",
    margin: 20,
  },
  cardModalVisible: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default RecipeProcess;
