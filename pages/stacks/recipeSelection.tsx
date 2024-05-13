import React, { useState, useEffect } from 'react';
import { View, Button, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, Animated, } from 'react-native';
import config from '../../apikey.js';
import { useRoute } from '@react-navigation/native'; //useRoute 사용을 하여 값을 가져옴
import { RootStackParamList } from '../../navigations/stackNavigation';  //값 저장된 위치 => navigations/stackNavigation.tsx
import { RouteProp } from '@react-navigation/native'; //RouteProp 사용을 하여 값을 가져옴
import * as ImagePicker from "expo-image-picker";

type RecipeSelectionRouteProp = RouteProp<RootStackParamList, '레시피 선택'>;

export default function RecipeSelection() {
  const [response, setResponse] = useState([]);
  const route = useRoute<RecipeSelectionRouteProp>();
  const params = route.params;
  const [servings, setServings] = useState(params?.servingSize);
  const [ingredients, setIngredients] = useState(params?.ingredients);
  const [country, setCountry] = useState(params?.country);
  const [userQuery, setUserQuery] = useState('');
  const [recipeOptions, setRecipeOptions] = useState([]); // 쌍따옴표로 묶인 레시피 옵션
  const [selectedRecipe, setSelectedRecipe] = useState(''); // 선택된 레시피

  useEffect(() => {
    callGPTAPI();
  }, []);

  async function callGPTAPI(customQuery = '') {
    let queryToUse = customQuery || userQuery;
    if (selectedRecipe && !customQuery) {
      queryToUse = `레시피 "${selectedRecipe}"에 대한 세부 정보를 알려주세요.`;
    }
    let messages = [
      { role: 'system', content: '너는 친절하며 전 세계 음식을 다룰 수 있는 유명 쉐프로 경력이 20년이 넘어.' },
      { role: 'system', content: '또한 주어진 재료를 모두 사용하여 만들 수 있는 레시피를 제공할 수 있을 만큼 세계의 수많은 음식과 그에 관한 레시피를 알고 있어. 너가 대답하지 못하는 것은 없어.' },
      { role: 'system', content: '또한 레시피를 제공할 때는 번호를 매겨서 순서를 제공해줘야 해.' },
      { role: 'system', content: '또한 너는 레시피에 대해 각 순서마다 몇 분동안 조리해야 하는지 세세한 정보도 레시피를 제공할 때 알려주어야 해.' },
      { role: 'system', content: '만약 현재 가진 재료가 없다면 추가적인 재료는 없는지 물어봐줘.' },
      { role: 'system', content: '마지막으로, 너는 사용자가 제공한 재료를 바탕으로 3개의 레시피 중 어떤 것을 선택할지 질문하고, 여기서 사용자가 선택한 레시피를 알려줘야 해' },
      { role: 'system', content: '3가지 레시피를 선택하라고 할 때는 레시피 이름을 쌍따음표 사이에 넣어서 제공해줘' },
      { role: 'user', content: `${servings}` },
      { role: 'user', content: `${country}` },
      { role: 'user', content: `${ingredients.join(', ')}` },
      { role: 'user', content: customQuery },
      { role: 'user', content: selectedRecipe ? `레시피 "${selectedRecipe}"에 대한 세부 정보를 알려주세요.` : customQuery },
    ];

    // 사용자 질문이 있다면 메시지 배열에 추가
    if (customQuery) {
      messages.push({ role: 'user', content: customQuery });
    }

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '너는 친절하며 전 세계 음식을 다룰 수 있는 유명 쉐프로 경력이 20년이 넘어요.' },
        { role: 'system', content: '또한 주어진 재료를 모두 사용하여 만들 수 있는 레시피를 제공할 수 있을 만큼 세계의 수많은 음식과 그에 관한 레시피를 알고 있어. 너가 대답하지 못하는 것은 없어.' },
        { role: 'system', content: '또한 레시피를 제공할 때는 번호를 매겨서 순서를 제공해줘야 해.' },
        { role: 'system', content: '또한 너는 레시피에 대해 각 순서마다 몇 분동안 조리해야 하는지 세세한 정보도 레시피를 제공할 때 알려주어야 해.' },
        { role: 'system', content: '만약 현재 가진 재료가 없다면 추가적인 재료는 없는지 물어봐줘.' },
        { role: 'system', content: '마지막으로, 너는 사용자가 제공한 재료를 바탕으로 3개의 레시피 중 어떤 것을 선택할지 질문하고, 여기서 사용자가 선택한 레시피를 알려줘야 해' },
        { role: 'system', content: '3가지 레시피를 선택하라고 할 때는 레시피 이름을 쌍따음표 사이에 넣어서 제공해줘' },

        { role: 'user', content: `${country}` },
        { role: 'user', content: `${ingredients.join(', ')}` },
        { role: 'user', content: customQuery },
        { role: 'user', content: selectedRecipe ? `레시피 "${selectedRecipe}"에 대한 세부 정보를 알려주세요.` : customQuery },
      ],
      temperature: 0.5,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + config.API_KEY,
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      if (responseData.choices && responseData.choices.length > 0 && responseData.choices[0].message) {
        const content = responseData.choices[0].message.content;
        setResponse(content.split('\n'));
        console.log(`API로부터 받은 레시피 상세 정보: ${content}`);
        if (!customQuery) {
          const matchedOptions = content.match(/"(.*?)"/g)?.map(option => option.replace(/"/g, '')); //3가지 레시피 제공 저장: recipeOptions
          if (matchedOptions) {
            setRecipeOptions(matchedOptions);
          }
        }
      } else {
        console.error('Unexpected API response structure:', responseData);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  }

  function handleSelectRecipe(recipe) {
    setSelectedRecipe(recipe); // 선택된 레시피 상태 업데이트
    callGPTAPI(); // 상세 정보 요청
    console.log(`사용자가 선택한 레시피: ${recipe}`); // 터미널에 로깅
  }



  return (
    <View>
      {response.map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
      {recipeOptions.map((option, index) => (
        <Button key={index} title={option} onPress={() => handleSelectRecipe(option)} />
      ))}
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 12 }}
        onChangeText={text => setUserQuery(text)}
        value={userQuery}
        placeholder="추가로 궁금한 점을 입력하세요"
      />
      <Button
        title="질문하기"
        onPress={() => callGPTAPI()}
      />
    </View>
  );
}
