import { Text } from "react-native-paper";
import { Recipe } from "../../models/recipe";
import UploadBtn from "../../components/uploadBtn";

// 구독 게시물 미 구현
export default function Subscribes() {
  const recipe: Recipe = {
    id: Date.now().toString(),
    title: "김치찌개",
    country: "한식",
    servingSize: 2,
    ingredients: ["김치", "두부", "돼지고기", "고춧가루", "대파"],
    steps: [
      {
        description: "김치, 두부, 돼지고기를 썰어주세요",
        image: null,
        timer: null,
      },
      {
        description: "냄비에 김치, 두부, 돼지고기를 넣고 물을 붓고 끓여주세요",
        image: null,
        timer: "05:00",
      },
      {
        description: "끓기 시작하면 고춧가루를 넣고 끓여주세요",
        image: null,
        timer: "03:00",
      },
      {
        description: "대파를 넣고 끓여주세요",
        image: null,
        timer: "02:00",
      },
    ],
    rating: 4,
    oneLineReview: "맛있어요!",
  };

  return (
    <>
      <Text variant={"displayLarge"}>테스트용페이지</Text>
      <UploadBtn recipe={recipe} />
    </>
  );
}
