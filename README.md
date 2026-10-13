# The Scent Atlas

최신 요청의 **Experimental Beauty Editorial 웹 프로토타입**은
[prototype-editorial](prototype-editorial/README.md)에 있습니다.
사진·폰트가 포함된 [단일 HTML](prototype-editorial/The-Scent-Atlas-Editorial.html)을
다운로드해 브라우저에서 열거나, 개발 서버의 `/prototype-editorial/index.html`을 엽니다.
아래는 보존한 기존 사이트와 미드텀 제출 자료의 안내입니다.

**전체 8개 향 계열에서 관련 노트와 감각 표현으로 펼쳐지는 인터랙티브 아틀라스.**
원래 지도 안에서 선택한 계열을 확장하는 A 대안을 구현합니다. 종이색, 세리프, 연두 강조,
우측 설명 패널과 두 인상 비교의 기존 시각 언어를 유지합니다.

현재 제출 자료는 [submission-atlas](submission-atlas/README.md)입니다. 이전 Anatomy 방향의
자료는 `submission/`에 보관되어 있으며 현재 선택한 방향과 구분합니다.

## 실행

Node.js 20.19+ 또는 22.12+가 필요합니다. 클라우드 환경에서는 Node.js 24를 사용합니다.

```sh
cd /workspace/few-mid
npm ci --cache /workspace/.npm-cache
npm run dev -- --port 5173
```

다른 환경에서는 프로젝트 루트에서 `npm ci`와 `npm run dev`를 실행하면 됩니다.

```sh
npm run build
npm test
```

브라우저 검증은 시스템 Chromium(`/usr/bin/chromium`)을 우선 사용합니다.
다른 환경에서는 `npx playwright install chromium`으로 설치하거나 `CHROMIUM_PATH`를 지정하세요.
배포 파일은 `dist/`에 생성됩니다. API, 데이터베이스, 로그인, 비밀 키가 필요 없습니다.

## 첫 탐색 경로

1. 전체 8계열에서 **Woody**를 선택합니다. 다른 7계열은 보조적으로 남습니다.
2. 펼친 **Sandalwood**를 선택해 Note와 Creamy·Warm·Dry라는 Facets를 구분합니다.
3. **Floral → Musk**로 이동해 노트와 Musky라는 표현의 관계를 읽습니다.
4. 개념 상세에서 **더 비교하기**를 열고, 닫으면 같은 지도 위치로 돌아옵니다.
5. 조합과 실제 향료는 상세 설명에서 필요할 때 더 읽습니다.

## 구조

- `src/data.js`: 5개 유형의 42개 콘텐츠 예시, 설명이 있는 94개 관계, 맥락별 정성적 비교.
- `src/main.js`: 지도 선택, 관계 강조, 비교, 참고 자료 대화상자.
- `src/style.css`: 반응형 레이아웃, 질감 비유, 선택 전환, reduced motion.
- `tests/exploration.spec.js`: 실제 브라우저 탐색과 반응형 동작 검증.
- [현재 미드텀 기획안](submission-atlas/PROJECT-PROPOSAL.md): A 대안, 정보 조직화 과정과 9개 제출 요건.
- [필드 노트](docs/FIELD-NOTES.md): 구현 판단과 실제 검증 결과.

HTML/CSS와 작은 바닐라 JavaScript 모듈을 사용합니다. Vite는 개발 서버와 빌드만 담당합니다.
영문 폰트는 로컬 패키지에서 제공하며, 앱 실행 중 외부 폰트 요청이 필요하지 않습니다.

## 콘텐츠의 범위

첫 지도는 제공된 리서치에서 채택한 The Perfume Society의 8계열을 기준으로 합니다.
노트와 특징의 관계 및 공간 배치는 편집된 교육용 설계입니다.
오각형은 비교마다 적합한 다섯 관찰 항목을 배치하며 강도 점수나 면적 비교를 사용하지 않습니다.
향의 설명은 교육용 초안으로, 모든 향수·향료·개인에게 동일하게 적용되는 정의가 아닙니다.
제품 추천, 향수 검색, 정밀한 유사도 계산은 현재 범위에 포함하지 않습니다.
