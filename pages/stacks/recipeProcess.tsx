import React, { useState } from "react";
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
import * as ImagePicker from "expo-image-picker";

const App = () => {
  const [steps, setSteps] = useState([
    { image: null, description: "1. 재료 준비", timer: null },
    { image: null, description: "2. ", timer: null },
    { image: null, description: "3. ", timer: null },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const renderDots = (steps) => {
    const dotPosition = Animated.divide(
      scrollX,
      Dimensions.get("window").width
    );
    const dotsArray = Array(steps.length).fill(0);

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

  const handlePickImage = async () => {
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
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={handlePickImage} style={styles.imageContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <Text style={styles.cameraText}>Touch to take a photo</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.recipeTitle}>{item.description}</Text>
      <Text style={styles.servingInfo}>Serving</Text>
      <Text style={styles.ingredientsTitle}>요리 재료</Text>
      <Text style={styles.stepsTitle}>
        {item.timer ? `타이머: ${item.timer}` : "타이머 없음"}
      </Text>
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
    backgroundColor: "lightgray",
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
  },
  servingInfo: {
    fontSize: 16,
    marginTop: 8,
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
