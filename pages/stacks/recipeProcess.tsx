import React, { useState } from "react";
import {
  Modal,
  Alert,
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
} from "react-native";
import { IconButton, MD3Colors, List, Icon } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList, RootStackNavigationProp } from '../../navigations/stackNavigation';

type RecipeSelectionRouteProp = RouteProp<RootStackParamList, '레시피 선택'>;  //재료, 종류, 인원 수
type RecipeCreationRouteProp = RouteProp<RootStackParamList, '레시피 생성'>;   // 레시피 이름

const RecipeSelection = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const routeSelection = useRoute<RecipeSelectionRouteProp>();
  const routeCreation = useRoute<RecipeCreationRouteProp>();

  // 레시피 선택 파라미터
  const [servings, setServings] = useState(routeSelection.params?.servingSize);
  const [ingredients, setIngredients] = useState(routeSelection.params?.ingredients);
  const [country, setCountry] = useState(routeSelection.params?.country);
  // 레시피 생성 파라미터
  const [recipeName, setRecipeName] = useState(routeCreation.params?.recipeName);
};
const App = () => {
  const [steps, setSteps] = useState([
    {
      title: "치즈토스트",
      serving: "2인분",
      image: null,
      description: "1. 재료를 준비합니다.",
      timer: null,
    },
    {
      title: "치즈토스트",
      serving: "2인분",
      image: null,
      description: "2. 식빵을 준비해주세요. \n 그리고 밀대로 밀어줍니다.",
      timer: "00:10",
    },
    {
      title: "치즈토스트",
      serving: "2인분",
      image: null,
      description: "3. 밀어 놓은 식빵,체다치즈를 반으로 자르고 \n 올려주세요",
      timer: null,
    },
    {
      title: "치즈토스트",
      serving: "2인분",
      image: null,
      description: "4. 식빵 끝부분에 계란물을 묻혀 줍니다.",
      timer: null,
    },
  ]);
  const [ingredients, setIngredients] = useState([
    { name: "밀가루", amount: "2컵" },
    { name: "설탕", amount: "1컵" },
    { name: "계란", amount: "3개" },
    { name: "버터", amount: "1/2컵" },
  ]);

  const IngredientList = ({ ingredients }) => (
    <List.Section>
      {ingredients.map((ingredient, index) => (
        <List.Item
          key={index}
          title={
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.ingredinet}>{ingredient.name} </Text>
              <Text style={styles.ingredinet}>{ingredient.amount}</Text>
            </View>
          }
          left={(props) => <List.Icon {...props} icon="egg" />}
        />
      ))}
    </List.Section>
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

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

  const handlePickImage = async (index) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
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
      const newSteps = [...steps];
      newSteps[index].image = result.assets[0].uri;
      setSteps(newSteps);
    }
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

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.servingInfo}>{item.serving}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handlePickImage(index)}
        style={styles.imageContainer}
      >
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <IconButton icon="camera" iconColor={MD3Colors.error50} size={30} />
        )}
      </TouchableOpacity>

      <Text style={styles.stepDescription}>{item.description}</Text>
      <View>
        {item.timer ? (
          <TouchableOpacity onPress={() => handleShowTimer(item)}>
            {timerText ? (
              <Text style={styles.timer}>{timerText}</Text>
            ) : (
              <IconButton icon="timer" iconColor={"yellowgreen"} size={60} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
      {index === steps.length - 1 && (
        <View style={{ position: "absolute", right: 20, bottom: 20 }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "요리 완료! ", // 제목
                "레시피를 저장하시겠습니까?", // 메시지
                [
                  // 버튼 배열
                  { text: "아니오", onPress: () => console.log("아니오 선택") },
                  {
                    text: "예",
                    onPress: () => console.log("예 선택"),
                    style: "cancel",
                  },
                ],
                { cancelable: true }
              );
            }}
          >
            <IconButton
              mode="contained"
              icon="check"
              size={30}
              iconColor="purple"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={steps}
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
      {renderDots(steps)}
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
  },
  imageContainer: {
    height: 200,
    backgroundColor: "white",
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
    fontSize: 18,
    fontWeight: "bold",
  },
  stepDescription: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
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
  timer: {
    fontSize: 40,
    fontWeight: "bold",
    color: "yellowgreen",
    marginTop: 16,
    marginLeft: 5,
  },
});

export default App;
