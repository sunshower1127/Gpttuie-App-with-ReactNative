import ingredients from "../constants/ingredients";
import { Recipe } from "../models/recipe";

const apikey = "sk-" + "cYRgm7j56WMUrQayzkM5T" + "3BlbkFJ4QX2ljoSV0sMucggWX48";

const gptVersion = "gpt-3.5-turbo";



// GPT API를 사용하여 레시피 후보 3개를 추천받는 함수
// 재료, 국가, 사람수의 데이터가 들어있는 Recipe 객체를 받아서,
// 3개의 레시피 후보의 title을 받아와 Recipe[3]을 리턴함.
export async function getRecipeCandidates(
  recipeSetting: Readonly<Recipe>,
  n = 1
): Promise<Recipe[]> {
  const { ingredients, country, servingSize } = recipeSetting;
  if (!ingredients || !country || !servingSize || n > 3) {
    alert("에러 : 레시피 세팅이 없습니다.");
    return [];
  }

  const systemMessages = [
    "너는 친절하며 전 세계 음식을 다룰 수 있는 유명 쉐프로 경력이 20년이 넘어.",
    "또한 주어진 재료를 모두 사용하여 만들 수 있는 레시피를 제공할 수 있을 만큼 세계의 수많은 음식과 그에 관한 레시피를 알고 있어. 너가 대답하지 못하는 것은 없어.",
    //"또한 레시피를 제공할 때는 번호를 매겨서 순서를 제공해줘야 해.",
    //"또한 너는 레시피에 대해 각 순서마다 몇 분동안 조리해야 하는지 세세한 정보도 레시피를 제공할 때 알려주어야 해.",
    //"만약 현재 가진 재료가 없다면 추가적인 재료는 없는지 물어봐줘.",
    "마지막으로, 너는 사용자가 제공한 재료를 바탕으로 3개의 레시피 중 어떤 것을 선택할지 질문하고, 여기서 사용자가 선택한 레시피를 알려줘야 해",
    "3가지 레시피를 선택하라고 할 때는 레시피 이름을 쌍따음표 사이에 넣어서 제공해줘",
    //"또한 너는 사용자가 선택한 레시피에 대해 질문이 생기면 그 레시피에 맞는 올바른 답변을 제공해 주어야 해",
  ];

  const messages = systemMessages.map((content) => ({
    role: "system",
    content,
  }));

  messages.push({
    role: "user",
    content: `재료 : ${ingredients.join(
      ", "
    )}, ${country}, ${servingSize}인분의 요리 3개를 추천해줘.`,
  });

  const data = {
    model: gptVersion,
    messages: messages,
    temperature: 0.5,
    top_p: 1.0,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify(data),
    });
    const un_responseData = await response.json();
    const content: string = un_responseData.choices[0].message.content;
    const responseData = content
      .match(/"([^"]+)"/g)
      ?.map((option) => option.replace(/"/g, ""));

    return [
      {
        ...recipeSetting,
        title: responseData[0],
      },
      {
        ...recipeSetting,
        title: responseData[1],
      },
      {
        ...recipeSetting,
        title: responseData[2],
      },
    ];
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    return await getRecipeCandidates(recipeSetting, n + 1);
  }
}

// GPT API를 사용하여 선택된 레시피의 상세 정보를 가져오는 함수.
// title, ingredients, country, servingSize의 데이터가 들어있는 Recipe 객체를 받아서,
// steps의 description을 채워넣어 Recipe 객체를 리턴함.
export async function getNewRecipe(
  recipeSetting: Readonly<Recipe>,
  n = 1
): Promise<Recipe | null> {
  const { title } = recipeSetting;
  if (!title) {
    alert("에러 : 선택된 레시피가 없습니다.");
    return null;
  }

  if (n > 3) {
    alert("레시피 생성에 실패했습니다.");
    return null;
  }

  const systemMessages = [
    "또한 레시피를 제공할 때는 번호를 매겨서 순서를 제공해줘야 해.",
    "또한 너는 레시피에 대해 각 순서마다 몇 분동안 조리해야 하는지 세세한 정보도 레시피를 제공할 때 알려주어야 해.",
    "만약 현재 가진 재료가 없다면 추가적인 재료는 없는지 물어봐줘.",
    "또한 너는 사용자가 선택한 레시피에 대해 질문이 생기면 그 레시피에 맞는 올바른 답변을 제공해 주어야 해",
  ];

  const messages = systemMessages.map((content) => ({
    role: "system",
    content,
  }));

  messages.push({
    role: "user",
    content: `${title}의 레시피를 선택할게.`,
  });

  const data = {
    model: gptVersion,
    messages: messages,
    temperature: 0.5,
    top_p: 1.0,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify(data),
    });
    const un_responseData = await response.json();
    const content: string = un_responseData.choices[0].message.content;
    // 1. 2. 3. 기준으로 받은 레시피 문자열 나누기
    const descriptions = content
      .split(/\d\.\s/)
      .filter(Boolean)
      .map((desc, index) => `${index}. ${desc}`)
      .slice(1);
    const ingre_descriptions = content
      .split("\n")
      .filter((line) => line.startsWith("- "))
      .map((ing) => ing.slice(2).trim());

    // Step 에다가 나눈 레시피 description에 넣기.
    const newRecipe: Recipe = {
      ...recipeSetting,
      steps: descriptions.map((description) => ({ description })),
      ingredients: ingre_descriptions.map((ingredients) => ingredients),
    };
    return newRecipe;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    return await getNewRecipe(recipeSetting, n + 1);
  }
}
//여기에 추가사항 입력 구현
export async function generateGPTResponse(question: string): Promise<string> {
  const messages = [
    {
      role: "user",
      content: `${question}`,
    },
  ];

  const data = {
    model: gptVersion,
    messages: messages,
    temperature: 0.5,
    top_p: 1.0,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify(data),
    });
    const un_responseData = await response.json();
    const content: string = un_responseData.choices[0].message.content;
    return content;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    return "";
  }
}
