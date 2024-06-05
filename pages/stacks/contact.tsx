import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import Logo from "../../components/logo";
import { useState } from "react";
import { getGptVersion, setGptVersion } from "../../utils/gpt";

export default function Contact() {
  const [version, setVersion] = useState(getGptVersion());
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
      <Button
        mode="outlined"
        onPress={() => {
          if (version === "gpt-3.5-turbo") {
            setVersion("gpt-4o");
            setGptVersion("gpt-4o");
          } else if (version === "gpt-4o") {
            setVersion("gpt-3.5-turbo");
            setGptVersion("gpt-3.5-turbo");
          }
        }}
      >
        {" "}
        {version}{" "}
      </Button>
    </View>
  );
}
