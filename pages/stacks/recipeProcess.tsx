import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Animated, Dimensions, StatusBar } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const App = () => {
  const [steps, setSteps] = useState([
    { title: "치즈토스트", serving: "2인분", image: null, description: "1. 재료 준비", timer: null },
    { title: "치즈토스트", serving: "2인분", image: null, description: "2. 식빵을 준비해주세요. 그리고 밀대로 밀어줍니다.", timer: null },
    { title: "치즈토스트", serving: "2인분", image: null, description: "3. 밀어 놓은 식빵,체다치즈를 반으로 자르고 올려주세요", timer: "5분" },
    { title: "치즈토스트", serving: "2인분", image: null, description: "4. 식빵 끝부분에 계란물을 묻혀 줍니다.", timer: null },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const renderDots = (pages) => {
    const dotPosition = Animated.divide(scrollX, Dimensions.get("window").width);
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

  const handleShowTimer = () => {};

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.servingInfo}>{item.serving}</Text>
      </View>
      <TouchableOpacity onPress={() => handlePickImage(index)} style={styles.imageContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <IconButton icon="camera" iconColor={MD3Colors.error50} size={30} />
        )}
      </TouchableOpacity>

      <Text style={styles.stepsTitle}>{item.description}</Text>
      <View style={styles.stepsTitle}>
        {item.timer ? (
          <TouchableOpacity onPress={handleShowTimer}>
            <Text>{item.timer}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
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
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        onMomentumScrollEnd={(event) => {
          setCurrentIndex(Math.floor(event.nativeEvent.contentOffset.x / Dimensions.get("window").width));
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
  cameraText: {
    fontSize: 16,
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
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  stepsTitle: {
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
});

export default App;
