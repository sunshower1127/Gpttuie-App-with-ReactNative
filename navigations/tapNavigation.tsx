import { useState } from "react";
import Home from "../pages/tabs/home";
import Recipes from "../pages/tabs/recipes";
import Subscribes from "../pages/tabs/subscribes";
import Profile from "../pages/tabs/profile";
import { BottomNavigation } from "react-native-paper";
import CreateRecipeBtn from "../components/createRecipeBtn";
import CreateRecipe from "../pages/tabs/createRecipe";

export default function TabNavigation() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
    },
    {
      key: "subscribes",
      title: "Subs",
      focusedIcon: "heart",
    },
    {
      key: "create",
      title: "Create\nRecipe",
      focusedIcon: CreateRecipeBtn,
    },
    {
      key: "recipes",
      title: "Recipes",
      focusedIcon: "book",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    recipes: Recipes,
    subscribes: Subscribes,
    profile: Profile,
    create: CreateRecipe,
  });

  return (
    <BottomNavigation
      shifting={true}
      labeled={true}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
