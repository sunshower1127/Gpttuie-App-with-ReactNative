import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import { StackRouteProp } from "../models/stackNav";
import Contact from "../pages/stacks/contact";
import CreatePost from "../pages/stacks/createPost";
import Main from "../pages/stacks/main";
import RecipeCreation from "../pages/stacks/recipeCreation";
import RecipeProcess from "../pages/stacks/recipeProcess";
import RecipeSelection from "../pages/stacks/recipeSelection";

const Stack = createNativeStackNavigator<StackRouteProp>();

// 스택 내비게이션
// 스택 내비게이션에 관련된 모델을 보려면
// models/stackNav.tsx 파일을 확인하세요.
export default function StackNavigation() {
  const theme = useTheme();
  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.surface,
          text: "black",
          border: "black",
          notification: "black",
        },
        dark: false,
      }}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="메인"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="컨택트" component={Contact} />
        <Stack.Screen
          name="레시피_선택"
          component={RecipeSelection}
          options={{
            headerShown: true,
            headerTitle: "레시피를 선택해주세요",
          }}
        />
        <Stack.Screen
          name="레시피_생성"
          component={RecipeCreation}
          options={{
            headerShown: true,
            headerTitle: "레시피 생성 완료!",
          }}
        />
        <Stack.Screen
          name="레시피_프로세스"
          component={RecipeProcess}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="게시물_작성"
          component={CreatePost}
          options={{
            headerShown: true,
            headerTitle: "게시물 작성하기",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
