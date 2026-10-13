# The Language of Scent

향수 이름보다 **궁금한 향의 느낌**으로 시작하는 인터랙티브 웹 프로젝트.
Fragrance Family, Note, Descriptor를 구분하고 관계와 비교를 통해 표현을 이해합니다.

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

1. **Woody** 선택 → Dry, Creamy, Cedarwood, Sandalwood의 연결을 이해합니다.
2. **두 인상 비교** → Dry woody / Creamy woody를 오각형과 장면으로 비교합니다.
3. **Soapy / Powdery** → 비누의 기억과 보송한 질감의 초점 차이를 읽습니다.
4. **Clean musk / Warm musk** → 같은 표현이 맥락에 따라 달라지는 이유를 이해합니다.

## 구조

- `src/data.js`: 12개 개념, 설명이 있는 15개 관계, 정성적 비교 예시.
- `src/main.js`: 지도 선택, 관계 강조, 비교, 참고 자료 대화상자.
- `src/style.css`: 반응형 레이아웃, 질감 비유, 선택 전환, reduced motion.
- `tests/exploration.spec.js`: 실제 브라우저 탐색과 반응형 동작 검증.
- [미드텀 기획안](docs/MIDTERM.md): 콘셉트, 사용자 여정, 시각 언어, 와이어프레임, 발표 구성.
- [필드 노트](docs/FIELD-NOTES.md): 구현 판단과 실제 검증 결과.

HTML/CSS와 작은 바닐라 JavaScript 모듈을 사용합니다. Vite는 개발 서버와 빌드만 담당합니다.
영문 폰트는 로컬 패키지에서 제공하며, 앱 실행 중 외부 폰트 요청이 필요하지 않습니다.

## 콘텐츠의 범위

지도는 편집된 개념 관계도입니다. 공간상의 거리, 오각형의 값이나 면적은 측정값이 아닙니다.
향의 설명은 교육용 초안으로, 모든 향수·향료·개인에게 동일하게 적용되는 정의가 아닙니다.
제품 추천, 향수 검색, 정밀한 유사도 계산은 현재 범위에 포함하지 않습니다.
