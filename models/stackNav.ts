// 스택 네비게이션에 사용할 타입들을 정의한 파일입니다.

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Recipe } from "./recipe";

// 스택 창 띄울때 주고 받을 파라미터들을 정의합니다.
// 왠만하면 Recipe 객체로 통일

// 페이지에서 인자 받는 법
/*
const route = useRoute<RouteProp<StackRouteProp, "레시피_선택">>();
const myRecipe = route.params;
if (!recipe) return;
*/
export type StackRouteProp = {
  메인: undefined;
  알림: undefined;
  // 띄어쓰기 대신 언더하이픈 추가함
  레시피_선택: Recipe;
  레시피_생성: Recipe;
  레시피_프로세스: Recipe;
  게시물_작성: Recipe;
};

// 페이지 이동 하면서 인자 주는법
/*
const navigation = useNavigation<MyNavigation>();
navigation.push("레시피_선택", myRecipe);
*/
export type MyNavigation = NativeStackNavigationProp<StackRouteProp>;
