# References / Inspiration — 역할과 검토 상태

검토일: 2026-10-13. 사용자 제공 자료와 기획 문헌을 구분한 리서치 기록입니다.

## 원문 접근 상태

현재 클라우드 환경에서 Scent Verdict, Fragrantica, Everfumed, Fragrances of the World,
The Perfume Society URL에 읽기 요청을 보냈으나 프록시 CONNECT 단계에서 403으로 차단됐습니다.
사이트 내용을 새로 직접 확인하거나 화면을 캡처했다고 주장하지 않습니다.
발표에 사용한 자료는 제공된 대화의 서비스 설명과 URL, 기획 참고 문헌의 알려진 주제,
그리고 독자적으로 제작한 시각 자료입니다. 출처 문장을 원문 인용으로 만들지 않았습니다.

## 사용자 제공 레퍼런스의 설계 분석

### Fragrantica — Perfume Finder

URL: https://www.fragrantica.com/perfume-finder/

제공된 대화에서는 향수·노트·어코드·지도 등 다양한 탐색을 제공하는 서비스로 소개됐습니다.
우리가 참고하는 것은 구체적인 노트가 검색의 단위가 된다는 정보 구조입니다.
이 프로젝트는 제품 후보를 고르기 전에 노트·질감·계열이 각각 무엇을 말하는지 이해하는 여정에 집중합니다.
Fragrantica에 교육적 콘텐츠나 비교 기능이 없다고 주장하지 않습니다.

### Scent Verdict — Scent Wheel

URL: https://scentverdict.com/guides/scentwheel

계열을 공간적으로 조직하는 레퍼런스입니다. 관계를 한눈에 읽는 접근을 참고하되,
교육용 관계도의 거리를 실제 후각적 유사도로 해석하지 않도록 연결 이유를 문장으로 보여줍니다.
정확한 화면과 기능 범위는 원문 확인 뒤 보완해야 합니다.

### Michael Edwards — Fragrances of the World

URL: https://www.fragrancesoftheworld.com/

향 계열을 정리하는 참고 기준입니다. Family, Note, Descriptor를 구분하는 콘텐츠 설계에서
계열의 역할을 이해하기 위해 사용합니다. 공인된 계열 분류 전체를 구현하거나 향수를 판정하지 않습니다.

### Everfumed — Find Your Scent Sign Quiz

URL: https://everfumed.com/find-your-scent-sign-quiz/

질문과 선택을 통해 탐색의 진입점을 만드는 레퍼런스입니다. 우리는 선택의 결과를 취향 유형으로
확정하기보다, 다음에 어떤 차이를 관찰하면 좋은지 돌려주는 구조로 발전시킵니다.
문항이나 알고리즘은 확인하지 않았고 복제하지 않았습니다.

## 경험과 시각 언어의 기획 참고

### Bret Victor — Explorable Explanations

URL: https://worrydream.com/ExplorableExplanations/

독자의 조작이 설명을 이해하는 과정과 연결되는 인터랙티브 문헌입니다.
그 원칙을 같은 장면에서 Notes / Feel / Family를 전환하는 방식에 연결했습니다.
현재 원문 재열람은 하지 않았으며 직접 인용은 사용하지 않습니다.

### Kinfolk — Editorial reference

URL: https://www.kinfolk.com/

차분한 여백, 소재 중심 이미지, 큰 제목과 작은 설명이 만드는 에디토리얼 분위기의 참고 대상으로
선정했습니다. 특정 페이지를 복제하거나 해당 사이트의 최신 화면을 조사했다고 주장하지 않습니다.

### 식물 표본 / 관찰 노트

특정 작품의 복제가 아닌 관찰 방식에 대한 참조입니다. 하나의 대상을 전체로 보고,
요소를 분리해 주석으로 읽고, 다시 전체 관계로 돌아오는 구조를 참고했습니다.
실제 표본 이미지를 무단 사용하지 않고 SVG와 자체 생성 무드보드를 제작했습니다.

## 향 콘텐츠의 후속 검토 대상

The Perfume Society: https://perfumesociety.org/ingredients-post/sandalwood/

시더우드·샌들우드·머스크의 대표 용례, 실제 노트와 원료의 관계를 추가 검토할 자료입니다.
현재 설명은 일반적인 향 묘사에 기반한 편집 초안입니다. 검증된 문장별 인용이 확보된 상태로 표시하지 않습니다.

## 시각 자료의 출처

- `assets/moodboard.png`: 이 프로젝트를 위해 AI로 생성한 개념적 소재 콜라주. 실제 향료 증거 사진 아님.
- 와이어프레임·사이트맵·흐름도: 이번 제출용으로 직접 설계한 SVG 및 렌더링 이미지.
- 디자인 프로토타입 화면: 이번 제출용 별도 HTML 프로토타입의 실제 캡처.
- v1 화면: 이 저장소에서 실행되는 기존 웹사이트의 캡처.
- 색상과 기호: 프로젝트의 편집 규칙. 보편적 후각 데이터 표기 아님.

## 제출 전 원문 검토 권장

서비스 화면을 새로 확인하면 아래 세 가지를 추가 기록할 수 있습니다.
실제 진입점이 무엇인지, 사용자가 조작하면 무엇이 바뀌는지, 그 구조에서 어떤 원칙을 가져오는지.
레퍼런스를 더 많이 모으는 것보다 설계 결정과 연결되는 한 문장씩을 확보하는 것이 중요합니다.
