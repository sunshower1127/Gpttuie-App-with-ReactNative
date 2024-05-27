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
  Vibration,
  ScrollView,
  Alert,
} from "react-native";
import { IconButton, MD3Colors, List, FAB } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import RatingModal from "../../components/starRating";
import { Step, Recipe } from "../../models/recipe";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackRouteProp } from "../../models/stackNav";
import { useNavigation } from "@react-navigation/native"; //추가사항
import { MyNavigation } from "../../models/stackNav"; //추가사항
import theme from "../../constants/theme";

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

  // 재료 리스트
  const IngredientList = ({ ingredients }) => (
    <List.Section>
      {ingredients.map((ingredient, index) => (
        <List.Item
          key={index}
          title={
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.ingredinet}>{ingredient}</Text>
            </View>
          }
          description="한 모"
          left={(props) => <List.Icon {...props} icon="egg" />}
        />
      ))}
    </List.Section>
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // 페이지 표시기
  const renderDots = (pages) => {
    const dotPosition = Animated.divide(
      scrollX,
      Dimensions.get("window").width
    );
    const dotsArray = Array(pages.length).fill(0);

    return (
      <View style={styles.dotContainerHorizontal}>
        {dotsArray.map((_, i) => {
          const opacity = dotPosition.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return <Animated.View key={i} style={[styles.dot, { opacity }]} />;
        })}
      </View>
    );
  };

  //이미지 picker 함수
  const handlePickImage = async (index) => {
    Alert.alert(
      "이미지 선택",
      "카메라로 사진을 찍거나, 갤러리에서 사진을 선택하세요.",
      [
        {
          text: "카메라",
          onPress: async () => {
            const { status } =
              await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
              alert("카메라 권한을 허용해 주세요");
              return;
            }

            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              const newSteps = [...recipe.steps];
              newSteps[index].image = result.assets[0].uri;
              setRecipe({ ...recipe, steps: newSteps });
            }
          },
        },
        {
          text: "갤러리",
          onPress: async () => {
            const { status } =
              await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
              alert("갤러리 접근 권한을 허용해 주세요");
              return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              const newSteps = [...recipe.steps];
              newSteps[index].image = result.assets[0].uri;
              setRecipe({ ...recipe, steps: newSteps });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  //타이머 관련 함수
  const [timerText, setTimerText] = useState("");
  const [timerInterval, setTimerInterval] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const handleShowTimer = (item) => {
    if (!timerInterval) {
      const [minutes, seconds] = item.timer.split(":").map(Number);
      const initialTotalSeconds = minutes * 60 + seconds;
      setTotalSeconds(initialTotalSeconds);

      const interval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => {
          if (prevTotalSeconds > 0) {
            const remainingMinutes = Math.floor(prevTotalSeconds / 60);
            const remainingSeconds = prevTotalSeconds % 60;
            const formattedTime = `${remainingMinutes
              .toString()
              .padStart(2, "0")}:${remainingSeconds
              .toString()
              .padStart(2, "0")}`;
            setTimerText(formattedTime);
            return prevTotalSeconds - 1;
          } else {
            clearInterval(interval);
            setTimerInterval(null);
            Vibration.vibrate();
            setTimerText("");
            return 0;
          }
        });
      }, 1000);

      setTimerInterval(interval);
    } else {
      clearInterval(timerInterval);
      setTimerInterval(null);
      setTimerText("");
      setTotalSeconds(0);
    }
  };

  // Modal 보이는지 여부 설정 함수
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalVisibility = (visible) => {
    setIsModalVisible(visible);
  };

  // 업데이트된 레시피 객체를 처리하는 로직 작성
  const handleRecipeUpdate = (updatedRecipe) => {
    console.log("Updated recipe:", updatedRecipe);
    setRecipe(updatedRecipe);
  };

  // Card 안에 들어갈 요소들
  const renderItem = ({ item, index }) => (
    <View style={[styles.card, isModalVisible && styles.cardModalVisible]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {<Text style={styles.recipeTitle}>{recipe.title}</Text>}
        {item && <Text style={styles.servingInfo}>{item.serving}</Text>}
      </View>

      {index !== 0 && (
        <TouchableOpacity
          onPress={() => handlePickImage(index - 1)}
          style={[
            styles.imageContainer,
            isModalVisible && styles.cardModalVisible,
          ]}
        >
          {item && item.image ? (
            <Image source={{ uri: item.image }} style={styles.image} />
          ) : (
            <IconButton icon="camera" iconColor={MD3Colors.error50} size={30} />
          )}
        </TouchableOpacity>
      )}

      <View>
        {item && item.timer ? (
          <TouchableOpacity onPress={() => handleShowTimer(item)}>
            {timerText ? (
              <Text style={styles.timerText}>{timerText}</Text>
            ) : (
              <FAB icon="timer" style={styles.timer} size="large" />
            )}
          </TouchableOpacity>
        ) : null}
      </View>

      {index !== 0 && (
        <Text style={styles.stepDescription}>{item.description}</Text>
      )}

      {index === recipe.steps.length && (
        <View>
          <RatingModal
            onModalVisibilityChange={handleModalVisibility}
            newRecipe={recipe}
            onRecipeUpdate={handleRecipeUpdate}
          />
        </View>
      )}

      {index === 0 && <IngredientList ingredients={recipe.ingredients} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[null, ...recipe.steps]}
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
      {renderDots([null, ...recipe.steps])}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme.colors.background,
  },
  card: {
    width: Dimensions.get("window").width,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    height: 200,
    backgroundColor: theme.colors.onSecondary,
    justifyContent: "center",
    alignItems: "center",
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
  dotContainerHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "gray",
    marginHorizontal: 4,
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
