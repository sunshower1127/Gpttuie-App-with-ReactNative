import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackParamList } from './navigations/stackNavigation';
import { RouteProp } from '@react-navigation/native';
import config from '../gpttuie-init/apikey';

type RecipeSelectionRouteProp = RouteProp<RootStackParamList, '레시피 선택'>;  //재료, 종류, 인원 수
type RecipeCreationRouteProp = RouteProp<RootStackParamList, '레시피 생성'>;   // 레시피 이름

export default function RecipeSelection() {
  const route = useRoute<RecipeSelectionRouteProp>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [recipeOptions, setRecipeOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { ingredients, country, servingSize } = route.params; // Assume these are correctly passed from previous screen.

  useEffect(() => {
    setIsLoading(true);
    fetchRecipeOptions(ingredients, servingSize, country).then(options => {
      setRecipeOptions(options);
      setIsLoading(false);
    });
  }, [ingredients, servingSize, country]);

  const fetchRecipeOptions = async (ingredients, servingSize, country) => {
    const systemMessages = [
      '너는 친절하며 전 세계 음식을 다룰 수 있는 유명 쉐프로 경력이 20년이 넘어.',
    '또한 주어진 재료를 모두 사용하여 만들 수 있는 레시피를 제공할 수 있을 만큼 세계의 수많은 음식과 그에 관한 레시피를 알고 있어. 너가 대답하지 못하는 것은 없어.',
    '또한 레시피를 제공할 때는 번호를 매겨서 순서를 제공해줘야 해.',
    '또한 너는 레시피에 대해 각 순서마다 몇 분동안 조리해야 하는지 세세한 정보도 레시피를 제공할 때 알려주어야 해.',
    '만약 현재 가진 재료가 없다면 추가적인 재료는 없는지 물어봐줘.',
    '마지막으로, 너는 사용자가 제공한 재료를 바탕으로 3개의 레시피 중 어떤 것을 선택할지 질문하고, 여기서 사용자가 선택한 레시피를 알려줘야 해',
    '3가지 레시피를 선택하라고 할 때는 레시피 이름을 쌍따음표 사이에 넣어서 제공해줘'
    ];
    const messages = systemMessages.map(content => ({ role: 'system', content }));
    messages.push({ role: 'user', content: `${ingredients.join(', ')}, ${country}, ${servingSize}` });

    const data = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.5,
      top_p: 1.0,
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.API_KEY}`,
        },
        body: JSON.stringify(data)
      });
      const un_responseData = await response.json();
      const content = un_responseData.choices[0].message.content;
      const responseData = content.match(/"([^"]+)"/g)?.map(option => option.replace(/"/g, ''));
      navigation.push('레시피 생성', { recipeName: responseData });
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      return [];
    }
  };
}
