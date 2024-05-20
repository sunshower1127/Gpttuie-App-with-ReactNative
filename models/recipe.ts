// 레시피 데이터를 정의하는 인터페이스를 작성합니다.
// 레시피 데이터는 제목, 서빙 사이즈, 국가, 재료, 단계, 평점으로 구성됩니다.
// 단계는 설명, 이미지, 타이머로 구성됩니다.
// 레시피 데이터는 선택적으로 제공될 수 있습니다. -> 다른거 안넣고 title만 넣어도 오류 안남.
// 즉 페이지나 함수간 레시피 관련 데이터는 무조건 Recipe 객체로 주고 받습니다. -> 에러 방지

export interface Step {
  description?: string | null;
  image?: string | null;
  timer?: string | null;
}

export interface Recipe {
  title?: string | null;
  servingSize?: number | null;
  country?: string | null;
  ingredients?: string[] | null;
  steps?: Step[] | null;
  rating?: number | null;
}
