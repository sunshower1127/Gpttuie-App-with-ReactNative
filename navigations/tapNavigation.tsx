import { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import CreateRecipeBtn from "../components/createRecipeBtn";
import Home from "../pages/tabs/home";
import Profile from "../pages/tabs/profile";
import RecipeSetting from "../pages/tabs/recipeSetting";
import Recipes from "../pages/tabs/recipes";
import Search from "../pages/tabs/search";

// 하단 탭 내비게이션
export default function TabNavigation() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
    },
    {
      key: "search",
      title: "Search",
      focusedIcon: "magnify",
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
    recipes: () => <Recipes key={index} />,
    search: Search,
    profile: Profile,
    create: RecipeSetting,
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
