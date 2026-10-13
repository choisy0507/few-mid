// Typed editorial knowledge graph; positions never represent measured similarity.
export const types = {
  family: {
    en: "FRAGRANCE FAMILY",
    ko: "향 계열",
  },
  note: {
    en: "NOTE",
    ko: "노트",
  },
  descriptor: {
    en: "DESCRIPTOR",
    ko: "감각 표현",
  },
  accord: {
    en: "ACCORD",
    ko: "어코드",
  },
  material: {
    en: "MATERIAL",
    ko: "실제 향료",
  },
};
export const sources = {
  families: {
    label: "The Perfume Society · Fragrance Families",
    url: "https://perfumesociety.org/discover-perfume/an-introduction/fragrance-families/",
    status: "사용자 제공 리서치 기준; 현재 환경의 원문 접근은 403",
  },
  notes: {
    label: "The Perfume Society · Ingredients",
    url: "https://perfumesociety.org/ingredients/",
    status: "용례의 후속 검토 자료; 설명은 편집 초안",
  },
  editorial: {
    label: "The Scent Atlas · 교육용 관계 설계",
    url: null,
    status: "제공된 대화와 일반적 묘사에 기반한 편집 사례; 측정 데이터 아님",
  },
};
export const concepts = [
  {
    id: "fresh",
    name: "Fresh",
    ko: "프레시",
    type: "family",
    phrase: "상쾌한 방향",
    description:
      "시트러스, 초록 잎, 공기 같은 산뜻한 인상을 넓게 묶는 계열입니다. 특정 향이 산뜻하게 느껴진다는 Fresh 표현과는 역할이 다릅니다.",
    image: "시트러스 껍질과 잎을 비빈 손끝.",
    attention:
      "시트러스라는 대상을 떠올리는지, 초록의 풋풋함에 주목하는지 살펴보세요.",
    x: 18,
    y: 12,
    source: "families",
  },
  {
    id: "floral",
    name: "Floral",
    ko: "플로럴",
    type: "family",
    phrase: "꽃 중심",
    description:
      "꽃의 인상이 중심이 되는 계열입니다. 밝은 꽃잎부터 풍성한 흰 꽃, 보송한 꽃가루까지 다양한 질감을 읽을 수 있습니다.",
    image: "갓 피어난 꽃잎과 얇은 꽃가루.",
    attention:
      "Rose는 노트이고 Floral은 큰 방향입니다. 꽃의 이름과 부드러운 질감은 별개의 정보예요.",
    x: 50,
    y: 7,
    source: "families",
  },
  {
    id: "floriental",
    name: "Floriental",
    ko: "플로리엔탈",
    type: "family",
    phrase: "꽃과 앰버의 만남",
    description:
      "꽃의 인상과 앰버의 따뜻하고 풍성한 면을 함께 읽는 계열입니다. 여기서 채택한 기준 체계의 명칭이며 다른 체계와 일대일로 일치하지 않을 수 있습니다.",
    image: "꽃잎 뒤로 느껴지는 따뜻한 레진.",
    attention:
      "꽃 노트와 온기의 인상이 함께 드러나는지 살펴보세요. 노트 몇 개만으로 계열을 확정하지는 않습니다.",
    x: 82,
    y: 12,
    source: "families",
  },
  {
    id: "ambree",
    name: "Ambrée",
    ko: "앰브레",
    type: "family",
    phrase: "따뜻한 레진과 풍성함",
    description:
      "레진, 바닐라, 스파이스 같은 따뜻하고 풍성한 인상으로 설명되는 계열입니다. Amber Accord는 관련된 조향 개념이지만 계열과는 다른 정보입니다.",
    image: "빛이 닿은 레진과 바닐라의 온기.",
    attention:
      "호박 보석의 냄새라는 뜻이 아니에요. 계열과 여러 소재로 만드는 앰버 어코드를 구분해보세요.",
    x: 90,
    y: 47,
    source: "families",
  },
  {
    id: "gourmand",
    name: "Gourmand",
    ko: "구르망",
    type: "family",
    phrase: "음식과 디저트의 연상",
    description:
      "바닐라나 캐러멜처럼 음식과 디저트를 떠올리는 방향입니다. 실제 식재료의 포함을 뜻하지 않으며 모든 달콤한 향이 이 계열인 것도 아닙니다.",
    image: "따뜻한 바닐라와 매끈한 크림의 장면.",
    attention:
      "Sweet는 표현, Vanilla는 노트, Gourmand는 큰 방향입니다. 서로 바꿔 쓸 수는 없습니다.",
    x: 82,
    y: 87,
    source: "families",
  },
  {
    id: "chypre",
    name: "Chypre",
    ko: "시프레",
    type: "family",
    phrase: "이끼와 우디의 전통적 구조",
    description:
      "시트러스와 꽃, 이끼 같은 배경의 대비를 읽는 전통적 계열입니다. 현대적 해석은 다양하며 노트 목록만으로 구조가 고정되지 않습니다.",
    image: "밝은 시트러스 옆의 그늘진 숲바닥.",
    attention:
      "패출리나 이끼 같은 노트 하나와 Chypre 구조는 같지 않습니다. 대비하고 이어지는 인상을 살펴보세요.",
    x: 50,
    y: 93,
    source: "families",
  },
  {
    id: "woody",
    name: "Woody",
    ko: "우디",
    type: "family",
    phrase: "나무의 이름보다, 그 결을 느껴보세요.",
    description:
      "나무를 연상시키는 인상이 중심인 계열입니다. 연필 같은 마른 결부터 둥글고 크리미한 목질감까지, 같은 방향 안에서도 질감은 달라집니다.",
    image: "나무를 깎을 때의 마른 조각과 손으로 매끈하게 닦은 나무 표면.",
    attention:
      "Woody 다음에는 “어떤 질감의 나무인가?”를 물어보세요. Dry와 Creamy를 비교하면 같은 계열 안의 차이가 드러납니다.",
    x: 18,
    y: 87,
    source: "families",
    comparison: "wood",
  },
  {
    id: "fougere",
    name: "Fougère",
    ko: "푸제르",
    type: "family",
    phrase: "허브와 이끼의 전통적 구조",
    description:
      "라벤더, 쿠마린의 인상, 이끼 같은 배경을 읽는 전통적 계열입니다. 이름이 고사리를 뜻하지만 고사리 원료의 사용을 의미하지는 않습니다.",
    image: "허브 잎 뒤로 이어지는 말린 풀과 이끼.",
    attention:
      "Lavender는 노트, Coumarin은 실제 향료의 예, Fougère는 구조를 읽는 계열입니다.",
    x: 10,
    y: 47,
    source: "families",
  },
  {
    id: "rose",
    name: "Rose",
    ko: "로즈",
    type: "note",
    phrase: "꽃잎뿐 아니라, 초록 줄기와 꿀 같은 면도.",
    description:
      "장미를 떠올리게 하는 구체적인 노트입니다. 산뜻한 꽃잎, 풋풋한 줄기, 달고 풍성한 인상 중 무엇이 드러나는지는 구성에 따라 다릅니다.",
    image:
      "손으로 만진 장미 꽃잎. 가까이에서는 줄기의 초록빛이 함께 느껴지는 장면.",
    attention:
      "Rose라는 노트 표기가 실제 장미 추출물의 사용을 보장하지 않아요. 장미를 연상시키는 향의 재구성일 수도 있습니다.",
    source: "notes",
    facets: ["green", "sweet"],
  },
  {
    id: "cedarwood",
    name: "Cedarwood",
    ko: "시더우드",
    type: "note",
    phrase: "연필을 깎을 때 떠오르는, 또렷한 나무 결.",
    description:
      "시더우드로 불리는 나무 향의 노트입니다. 연필 깎은 부스러기나 마른 목재를 연상시키는 묘사가 흔하지만, 모든 시더우드 향이 같은 것은 아닙니다.",
    image: "새로 깎은 연필, 얇게 말린 목재 조각, 햇빛이 닿은 나무 상자.",
    attention:
      "Cedarwood는 노트, Woody는 계열, Dry는 질감의 표현이에요. 서로 연결되지만 동의어는 아닙니다.",
    source: "notes",
    facets: ["dry"],
    comparison: "wood",
  },
  {
    id: "sandalwood",
    name: "Sandalwood",
    ko: "샌들우드",
    type: "note",
    phrase: "나무의 단단한 결을 둥글게 감싸는 부드러움.",
    description:
      "샌들우드를 연상시키는 노트입니다. 부드럽고 둥근 나무 향을 Creamy하게 묘사하기도 하지만, 원료와 재구성에 따라 성격이 달라집니다.",
    image: "손바닥의 온기가 남은 매끈한 나무. 결 사이로 퍼지는 둥근 부드러움.",
    attention:
      "Creamy는 샌들우드의 별명이 아니에요. 꽃이나 머스크에도 쓸 수 있는 질감 표현입니다.",
    source: "notes",
    facets: ["creamy", "warm", "dry"],
    comparison: "wood",
  },
  {
    id: "jasmine",
    name: "Jasmine",
    ko: "재스민",
    type: "note",
    phrase: "흰 꽃의 여러 표정",
    description:
      "재스민을 연상시키는 노트입니다. 밝은 꽃잎부터 짙고 풍성한 인상까지 구성에 따라 다른 면이 드러납니다.",
    image: "햇빛 아래 흰 꽃과 가까이에서 느껴지는 꽃잎.",
    attention: "노트의 이름만으로 무게와 질감이 정해지지는 않습니다.",
    source: "notes",
    facets: ["sweet", "warm"],
  },
  {
    id: "iris",
    name: "Iris",
    ko: "아이리스",
    type: "note",
    phrase: "꽃의 이름, 보송한 질감을 읽는 단서",
    description:
      "아이리스를 연상시키는 노트입니다. 보송하거나 흙 같은 면으로 묘사되기도 하며 원료와 구성에 따라 인상이 다릅니다.",
    image: "파우더 뒤로 느껴지는 마른 뿌리.",
    attention:
      "Iris는 노트, Powdery는 표현입니다. 모든 아이리스가 같은 질감인 것은 아닙니다.",
    source: "notes",
    facets: ["powdery", "earthy"],
  },
  {
    id: "vetiver",
    name: "Vetiver",
    ko: "베티버",
    type: "note",
    phrase: "마른 풀, 뿌리, 흙의 여러 표정",
    description:
      "베티버를 연상시키는 노트입니다. 마른 목질감, 풀이나 흙 같은 표현이 함께 쓰일 수 있습니다.",
    image: "마른 풀과 땅 가까운 뿌리.",
    attention:
      "하나의 노트는 Woody와 연결되면서도 Earthy하게 느껴질 수 있습니다.",
    source: "notes",
    facets: ["dry", "earthy", "green"],
  },
  {
    id: "bergamot",
    name: "Bergamot",
    ko: "베르가모트",
    type: "note",
    phrase: "밝고 쌉쌀한 시트러스",
    description:
      "베르가모트를 연상시키는 노트입니다. 시트러스의 밝음과 쌉쌀하거나 풋풋한 면으로 묘사될 수 있습니다.",
    image: "손으로 비빈 시트러스 껍질.",
    attention: "Fresh뿐 아니라 Chypre와 Fougère에서도 연결을 읽을 수 있습니다.",
    source: "notes",
    facets: ["fresh-impression", "green"],
  },
  {
    id: "vanilla",
    name: "Vanilla",
    ko: "바닐라",
    type: "note",
    phrase: "단맛과 온기를 설명하는 대상",
    description:
      "바닐라를 연상시키는 노트입니다. 달콤하고 둥글게 묘사될 수 있지만 모든 바닐라 향이 디저트처럼 느껴지는 것은 아닙니다.",
    image: "따뜻하게 펼쳐지는 바닐라의 장면.",
    attention: "Vanilla 노트와 Vanillin 향료는 다른 정보입니다.",
    source: "notes",
    facets: ["sweet", "warm", "creamy"],
  },
  {
    id: "lavender",
    name: "Lavender",
    ko: "라벤더",
    type: "note",
    phrase: "꽃이면서 허브처럼",
    description:
      "라벤더를 연상시키는 노트입니다. 허브의 산뜻함과 꽃, 말린 풀 같은 인상이 함께 묘사될 수 있습니다.",
    image: "허브 꽃대와 말린 풀의 장면.",
    attention: "꽃의 이름이 있다고 Floral에만 연결할 필요는 없어요.",
    source: "notes",
    facets: ["fresh-impression", "green"],
  },
  {
    id: "patchouli",
    name: "Patchouli",
    ko: "패출리",
    type: "note",
    phrase: "흙과 숲바닥, 우디한 배경",
    description:
      "패출리를 연상시키는 노트입니다. 흙, 잎, 목질감 같은 표현이 함께 쓰일 수 있습니다.",
    image: "그늘진 숲바닥과 마른 잎.",
    attention:
      "Earthy는 표현, Patchouli는 노트입니다. 여러 계열에서 다른 역할을 읽을 수 있습니다.",
    source: "notes",
    facets: ["earthy", "dry"],
  },
  {
    id: "musk",
    name: "Musk",
    ko: "머스크",
    type: "note",
    phrase: "세탁한 천부터, 온기가 남은 피부까지",
    description:
      "서로 다른 머스크 원료와 인상을 떠올리는 노트입니다. 깨끗함, 보송함, 피부의 온기 등 다양한 면이 묘사될 수 있습니다.",
    image: "바람에 마른 면 셔츠와 체온이 남은 셔츠.",
    attention:
      "Musk 노트와 Musky 표현은 구분합니다. 관련 인상은 모든 머스크의 고정 특성이 아닙니다.",
    source: "notes",
    facets: ["clean", "powdery", "warm"],
    comparison: "musk",
  },
  {
    id: "incense",
    name: "Incense",
    ko: "인센스",
    type: "note",
    phrase: "연기와 레진을 읽는 노트",
    description:
      "향을 피우는 장면과 레진을 연상시키는 노트입니다. 실제 연기 대신 조합으로 재구성한 인상일 수도 있습니다.",
    image: "가늘게 남은 향의 연기.",
    attention:
      "Incense는 구체적인 연상, Smoky는 여러 대상에 쓸 수 있는 표현입니다.",
    source: "notes",
    facets: ["smoky", "warm", "dry"],
  },
  {
    id: "powdery",
    name: "Powdery",
    ko: "파우더리",
    type: "descriptor",
    phrase: "부드럽지만, 매끈하기보다 보송한.",
    description:
      "고운 가루가 얇게 내려앉는 듯한 질감의 비유입니다. 화장품 파우더를 떠올릴 수 있지만, 꼭 베이비파우더 향이나 달콤한 향을 뜻하지는 않아요.",
    image: "퍼프로 톡 두드린 고운 가루. 빛을 부드럽게 흐리는 보송한 베일.",
    attention:
      "Soapy는 비누라는 기억, Powdery는 가루 같은 질감에 가까워요. 깨끗함은 겹칠 수 있지만, 설명하는 초점이 다릅니다.",
    source: "editorial",
    comparison: "clean",
  },
  {
    id: "creamy",
    name: "Creamy",
    ko: "크리미",
    type: "descriptor",
    phrase: "모서리가 둥글어지는, 매끈하고 풍성한 질감.",
    description:
      "크림을 떠올리게 하는 둥글고 매끈한 질감의 비유입니다. 우유 냄새나 실제 유제품 성분을 뜻하지 않으며, 꼭 달다는 의미도 아니에요.",
    image: "차갑게 흩어지는 가루보다, 천천히 매끈하게 펼쳐지는 크림의 표면.",
    attention:
      "Powdery와 모두 부드러울 수 있지만, Powdery는 가루 같은 보송함에, Creamy는 매끈한 연결감에 주목해보세요.",
    source: "editorial",
    comparison: "wood",
  },
  {
    id: "soapy",
    name: "Soapy",
    ko: "소피",
    type: "descriptor",
    phrase: "깨끗함 속에서도, 비누라는 기억이 선명한.",
    description:
      "비누나 씻은 피부를 떠올리게 하는 인상입니다. 꽃이나 알데하이드의 조합이 비누처럼 느껴질 수 있지만, 특정 원료 하나로 정해지는 표현은 아니에요.",
    image: "흰 비누를 문지른 뒤의 피부. 매끈하고 밝은 청결감이 남는 장면.",
    attention:
      "Powdery와 모두 깨끗하게 느껴질 수 있어요. Soapy에서는 “비누를 떠올리는가?”라는 대상의 기억에 주목해보세요.",
    source: "editorial",
    comparison: "clean",
  },
  {
    id: "clean",
    name: "Clean",
    ko: "클린",
    type: "descriptor",
    phrase: "하나의 원료가 아니라, 깨끗하다는 인상.",
    description:
      "깨끗하다고 느끼는 인상을 설명하는 넓은 표현입니다. 비누, 세탁한 천, 공기 같은 이미지가 떠오를 수 있지만 개인의 기억과 문화에 따라 달라져요.",
    image: "햇빛 아래 마른 흰 셔츠. 씻은 뒤의 공기와 비어 있는 공간.",
    attention:
      "Clean은 Soapy보다 넓은 말이에요. 비누를 연상시키지 않으면서도 깨끗하게 느껴지는 향이 있습니다.",
    source: "editorial",
    comparison: "musk",
  },
  {
    id: "dry",
    name: "Dry",
    ko: "드라이",
    type: "descriptor",
    phrase: "단맛이 물러나고, 마른 결이 남는 느낌.",
    description:
      "단맛이나 촉촉한 풍성함보다 마른 결이 두드러지는 인상입니다. 나무, 향신료, 파우더 같은 여러 대상에 적용할 수 있어요.",
    image: "연필을 깎은 뒤 남은 나무 조각. 달콤한 광택보다 가늘고 거친 결.",
    attention:
      "Dry는 피부를 건조하게 만든다는 뜻이 아니에요. 향의 인상이며, 차갑거나 약한 향과도 같은 말은 아닙니다.",
    source: "editorial",
    comparison: "wood",
  },
  {
    id: "green",
    name: "Green",
    ko: "그린",
    type: "descriptor",
    phrase: "싱그럽기만 한 것이 아니라, 풋풋하고 쌉쌀한.",
    description:
      "잎, 줄기, 잘린 풀 같은 초록의 인상을 설명합니다. 산뜻함과 함께 날카로운 풋내나 쌉쌀함이 느껴질 수도 있어요.",
    image: "손끝으로 비빈 잎과 갓 자른 줄기. 촉촉한 동시에 살짝 날카로운 인상.",
    attention:
      "Green은 특정 식물 하나의 이름이 아니에요. 꽃의 향에 초록 줄기의 느낌이 더해질 때도 사용할 수 있습니다.",
    source: "editorial",
  },
  {
    id: "musky",
    name: "Musky",
    ko: "머스키",
    type: "descriptor",
    phrase: "갓 세탁한 천부터, 온기가 남은 피부까지.",
    description:
      "여러 머스크 계열 향료가 주는 인상을 묶어 설명하는 표현입니다. 깨끗하고 부드러운 인상부터 따뜻하고 피부 가까운 느낌까지, 하나의 고정된 냄새가 아닙니다.",
    image:
      "바람에 마른 면 셔츠와 하루 입어 체온이 남은 셔츠. 같은 소재, 다른 인상.",
    attention:
      "“깨끗한”과 “관능적인” 설명은 모순이 아니에요. 어떤 머스크와 주변 노트가 쓰였는지에 따라 서로 다른 면이 강조됩니다.",
    source: "editorial",
    comparison: "musk",
  },
  {
    id: "warm",
    name: "Warm",
    ko: "웜",
    type: "descriptor",
    phrase: "체온과 따뜻한 소재를 떠올리는 표현입니다.",
    description:
      "체온과 따뜻한 소재를 떠올리는 표현입니다. 실제 온도나 강도를 뜻하지 않습니다.",
    image: "체온이 남은 천.",
    attention: "여러 노트와 계열에 겹쳐 적용할 수 있습니다.",
    source: "editorial",
  },
  {
    id: "sweet",
    name: "Sweet",
    ko: "스위트",
    type: "descriptor",
    phrase: "달콤하다고 느끼는 인상을 설명합니다.",
    description:
      "달콤하다고 느끼는 인상을 설명합니다. 설탕이나 식재료의 포함을 뜻하지 않습니다.",
    image: "바닐라와 꿀을 연상시키는 장면.",
    attention:
      "달게 느껴지는 꽃도 있습니다. Sweet와 Gourmand는 동의어가 아닙니다.",
    source: "editorial",
  },
  {
    id: "fresh-impression",
    name: "Fresh",
    ko: "산뜻한 인상",
    type: "descriptor",
    phrase: "여기서 Fresh는 상쾌한 인상을 설명하는 표현입니다.",
    description:
      "여기서 Fresh는 상쾌한 인상을 설명하는 표현입니다. 같은 철자의 Fresh 계열과 역할을 구분합니다.",
    image: "열린 창문과 허브 잎.",
    attention: "큰 계열인지 감각적 인상인지 문맥과 유형을 읽어보세요.",
    source: "editorial",
  },
  {
    id: "smoky",
    name: "Smoky",
    ko: "스모키",
    type: "descriptor",
    phrase: "향이나 나무가 타는 장면을 연상시키는 표현입니다.",
    description:
      "향이나 나무가 타는 장면을 연상시키는 표현입니다. 실제 연기 성분을 보장하지 않습니다.",
    image: "희미하게 남은 향의 연기.",
    attention: "Incense 노트와 연결될 수 있지만 같은 정보는 아닙니다.",
    source: "editorial",
  },
  {
    id: "earthy",
    name: "Earthy",
    ko: "얼시",
    type: "descriptor",
    phrase: "흙, 뿌리, 숲바닥을 연상시키는 표현입니다.",
    description:
      "흙, 뿌리, 숲바닥을 연상시키는 표현입니다. 특정 원료나 노트의 이름은 아닙니다.",
    image: "그늘진 땅과 말린 뿌리.",
    attention:
      "Vetiver와 Patchouli에서 읽을 수 있지만 모든 경우의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    id: "amber-accord",
    name: "Amber Accord",
    type: "accord",
    description:
      "여러 소재로 따뜻한 앰버 인상을 구성하는 조향 개념입니다. Ambrée 계열이나 보석 자체와 구분합니다.",
    source: "editorial",
  },
  {
    id: "white-floral-accord",
    name: "White Floral Accord",
    type: "accord",
    description:
      "여러 소재로 흰 꽃의 인상을 구성하는 개념입니다. 특정 꽃 원료 하나의 이름이 아닙니다.",
    source: "editorial",
  },
  {
    id: "chypre-accord",
    name: "Chypre Accord",
    type: "accord",
    description:
      "시트러스와 꽃, 이끼 같은 배경의 대비를 읽는 전통적 조향 개념입니다. 실제 배합은 다양합니다.",
    source: "editorial",
  },
  {
    id: "fougere-accord",
    name: "Fougère Accord",
    type: "accord",
    description:
      "라벤더와 쿠마린의 인상, 이끼 같은 배경을 읽는 전통적 조향 개념입니다.",
    source: "editorial",
  },
  {
    id: "rose-absolute",
    name: "Rose Absolute",
    type: "material",
    description:
      "장미에서 얻는 실제 향료의 한 예입니다. Rose 노트가 항상 이 원료로 구현되지는 않습니다.",
    source: "notes",
  },
  {
    id: "sandalwood-oil",
    name: "Sandalwood Oil",
    type: "material",
    description:
      "샌들우드에서 얻는 실제 향료의 한 예입니다. 노트는 다양한 재료로 재구성할 수 있습니다.",
    source: "notes",
  },
  {
    id: "cedarwood-oil",
    name: "Cedarwood Oil",
    type: "material",
    description:
      "시더우드 향을 구현하는 실제 원료의 한 예입니다. 노트명만으로 재료를 확정하지 않습니다.",
    source: "notes",
  },
  {
    id: "vanillin",
    name: "Vanillin",
    type: "material",
    description:
      "바닐라 같은 인상을 구현하는 데 쓰일 수 있는 실제 향료의 예입니다. Vanilla 노트 자체와 구분합니다.",
    source: "notes",
  },
  {
    id: "coumarin",
    name: "Coumarin",
    type: "material",
    description:
      "말린 풀 같은 인상과 전통적인 Fougère 구조를 설명할 때 언급되는 실제 향료의 예입니다.",
    source: "notes",
  },
  {
    id: "linalool",
    name: "Linalool",
    type: "material",
    description:
      "꽃이나 허브의 느낌을 구현하는 데 쓰일 수 있는 향료의 예입니다. Lavender 노트와 같지 않습니다.",
    source: "notes",
  },
];
export const familyMembers = {
  fresh: [
    "bergamot",
    "lavender",
    "vetiver",
    "fresh-impression",
    "green",
    "clean",
  ],
  floral: ["rose", "jasmine", "iris", "musk", "powdery", "soapy", "green"],
  floriental: ["rose", "jasmine", "vanilla", "incense", "warm", "sweet"],
  ambree: ["vanilla", "incense", "musk", "warm", "sweet", "smoky"],
  gourmand: ["vanilla", "sandalwood", "sweet", "creamy", "warm"],
  chypre: [
    "bergamot",
    "patchouli",
    "rose",
    "vetiver",
    "earthy",
    "green",
    "dry",
  ],
  woody: [
    "cedarwood",
    "sandalwood",
    "vetiver",
    "patchouli",
    "dry",
    "creamy",
    "earthy",
  ],
  fougere: [
    "lavender",
    "bergamot",
    "musk",
    "patchouli",
    "green",
    "fresh-impression",
    "clean",
  ],
};
export const relations = [
  {
    fromId: "fresh",
    toId: "bergamot",
    kind: "characteristic_note_of",
    explanation:
      "Bergamot는 Fresh 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "fresh",
    toId: "lavender",
    kind: "characteristic_note_of",
    explanation:
      "Lavender는 Fresh 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "fresh",
    toId: "vetiver",
    kind: "characteristic_note_of",
    explanation:
      "Vetiver는 Fresh 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "fresh",
    toId: "fresh-impression",
    kind: "may_have_facet",
    explanation:
      "Fresh는 Fresh 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "fresh",
    toId: "green",
    kind: "may_have_facet",
    explanation:
      "Green는 Fresh 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "fresh",
    toId: "clean",
    kind: "may_have_facet",
    explanation:
      "Clean는 Fresh 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "floral",
    toId: "rose",
    kind: "characteristic_note_of",
    explanation:
      "Rose는 Floral 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "floral",
    toId: "jasmine",
    kind: "characteristic_note_of",
    explanation:
      "Jasmine는 Floral 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "floral",
    toId: "iris",
    kind: "characteristic_note_of",
    explanation:
      "Iris는 Floral 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "floral",
    toId: "musk",
    kind: "characteristic_note_of",
    explanation:
      "Musk는 Floral 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "floral",
    toId: "powdery",
    kind: "may_have_facet",
    explanation:
      "Powdery는 Floral 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "floral",
    toId: "soapy",
    kind: "may_have_facet",
    explanation:
      "Soapy는 Floral 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "floral",
    toId: "green",
    kind: "may_have_facet",
    explanation:
      "Green는 Floral 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "floriental",
    toId: "rose",
    kind: "characteristic_note_of",
    explanation:
      "Rose는 Floriental 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "floriental",
    toId: "jasmine",
    kind: "characteristic_note_of",
    explanation:
      "Jasmine는 Floriental 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "floriental",
    toId: "vanilla",
    kind: "characteristic_note_of",
    explanation:
      "Vanilla는 Floriental 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "floriental",
    toId: "incense",
    kind: "characteristic_note_of",
    explanation:
      "Incense는 Floriental 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "floriental",
    toId: "warm",
    kind: "may_have_facet",
    explanation:
      "Warm는 Floriental 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "floriental",
    toId: "sweet",
    kind: "may_have_facet",
    explanation:
      "Sweet는 Floriental 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "ambree",
    toId: "vanilla",
    kind: "characteristic_note_of",
    explanation:
      "Vanilla는 Ambrée 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "ambree",
    toId: "incense",
    kind: "characteristic_note_of",
    explanation:
      "Incense는 Ambrée 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "ambree",
    toId: "musk",
    kind: "characteristic_note_of",
    explanation:
      "Musk는 Ambrée 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "ambree",
    toId: "warm",
    kind: "may_have_facet",
    explanation:
      "Warm는 Ambrée 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "ambree",
    toId: "sweet",
    kind: "may_have_facet",
    explanation:
      "Sweet는 Ambrée 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "ambree",
    toId: "smoky",
    kind: "may_have_facet",
    explanation:
      "Smoky는 Ambrée 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "gourmand",
    toId: "vanilla",
    kind: "characteristic_note_of",
    explanation:
      "Vanilla는 Gourmand 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "gourmand",
    toId: "sandalwood",
    kind: "characteristic_note_of",
    explanation:
      "Sandalwood는 Gourmand 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "gourmand",
    toId: "sweet",
    kind: "may_have_facet",
    explanation:
      "Sweet는 Gourmand 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "gourmand",
    toId: "creamy",
    kind: "may_have_facet",
    explanation:
      "Creamy는 Gourmand 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "gourmand",
    toId: "warm",
    kind: "may_have_facet",
    explanation:
      "Warm는 Gourmand 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "chypre",
    toId: "bergamot",
    kind: "characteristic_note_of",
    explanation:
      "Bergamot는 Chypre 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "chypre",
    toId: "patchouli",
    kind: "characteristic_note_of",
    explanation:
      "Patchouli는 Chypre 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "chypre",
    toId: "rose",
    kind: "characteristic_note_of",
    explanation:
      "Rose는 Chypre 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "chypre",
    toId: "vetiver",
    kind: "characteristic_note_of",
    explanation:
      "Vetiver는 Chypre 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "chypre",
    toId: "earthy",
    kind: "may_have_facet",
    explanation:
      "Earthy는 Chypre 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "chypre",
    toId: "green",
    kind: "may_have_facet",
    explanation:
      "Green는 Chypre 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "chypre",
    toId: "dry",
    kind: "may_have_facet",
    explanation:
      "Dry는 Chypre 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "woody",
    toId: "cedarwood",
    kind: "characteristic_note_of",
    explanation:
      "Cedarwood는 Woody 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "woody",
    toId: "sandalwood",
    kind: "characteristic_note_of",
    explanation:
      "Sandalwood는 Woody 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "woody",
    toId: "vetiver",
    kind: "characteristic_note_of",
    explanation:
      "Vetiver는 Woody 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "woody",
    toId: "patchouli",
    kind: "characteristic_note_of",
    explanation:
      "Patchouli는 Woody 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "woody",
    toId: "dry",
    kind: "may_have_facet",
    explanation:
      "Dry는 Woody 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "woody",
    toId: "creamy",
    kind: "may_have_facet",
    explanation:
      "Creamy는 Woody 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "woody",
    toId: "earthy",
    kind: "may_have_facet",
    explanation:
      "Earthy는 Woody 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "fougere",
    toId: "lavender",
    kind: "characteristic_note_of",
    explanation:
      "Lavender는 Fougère 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "fougere",
    toId: "bergamot",
    kind: "characteristic_note_of",
    explanation:
      "Bergamot는 Fougère 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "fougere",
    toId: "musk",
    kind: "characteristic_note_of",
    explanation:
      "Musk는 Fougère 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "fougere",
    toId: "patchouli",
    kind: "characteristic_note_of",
    explanation:
      "Patchouli는 Fougère 방향을 읽는 관련 노트의 한 예입니다. 이 계열에만 속한다는 뜻은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "fougere",
    toId: "green",
    kind: "may_have_facet",
    explanation:
      "Green는 Fougère 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "fougere",
    toId: "fresh-impression",
    kind: "may_have_facet",
    explanation:
      "Fresh는 Fougère 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "fougere",
    toId: "clean",
    kind: "may_have_facet",
    explanation:
      "Clean는 Fougère 방향에서 드러날 수 있는 인상의 예입니다. 모든 향의 고정 특성은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "rose",
    toId: "green",
    kind: "may_have_facet",
    explanation:
      "Rose 노트는 Green하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "rose",
    toId: "sweet",
    kind: "may_have_facet",
    explanation:
      "Rose 노트는 Sweet하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "jasmine",
    toId: "sweet",
    kind: "may_have_facet",
    explanation:
      "Jasmine 노트는 Sweet하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "jasmine",
    toId: "warm",
    kind: "may_have_facet",
    explanation:
      "Jasmine 노트는 Warm하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "iris",
    toId: "powdery",
    kind: "may_have_facet",
    explanation:
      "Iris 노트는 Powdery하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "iris",
    toId: "earthy",
    kind: "may_have_facet",
    explanation:
      "Iris 노트는 Earthy하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "cedarwood",
    toId: "dry",
    kind: "may_have_facet",
    explanation:
      "Cedarwood 노트는 Dry하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "sandalwood",
    toId: "creamy",
    kind: "may_have_facet",
    explanation:
      "Sandalwood 노트는 Creamy하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "sandalwood",
    toId: "warm",
    kind: "may_have_facet",
    explanation:
      "Sandalwood 노트는 Warm하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "sandalwood",
    toId: "dry",
    kind: "may_have_facet",
    explanation:
      "Sandalwood 노트는 Dry하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "vetiver",
    toId: "dry",
    kind: "may_have_facet",
    explanation:
      "Vetiver 노트는 Dry하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "vetiver",
    toId: "earthy",
    kind: "may_have_facet",
    explanation:
      "Vetiver 노트는 Earthy하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "vetiver",
    toId: "green",
    kind: "may_have_facet",
    explanation:
      "Vetiver 노트는 Green하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "bergamot",
    toId: "fresh-impression",
    kind: "may_have_facet",
    explanation:
      "Bergamot 노트는 Fresh하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "bergamot",
    toId: "green",
    kind: "may_have_facet",
    explanation:
      "Bergamot 노트는 Green하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "vanilla",
    toId: "sweet",
    kind: "may_have_facet",
    explanation:
      "Vanilla 노트는 Sweet하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "vanilla",
    toId: "warm",
    kind: "may_have_facet",
    explanation:
      "Vanilla 노트는 Warm하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "vanilla",
    toId: "creamy",
    kind: "may_have_facet",
    explanation:
      "Vanilla 노트는 Creamy하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "lavender",
    toId: "fresh-impression",
    kind: "may_have_facet",
    explanation:
      "Lavender 노트는 Fresh하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "lavender",
    toId: "green",
    kind: "may_have_facet",
    explanation:
      "Lavender 노트는 Green하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "patchouli",
    toId: "earthy",
    kind: "may_have_facet",
    explanation:
      "Patchouli 노트는 Earthy하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "patchouli",
    toId: "dry",
    kind: "may_have_facet",
    explanation:
      "Patchouli 노트는 Dry하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "musk",
    toId: "clean",
    kind: "may_have_facet",
    explanation:
      "Musk 노트는 Clean하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "musk",
    toId: "powdery",
    kind: "may_have_facet",
    explanation:
      "Musk 노트는 Powdery하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "musk",
    toId: "warm",
    kind: "may_have_facet",
    explanation:
      "Musk 노트는 Warm하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "incense",
    toId: "smoky",
    kind: "may_have_facet",
    explanation:
      "Incense 노트는 Smoky하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "incense",
    toId: "warm",
    kind: "may_have_facet",
    explanation:
      "Incense 노트는 Warm하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "incense",
    toId: "dry",
    kind: "may_have_facet",
    explanation:
      "Incense 노트는 Dry하게 묘사될 수 있습니다. 구성에 따라 달라지는 인상이며 고정된 점수가 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "floral",
    toId: "white-floral-accord",
    kind: "characteristic_structure_of",
    explanation:
      "White Floral Accord는 Floral 방향을 설명할 때 살펴볼 조향 개념입니다. 계열과 어코드는 다른 정보입니다.",
    source: "editorial",
  },
  {
    fromId: "floriental",
    toId: "amber-accord",
    kind: "characteristic_structure_of",
    explanation:
      "Amber Accord는 Floriental 방향을 설명할 때 살펴볼 조향 개념입니다. 계열과 어코드는 다른 정보입니다.",
    source: "editorial",
  },
  {
    fromId: "floriental",
    toId: "white-floral-accord",
    kind: "characteristic_structure_of",
    explanation:
      "White Floral Accord는 Floriental 방향을 설명할 때 살펴볼 조향 개념입니다. 계열과 어코드는 다른 정보입니다.",
    source: "editorial",
  },
  {
    fromId: "ambree",
    toId: "amber-accord",
    kind: "characteristic_structure_of",
    explanation:
      "Amber Accord는 Ambrée 방향을 설명할 때 살펴볼 조향 개념입니다. 계열과 어코드는 다른 정보입니다.",
    source: "editorial",
  },
  {
    fromId: "chypre",
    toId: "chypre-accord",
    kind: "characteristic_structure_of",
    explanation:
      "Chypre Accord는 Chypre 방향을 설명할 때 살펴볼 조향 개념입니다. 계열과 어코드는 다른 정보입니다.",
    source: "editorial",
  },
  {
    fromId: "fougere",
    toId: "fougere-accord",
    kind: "characteristic_structure_of",
    explanation:
      "Fougère Accord는 Fougère 방향을 설명할 때 살펴볼 조향 개념입니다. 계열과 어코드는 다른 정보입니다.",
    source: "editorial",
  },
  {
    fromId: "rose",
    toId: "rose-absolute",
    kind: "may_be_realized_with",
    explanation:
      "Rose Absolute는 Rose의 인상을 구현할 수 있는 실제 향료의 한 예입니다. 노트 표기만으로 사용을 확정하지 않습니다.",
    source: "editorial",
  },
  {
    fromId: "cedarwood",
    toId: "cedarwood-oil",
    kind: "may_be_realized_with",
    explanation:
      "Cedarwood Oil는 Cedarwood의 인상을 구현할 수 있는 실제 향료의 한 예입니다. 노트 표기만으로 사용을 확정하지 않습니다.",
    source: "editorial",
  },
  {
    fromId: "sandalwood",
    toId: "sandalwood-oil",
    kind: "may_be_realized_with",
    explanation:
      "Sandalwood Oil는 Sandalwood의 인상을 구현할 수 있는 실제 향료의 한 예입니다. 노트 표기만으로 사용을 확정하지 않습니다.",
    source: "editorial",
  },
  {
    fromId: "vanilla",
    toId: "vanillin",
    kind: "may_be_realized_with",
    explanation:
      "Vanillin는 Vanilla의 인상을 구현할 수 있는 실제 향료의 한 예입니다. 노트 표기만으로 사용을 확정하지 않습니다.",
    source: "editorial",
  },
  {
    fromId: "lavender",
    toId: "linalool",
    kind: "may_be_realized_with",
    explanation:
      "Linalool는 Lavender의 인상을 구현할 수 있는 실제 향료의 한 예입니다. 노트 표기만으로 사용을 확정하지 않습니다.",
    source: "editorial",
  },
  {
    fromId: "fougere-accord",
    toId: "coumarin",
    kind: "may_be_realized_with",
    explanation:
      "Coumarin는 Fougère Accord의 인상을 구현할 수 있는 실제 향료의 한 예입니다. 노트 표기만으로 사용을 확정하지 않습니다.",
    source: "editorial",
  },
  {
    fromId: "powdery",
    toId: "soapy",
    kind: "editorial_comparison",
    explanation:
      "교육용으로 선정한 비교입니다. 보송한 질감과 비누의 기억을 구별해보세요.",
    source: "editorial",
  },
  {
    fromId: "dry",
    toId: "creamy",
    kind: "contrasts_with",
    explanation:
      "교육용 맥락에서 마른 결과 매끈한 질감을 대비합니다. 항상 배타적인 성질은 아닙니다.",
    source: "editorial",
  },
  {
    fromId: "musk",
    toId: "musky",
    kind: "has_related_descriptor",
    explanation: "Musk는 노트, Musky는 관련 인상을 설명하는 표현입니다.",
    source: "editorial",
  },
];
export const impressions = {
  soapy: {
    id: "soapy",
    name: "Soapy",
    type: "감각 표현",
    title: "비누의 기억",
    feel: "밝은 · 씻은 듯한 · 매끈한",
    scene: "손을 씻고 난 뒤, 피부에 남은 흰 비누의 인상.",
    focus: "“비누가 떠오르는가?”에 주목하세요.",
  },
  powdery: {
    id: "powdery",
    name: "Powdery",
    type: "감각 표현",
    title: "보송한 질감",
    feel: "고운 · 부드러운 · 가루 같은",
    scene: "퍼프로 얇게 두드린 파우더. 고운 가루가 만드는 부드러운 베일.",
    focus: "“가루처럼 보송한가?”에 주목하세요.",
  },
  "dry-woody": {
    id: "dry-woody",
    name: "Dry woody",
    type: "Woody 계열 + Dry 표현",
    title: "마른 나무의 결",
    feel: "선명한 · 단맛이 적은 · 결이 느껴지는",
    scene: "새로 깎은 연필과 얇게 부서지는 나무 조각.",
    focus: "단맛이 물러난 자리의 마른 결을 찾아보세요.",
  },
  "creamy-woody": {
    id: "creamy-woody",
    name: "Creamy woody",
    type: "Woody 계열 + Creamy 표현",
    title: "둥근 나무의 표면",
    feel: "매끈한 · 둥근 · 감싸는 듯한",
    scene: "따뜻한 손으로 닦은 매끈한 나무. 모서리가 부드러워지는 인상.",
    focus: "나무의 거친 면보다 매끈하게 이어지는 질감에 주목하세요.",
  },
  "clean-musk": {
    id: "clean-musk",
    name: "Clean musk",
    type: "Musky의 깨끗한 맥락",
    title: "갓 세탁한 천",
    feel: "청결한 · 가벼운 · 부드러운",
    scene: "햇빛 아래에서 마른 면 셔츠와 씻은 피부를 떠올리는 머스크의 예시.",
    focus: "공기와 세탁한 직물의 이미지에 주목하세요.",
  },
  "warm-musk": {
    id: "warm-musk",
    name: "Warm musk",
    type: "Musky의 따뜻한 맥락",
    title: "체온이 남은 천",
    feel: "따뜻한 · 감싸는 · 피부 같은",
    scene: "하루 입은 셔츠의 안쪽처럼 체온과 피부를 떠올리는 머스크의 예시.",
    focus: "관능적이라는 표현을 온기와 피부의 연상으로 읽어보세요.",
  },
};
export const comparisons = {
  clean: {
    title: "Soapy × Powdery",
    pair: ["soapy", "powdery"],
    within: "Powdery / Soapy",
    summary: "깨끗함은 겹쳐도, 설명하는 초점은 달라요.",
    explanation:
      "Soapy는 비누의 기억에, Powdery는 가루의 질감에 주목합니다. 같은 향에서 두 인상이 함께 느껴질 수도 있어요.",
    axes: [
      ["질감의 비유", "TEXTURE", "매끈한 비누", "고운 가루"],
      ["떠오르는 장면", "REFERENCE", "씻은 피부", "화장품 파우더"],
      ["깨끗함의 연상", "CLEAN", "비누라는 기억", "보송한 인상"],
      ["표현의 초점", "FOCUS", "비누 같은 대상", "가루 같은 질감"],
      ["관찰 질문", "NOTICE", "비누가 떠오르는가?", "보송하게 느껴지는가?"],
    ],
  },
  wood: {
    title: "Dry woody × Creamy woody",
    pair: ["dry-woody", "creamy-woody"],
    within: "Woody",
    summary: "같은 나무의 방향, 다른 표면의 감각.",
    explanation:
      "Dry woody에서는 마른 나무 결을, Creamy woody에서는 둥글고 매끈하게 이어지는 질감을 살펴보세요. 실제 배합 결과가 아닌 두 교육용 설명 사례입니다.",
    axes: [
      ["질감의 비유", "TEXTURE", "마른 결", "매끈한 표면"],
      ["목재의 연상", "REFERENCE", "깎은 연필", "다듬은 나무"],
      ["단맛과의 관계", "SWEETNESS", "단맛보다 결에 주목", "달다는 뜻은 아님"],
      ["설명하는 말", "LANGUAGE", "Dry라는 질감", "Creamy라는 질감"],
      ["관찰 질문", "NOTICE", "마른 결과 대비가 있는가?", "둥글게 이어지는가?"],
    ],
  },
  musk: {
    title: "Clean musk × Warm musk",
    pair: ["clean-musk", "warm-musk"],
    within: "Musk",
    summary: "머스크의 두 설명은 모순이 아니에요.",
    explanation:
      "서로 다른 머스크와 주변 구성이 세탁한 천의 청결함이나 체온이 남은 피부를 연상시킬 수 있습니다. 모든 머스크의 고정된 특성이 아니라 두 교육용 맥락을 비교합니다.",
    axes: [
      ["직물의 연상", "FABRIC", "갓 세탁한 천", "체온이 남은 천"],
      ["피부의 연상", "SKIN", "씻은 피부의 인상", "피부 가까운 온기"],
      ["분위기의 비유", "IMPRESSION", "밝은 청결감", "따뜻한 친밀감"],
      ["질감의 공통점", "TEXTURE", "부드러울 수 있음", "부드러울 수 있음"],
      [
        "관찰 질문",
        "NOTICE",
        "세탁한 천이 떠오르는가?",
        "체온과 피부가 떠오르는가?",
      ],
    ],
  },
};
