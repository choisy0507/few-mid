export const types = {
  family: { en: 'FRAGRANCE FAMILY', ko: '향 계열', question: '향의 큰 방향을 설명해요.' },
  note: { en: 'NOTE', ko: '노트', question: '구체적인 향의 대상을 가리켜요.' },
  descriptor: { en: 'DESCRIPTOR', ko: '감각 표현', question: '향이 느껴지는 방식을 설명해요.' },
};

// Coordinates are editorial placement, never a measured similarity space.
export const concepts = [
  { id: 'floral', name: 'Floral', ko: '플로럴', type: 'family', x: 18, y: 17, phrase: '꽃이라는 방향, 하나의 향이 아닌 여러 표정.', description: '꽃의 인상이 중심이 되는 큰 계열입니다. 밝고 투명한 꽃잎부터 짙고 풍성한 꽃까지, 같은 Floral 안에서도 질감과 무게는 달라집니다.', image: '막 피어난 꽃잎과 꽃가루. 같은 꽃다발 안에서도 서로 다른 질감.', attention: '꽃이라는 대상과 부드럽거나 파우더리한 질감은 별개예요. Floral이 항상 달거나 Powdery한 것은 아닙니다.', pair: ['green', 'powdery'] },
  { id: 'rose', name: 'Rose', ko: '로즈', type: 'note', x: 40, y: 11, phrase: '꽃잎뿐 아니라, 초록 줄기와 꿀 같은 면도.', description: '장미를 떠올리게 하는 구체적인 노트입니다. 산뜻한 꽃잎, 풋풋한 줄기, 달고 풍성한 인상 중 무엇이 드러나는지는 구성에 따라 다릅니다.', image: '손으로 만진 장미 꽃잎. 가까이에서는 줄기의 초록빛이 함께 느껴지는 장면.', attention: 'Rose라는 노트 표기가 실제 장미 추출물의 사용을 보장하지 않아요. 장미를 연상시키는 향의 재구성일 수도 있습니다.', pair: ['green', 'powdery'] },
  { id: 'green', name: 'Green', ko: '그린', type: 'descriptor', x: 66, y: 18, phrase: '싱그럽기만 한 것이 아니라, 풋풋하고 쌉쌀한.', description: '잎, 줄기, 잘린 풀 같은 초록의 인상을 설명합니다. 산뜻함과 함께 날카로운 풋내나 쌉쌀함이 느껴질 수도 있어요.', image: '손끝으로 비빈 잎과 갓 자른 줄기. 촉촉한 동시에 살짝 날카로운 인상.', attention: 'Green은 특정 식물 하나의 이름이 아니에요. 꽃의 향에 초록 줄기의 느낌이 더해질 때도 사용할 수 있습니다.', pair: ['green', 'clean'] },
  { id: 'dry', name: 'Dry', ko: '드라이', type: 'descriptor', x: 87, y: 29, phrase: '단맛이 물러나고, 마른 결이 남는 느낌.', description: '단맛이나 촉촉한 풍성함보다 마른 결이 두드러지는 인상입니다. 나무, 향신료, 파우더 같은 여러 대상에 적용할 수 있어요.', image: '연필을 깎은 뒤 남은 나무 조각. 달콤한 광택보다 가늘고 거친 결.', attention: 'Dry는 피부를 건조하게 만든다는 뜻이 아니에요. 향의 인상이며, 차갑거나 약한 향과도 같은 말은 아닙니다.', pair: ['dry-woody', 'creamy-woody'] },
  { id: 'woody', name: 'Woody', ko: '우디', type: 'family', x: 77, y: 53, phrase: '나무의 이름보다, 그 결을 느껴보세요.', description: '나무를 연상시키는 인상이 중심인 계열입니다. 연필 같은 마른 결, 크림처럼 둥근 질감, 흙이나 연기가 섞인 느낌까지 폭이 넓어요.', image: '나무를 깎을 때의 마른 조각과 손으로 매끈하게 닦은 나무 표면.', attention: 'Woody를 알았다면 다음 질문은 “어떤 질감의 나무인가?”예요. Dry와 Creamy를 비교하면 같은 계열 안의 차이가 드러납니다.', pair: ['dry-woody', 'creamy-woody'] },
  { id: 'cedarwood', name: 'Cedarwood', ko: '시더우드', type: 'note', x: 85, y: 81, phrase: '연필을 깎을 때 떠오르는, 또렷한 나무 결.', description: '시더우드로 불리는 나무 향의 노트입니다. 연필 깎은 부스러기나 마른 목재를 연상시키는 묘사가 흔하지만, 모든 시더우드 향이 같은 것은 아닙니다.', image: '새로 깎은 연필, 얇게 말린 목재 조각, 햇빛이 닿은 나무 상자.', attention: 'Cedarwood는 노트, Woody는 계열, Dry는 질감의 표현이에요. 서로 연결되지만 동의어는 아닙니다.', pair: ['dry-woody', 'creamy-woody'] },
  { id: 'sandalwood', name: 'Sandalwood', ko: '샌들우드', type: 'note', x: 60, y: 89, phrase: '나무의 단단한 결을 둥글게 감싸는 부드러움.', description: '샌들우드를 연상시키는 노트입니다. 부드럽고 둥근 나무 향을 Creamy하게 묘사하기도 하지만, 원료와 재구성에 따라 성격이 달라집니다.', image: '손바닥의 온기가 남은 매끈한 나무. 결 사이로 퍼지는 둥근 부드러움.', attention: 'Creamy는 샌들우드의 별명이 아니에요. 꽃이나 머스크에도 쓸 수 있는 질감 표현입니다.', pair: ['dry-woody', 'creamy-woody'] },
  { id: 'creamy', name: 'Creamy', ko: '크리미', type: 'descriptor', x: 34, y: 86, phrase: '모서리가 둥글어지는, 매끈하고 풍성한 질감.', description: '크림을 떠올리게 하는 둥글고 매끈한 질감의 비유입니다. 우유 냄새나 실제 유제품 성분을 뜻하지 않으며, 꼭 달다는 의미도 아니에요.', image: '차갑게 흩어지는 가루보다, 천천히 매끈하게 펼쳐지는 크림의 표면.', attention: 'Powdery와 모두 부드러울 수 있지만, Powdery는 가루 같은 보송함에, Creamy는 매끈한 연결감에 주목해보세요.', pair: ['creamy', 'powdery'] },
  { id: 'musky', name: 'Musky', ko: '머스키', type: 'descriptor', x: 12, y: 75, phrase: '갓 세탁한 천부터, 온기가 남은 피부까지.', description: '여러 머스크 계열 향료가 주는 인상을 묶어 설명하는 표현입니다. 깨끗하고 부드러운 인상부터 따뜻하고 피부 가까운 느낌까지, 하나의 고정된 냄새가 아닙니다.', image: '바람에 마른 면 셔츠와 하루 입어 체온이 남은 셔츠. 같은 소재, 다른 인상.', attention: '“깨끗한”과 “관능적인” 설명은 모순이 아니에요. 어떤 머스크와 주변 노트가 쓰였는지에 따라 서로 다른 면이 강조됩니다.', pair: ['clean-musk', 'warm-musk'] },
  { id: 'clean', name: 'Clean', ko: '클린', type: 'descriptor', x: 12, y: 46, phrase: '하나의 원료가 아니라, 깨끗하다는 인상.', description: '깨끗하다고 느끼는 인상을 설명하는 넓은 표현입니다. 비누, 세탁한 천, 공기 같은 이미지가 떠오를 수 있지만 개인의 기억과 문화에 따라 달라져요.', image: '햇빛 아래 마른 흰 셔츠. 씻은 뒤의 공기와 비어 있는 공간.', attention: 'Clean은 Soapy보다 넓은 말이에요. 비누를 연상시키지 않으면서도 깨끗하게 느껴지는 향이 있습니다.', pair: ['clean', 'soapy'] },
  { id: 'soapy', name: 'Soapy', ko: '소피', type: 'descriptor', x: 34, y: 36, phrase: '깨끗함 속에서도, 비누라는 기억이 선명한.', description: '비누나 씻은 피부를 떠올리게 하는 인상입니다. 꽃이나 알데하이드의 조합이 비누처럼 느껴질 수 있지만, 특정 원료 하나로 정해지는 표현은 아니에요.', image: '흰 비누를 문지른 뒤의 피부. 매끈하고 밝은 청결감이 남는 장면.', attention: 'Powdery와 모두 깨끗하게 느껴질 수 있어요. Soapy에서는 “비누를 떠올리는가?”라는 대상의 기억에 주목해보세요.', pair: ['soapy', 'powdery'] },
  { id: 'powdery', name: 'Powdery', ko: '파우더리', type: 'descriptor', x: 51, y: 62, phrase: '부드럽지만, 매끈하기보다 보송한.', description: '고운 가루가 얇게 내려앉는 듯한 질감의 비유입니다. 화장품 파우더를 떠올릴 수 있지만, 꼭 베이비파우더 향이나 달콤한 향을 뜻하지는 않아요.', image: '퍼프로 톡 두드린 고운 가루. 빛을 부드럽게 흐리는 보송한 베일.', attention: 'Soapy는 비누라는 기억, Powdery는 가루 같은 질감에 가까워요. 깨끗함은 겹칠 수 있지만, 설명하는 초점이 다릅니다.', pair: ['powdery', 'soapy'] },
];

// Each edge has an explicit explanation; no inferred transitive relationships.
export const relations = [
  ['floral', 'rose', '계열과 노트', 'Rose는 Floral 계열을 설명할 때 사용할 수 있는 노트의 한 예입니다.'],
  ['floral', 'powdery', '겹칠 수 있는 인상', '일부 꽃의 표현은 꽃가루나 화장품을 연상시키는 보송한 질감을 함께 가질 수 있습니다.'],
  ['floral', 'soapy', '겹칠 수 있는 인상', '일부 꽃과 다른 향료의 조합은 익숙한 꽃향 비누를 떠올리게 할 수 있습니다.'],
  ['rose', 'green', '노트와 표현', '장미의 꽃잎보다 줄기나 잎의 풋풋한 면을 강조하면 Green하게 설명할 수 있습니다.'],
  ['woody', 'cedarwood', '계열과 노트', 'Cedarwood는 Woody한 방향을 설명하는 구체적인 노트의 한 예입니다.'],
  ['woody', 'sandalwood', '계열과 노트', 'Sandalwood는 Woody한 방향을 설명하는 구체적인 노트의 한 예입니다.'],
  ['woody', 'dry', '계열과 질감', 'Woody한 향에서 단맛이 적고 마른 나무 결이 두드러지면 Dry하게 표현할 수 있습니다.'],
  ['woody', 'creamy', '계열과 질감', 'Woody한 향에서도 둥글고 매끈한 질감이 드러나면 Creamy하게 표현할 수 있습니다.'],
  ['cedarwood', 'dry', '노트와 표현', '시더우드 노트의 연필이나 마른 목재 같은 인상을 Dry하게 묘사하기도 합니다.'],
  ['sandalwood', 'creamy', '노트와 표현', '샌들우드 노트의 둥글고 부드러운 면은 Creamy하게 묘사되기도 합니다.'],
  ['powdery', 'soapy', '닮은 점과 차이', '둘 다 청결감을 줄 수 있지만, Powdery는 보송한 질감, Soapy는 비누의 기억에 초점을 둡니다.'],
  ['powdery', 'creamy', '질감의 차이', '둘 다 부드러울 수 있지만, 고운 가루의 보송함과 크림의 매끈함은 서로 다른 비유입니다.'],
  ['powdery', 'musky', '겹칠 수 있는 인상', '일부 머스크의 부드러운 느낌은 파우더 같은 질감으로 묘사되기도 합니다.'],
  ['musky', 'clean', '맥락에 따른 인상', '일부 머스크는 세탁한 직물 같은 깨끗한 인상을 주지만 모든 머스크가 그런 것은 아닙니다.'],
  ['clean', 'soapy', '넓은 인상과 구체적 기억', '비누 같은 느낌은 깨끗함의 한 표현이지만 Clean한 향이 모두 Soapy한 것은 아닙니다.'],
];

export const axes = [
  { name: '부드러움', en: 'SOFT', meaning: '날카로움보다 둥글거나 보송한 질감' },
  { name: '밝은 인상', en: 'BRIGHT', meaning: '무겁기보다 산뜻하고 환하게 느껴지는 인상' },
  { name: '온기', en: 'WARM', meaning: '체온이나 따뜻한 소재를 떠올리는 인상' },
  { name: '마른 질감', en: 'DRY', meaning: '촉촉함과 단맛보다 마른 결이 두드러지는 인상' },
  { name: '피부의 연상', en: 'SKIN-LIKE', meaning: '피부나 체온을 떠올리게 하는 느낌; 발향 거리와 무관' },
];

// Editorial ordinal examples (0–4), not experimentally obtained intensities.
export const impressions = [
  { id: 'soapy', name: 'Soapy', type: '감각 표현', title: '비누의 기억', feel: '밝은 · 씻은 듯한 · 매끈한', scene: '손을 씻고 난 뒤, 피부에 남은 흰 비누의 인상.', focus: '“비누가 떠오르는가?”에 주목하세요.', values: [3, 4, 1, 1, 2] },
  { id: 'powdery', name: 'Powdery', type: '감각 표현', title: '보송한 질감', feel: '고운 · 부드러운 · 가루 같은', scene: '퍼프로 얇게 두드린 파우더. 고운 가루가 만드는 부드러운 베일.', focus: '“가루처럼 보송한가?”에 주목하세요.', values: [4, 2, 2, 4, 2] },
  { id: 'dry-woody', name: 'Dry woody', type: 'Woody 계열 + Dry 표현', title: '마른 나무의 결', feel: '선명한 · 단맛이 적은 · 결이 느껴지는', scene: '새로 깎은 연필과 얇게 부서지는 나무 조각.', focus: '단맛이 물러난 자리의 마른 결을 찾아보세요.', values: [1, 2, 2, 4, 1] },
  { id: 'creamy-woody', name: 'Creamy woody', type: 'Woody 계열 + Creamy 표현', title: '둥근 나무의 표면', feel: '매끈한 · 둥근 · 감싸는 듯한', scene: '따뜻한 손으로 닦은 매끈한 나무. 모서리가 부드러워지는 인상.', focus: '나무의 거친 면보다 매끈하게 이어지는 질감에 주목하세요.', values: [4, 1, 3, 1, 3] },
  { id: 'clean-musk', name: 'Clean musk', type: 'Musky의 깨끗한 맥락', title: '갓 세탁한 천', feel: '청결한 · 가벼운 · 부드러운', scene: '햇빛 아래에서 마른 면 셔츠와 씻은 피부를 떠올리는 머스크의 예시.', focus: '공기와 세탁한 직물의 이미지에 주목하세요.', values: [3, 4, 1, 2, 2] },
  { id: 'warm-musk', name: 'Warm musk', type: 'Musky의 따뜻한 맥락', title: '체온이 남은 천', feel: '따뜻한 · 감싸는 · 피부 같은', scene: '하루 입은 셔츠의 안쪽처럼 체온과 피부를 떠올리는 머스크의 예시.', focus: '관능적이라는 표현을 온기와 피부의 연상으로 읽어보세요.', values: [4, 1, 4, 1, 4] },
  { id: 'clean', name: 'Clean', type: '감각 표현', title: '깨끗하다는 인상', feel: '맑은 · 정돈된 · 산뜻한', scene: '비누 향이 꼭 나지는 않는, 씻은 뒤의 공기와 햇빛에 마른 옷.', focus: '특정 원료보다 깨끗함을 연상시키는지 살펴보세요.', values: [2, 4, 1, 1, 1] },
  { id: 'creamy', name: 'Creamy', type: '감각 표현', title: '매끈하게 이어지는 질감', feel: '둥근 · 풍성한 · 매끈한', scene: '고운 가루가 흩날리는 모습보다 크림이 천천히 펼쳐지는 표면.', focus: '실제 우유 냄새보다 모서리가 둥근 질감의 비유예요.', values: [4, 1, 3, 0, 2] },
  { id: 'dry', name: 'Dry', type: '감각 표현', title: '단맛이 물러난 결', feel: '마른 · 담백한 · 결이 있는', scene: '달고 촉촉한 느낌 대신 남는 마른 종이나 나무의 인상.', focus: 'Dry는 피부의 상태가 아니라 향의 인상입니다.', values: [1, 2, 2, 4, 0] },
  { id: 'green', name: 'Green', type: '감각 표현', title: '초록 줄기의 풋풋함', feel: '풋풋한 · 쌉쌀한 · 잎 같은', scene: '손끝으로 비빈 잎과 잘린 줄기에서 떠오르는 초록의 인상.', focus: '상큼함과 함께 느껴지는 풋내와 쌉쌀함에 주목하세요.', values: [1, 4, 0, 2, 0] },
];

export const presets = {
  clean: { pair: ['soapy', 'powdery'], concept: 'powdery', title: '깨끗함은 겹쳐도, 설명하는 초점은 달라요.', text: 'Soapy는 비누라는 기억에, Powdery는 고운 가루의 질감에 주목합니다. 같은 향에서 두 인상이 함께 느껴질 수도 있어요.' },
  wood: { pair: ['dry-woody', 'creamy-woody'], concept: 'woody', title: '같은 나무의 방향, 다른 표면의 감각.', text: 'Dry woody에서는 단맛이 적은 마른 결을, Creamy woody에서는 둥글고 매끈하게 이어지는 질감을 찾아보세요. 계열은 같아도 촉감의 비유가 달라집니다.' },
  musk: { pair: ['clean-musk', 'warm-musk'], concept: 'musky', title: 'Musky의 두 설명은 모순이 아니에요.', text: '머스크는 하나의 고정된 냄새가 아닙니다. 어떤 향료와 주변 노트가 쓰였는지에 따라 세탁한 천의 청결함이나 체온이 남은 피부의 느낌이 강조될 수 있어요.' },
};
