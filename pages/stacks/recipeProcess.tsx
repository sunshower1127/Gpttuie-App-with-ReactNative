import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import RecipeCard1 from "../../components/SimpleRecipeCard";

const RecipeSteps = ({ steps = [] }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const renderDots = () => {
    return steps.map((_, index) => (
      <View
        key={index}
        style={index === currentPage ? styles.activeDot : styles.dot}
      >
        ⬤
      </View>
    ));
  };

  return (
    <View>
      <PagerView
        useNext={true}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {steps.map((step, index) => (
          <View key={index} style={styles.page}>
            <RecipeCard1 />
          </View>
        ))}
      </PagerView>
      <View style={styles.dotContainer}>{renderDots()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  dot: {
    margin: 3,
    color: "gray",
  },
  activeDot: {
    margin: 3,
    color: "black",
  },
});

export default RecipeSteps;
