import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Main from "../pages/stacks/main";
import RecipeSelection from "../pages/stacks/recipeSelection";
import RecipeProcess from "../pages/stacks/recipeProcess";
import Notifications from "../pages/stacks/notifications";
import Search from "../pages/stacks/search";
import RecipeMaking from "../pages/stacks/recipeMaking";

export type RootStackParamList = {
  메인: undefined;
  알림: undefined;
  검색: undefined;
  "레시피 선택": undefined;
  "레시피 프로세스": undefined;
  "레시피 생성": undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="메인"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="알림" component={Notifications} />
        <Stack.Screen name="검색" component={Search} />
        <Stack.Screen name="레시피 선택" component={RecipeSelection} />
        <Stack.Screen name="레시피 프로세스" component={RecipeProcess} />
        <Stack.Screen name="레시피 생성" component={RecipeMaking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
