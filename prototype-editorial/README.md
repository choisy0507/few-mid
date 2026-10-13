# The Scent Atlas — Editorial Web Prototype

현재 요청에 맞춘 **웹 프로토타입**입니다. 기존 사이트의 코드와 미드텀 제출 문서는 보존합니다.
Figma 파일이나 Figma 플러그인을 생성하지 않습니다.

## 열기

- `The-Scent-Atlas-Editorial.html`을 다운로드하고 브라우저에서 열면 됩니다.
  사진·글꼴·코드가 모두 들어 있는 단일 파일이며, 실행에 인터넷이 필요하지 않습니다.
- 저장소에서 개발할 때: `npm run dev`를 실행한 뒤 `/prototype-editorial/index.html`을 엽니다.
- `npm run build`에는 기존 사이트와 새 프로토타입이 모두 포함됩니다.

단일 파일은 `node prototype-editorial/source/offline.mjs`로 다시 생성합니다.

## 디자인 기준

공유된 Figma 링크의 파일 키는 `jDSUIQZskEc1ZtI1E07vjg`, 노드는 `4:2`입니다.
현재 실행 환경에서는 Figma 도구가 제공되지 않고, URL 접근도 프록시 403으로 차단되어
**원본 화면을 확인하지 못했습니다**. 픽셀 단위로 원본을 재현했다고 주장하지 않습니다.
직접 확인할 수 있었던 사용자 제공 최종 브리프, 분류 지침, 뷰티 에디토리얼 참고 이미지를 기준으로 구현했습니다.

- Editorial Split 홈과 초보자를 위한 Learn.
- Bodoni Moda / Inter, `#F7F6F3` 배경, 밀키 아이보리와 누드·물빛·앰버 계열의 제한된 강조.
- 8개 Family에서 시작하는 공간형 지도. 다른 계열은 남고 하나의 계열만 확장됩니다.
- 대표 노트는 크게, 표현은 작게 표시합니다. 노트를 선택하면 해당 노트의 표현만 강조합니다.
- 선택한 개념의 이미지, 짧은 정의, 계열 안의 맥락, 공유 계열과 비교를 담는 상세 패널.
- 사진과 정성적 차이를 먼저 보여주는 비교. 가짜 점수나 레이더 면적을 사용하지 않습니다.
- 모바일에서는 노드를 읽기 쉬운 크기로 재배치하고 상세 패널을 아래에 둡니다.
- 키보드 포커스, 비교 탭의 방향키, Escape 닫기, 브라우저 뒤로 가기, reduced motion을 지원합니다.

## 확인할 탐색 경로

1. `홈 → Learn → Iris → Powdery`로 역할과 질감을 구분합니다.
2. `Atlas → Woody → Sandalwood → Creamy → Floral`로 하나의 특징이 여러 계열에 나타나는 것을 확인합니다.
3. `Gourmand → Vanilla → Ambrée`로 같은 정의와 다른 연결 이유를 확인합니다.
4. `Floral → 다른 표현과 보조 연결 → Musk → Musky`로 노트와 표현을 구분합니다.
5. 상세 패널의 비교를 열고 관점을 선택한 뒤 닫으면 같은 지도 선택으로 돌아옵니다.

## 데이터와 근거

사용자 제공 대표 목록: 8 Family, 고유 Note 33개, 고유 Descriptor 24개,
Family–Note 48개 연결과 Family–Descriptor 40개 연결을 전부 반영합니다.
Musk·Incense·Musky·Soapy·Clean 등 기존 교육용 개념은 보조 목록으로 보존합니다.
Accord와 Material은 관련 상세 설명에서만 보여줍니다.

개념은 유형을 포함한 ID로 한 번만 등록합니다. Family와 Descriptor의 Fresh·Floral·Woody는
다른 ID를 사용하며, 노트가 계열의 모든 특징을 자동으로 물려받지 않습니다.
새 목록에 포함되는 관계는 `primary`, 기존의 추가 관계는 `secondary`로 나눕니다.
관계에는 설명·맥락·출처 구분·검토 상태를 저장합니다. 원문을 검증하지 않은 관계에
Established 등급이나 문장별 확인된 출처를 부여하지 않았습니다.

기준 프레임워크의 참고 주소:

- The Perfume Society: https://perfumesociety.org/discover-perfume/an-introduction/fragrance-families/
- The Fragrance Foundation France: https://www.fragrancefoundation.fr/
- Michael Edwards / Fragrances of the World: https://www.fragrancesoftheworld.com/

대표 노트·표현의 전체 목록은 공식 표준이 아닌 **사용자 제공 교육용 편집안**입니다.
개별 노트–표현 연결은 별도로 작성한 편집 설명 사례이며, 조향·구성·개인에 따라 달라집니다.
위치·색·사진을 후각적 유사도나 측정값으로 읽지 않습니다.

## 이미지와 폰트

`assets/hero.png`, `wood.png`, `powder.png`, `cream.png`, `vanilla.png`는
이번 프로젝트를 위해 생성한 AI 에디토리얼 이미지입니다. 참고 캠페인의 사진·상표를 복제하지 않았습니다.
이미지가 없는 개념은 상세 화면에 **이미지 준비 중**으로 표시한 교체 가능한 임시 비주얼을 사용합니다.
같은 사진이 여러 개념에서 쓰일 때에도 감각의 비유이며 문자 그대로의 원료 사진을 보장하지 않습니다.
`previews/`의 이미지는 실제 웹 프로토타입의 브라우저 화면입니다.

Bodoni Moda와 Inter의 WOFF2 파일 및 라이선스를 `assets/fonts/`에 포함합니다.
한국어는 운영체제의 사용 가능한 한국어 글꼴을 사용합니다.

## 구조

- `index.html`: 공통 내비게이션과 접근 가능한 대화상자.
- `data.js`: 기존 데이터를 참조하는 확장 데이터와 맥락별 설명.
- `app.js`: 홈·Learn·지도·상세·비교 및 탐색 상태.
- `style.css`: 새 시각 언어와 반응형 배치.
- `../tests/editorial.spec.js`: 전체 데이터·탐색·키보드·가변 노드 수·화면 크기 검증.
- `source/offline.mjs`: 인터넷 없이 여는 단일 HTML 파일 생성.

기존 `src/`, `submission/`, `submission-atlas/` 및 제출 ZIP은 변경하지 않습니다.
