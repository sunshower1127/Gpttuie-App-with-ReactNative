import { SegmentedButtons } from "react-native-paper";

// RecipeSetting 페이지에서 사용되는 나라 선택 컴포넌트
export default function CountryBtn(props: any) {
  return (
    <SegmentedButtons
      {...props}
      buttons={[
        {
          value: "한식",
          label: "한식",
          icon: "rice",
        },
        {
          value: "중식",
          label: "중식",
          icon: "food-takeout-box",
        },
        {
          value: "일식",
          label: "일식",
          icon: "noodles",
        },
        {
          value: "양식",
          label: "양식",
          icon: "hamburger",
        },
      ]}
    />
  );
}
