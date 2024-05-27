import { View } from "react-native";
import { Text } from "react-native-paper";
import Logo from "../../components/logo";

export default function Contact() {
  return (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        alignItems: "center",
        gap: 20,
      }}
    >
      <Logo />
      <Text variant={"titleLarge"}>
        Gpttuie 서비스는 숭실대학교 3학년 1학기 소프트웨어프로젝트 수업의
        팀프로젝트의 결과물입니다.
      </Text>
      <Text variant={"bodyLarge"}>팀원들</Text>
      <Text variant={"bodyMedium"}> 김선우 : sunshower1127@gmail.com</Text>
      <Text variant={"bodyMedium"}> 오 현 : auth58100@naver.com</Text>
      <Text variant={"bodyMedium"}> 윤수일 : etham512@naver.com</Text>
    </View>
  );
}
