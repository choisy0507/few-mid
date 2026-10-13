# The Scent Atlas — 현재 제출 자료

선택한 방향은 **A: 원래 지도 안에서 펼침**입니다. 선호했던 향 지도·우측 설명 패널·두 인상 비교의
시각 언어를 유지하고, 8개 계열을 첫 구조로 삼았습니다.

## 파일

- `The-Scent-Atlas.pptx` / `The-Scent-Atlas.pdf`: 발표 21장. 1–16장 본 발표, 17–21장 부록.
- `Project-Proposal.docx` / `Project-Proposal.pdf`: 프로젝트 의도와 정보 조직화, 제출 요건을 정리한 글.
- `PROJECT-PROPOSAL.md`: 기획 글 텍스트 원본.
- `SPEAKER-NOTES.md`: 발표자 노트. PPTX에도 포함되어 있습니다.
- `REFERENCE-NOTES.md`: 기준 체계, 용례 편집, 시각 자료의 출처와 검토 상태.
- `FIELD-NOTES.md`: 반응형·인터랙션·검증 기록.
- `prototype/index.html`: 수정된 웹사이트를 그대로 담은 단일 파일 프로토타입. 폰트도 포함되어 외부 요청 없이 실행됩니다.
- `assets/`: 실제 화면 캡처, 무드보드, 사이트맵·흐름도·와이어프레임 SVG와 PNG.

전체 ZIP을 압축 해제한 후 `prototype/index.html`을 브라우저에서 열면 원래 지도의 확장과 내부 비교를
시험할 수 있습니다. 이전의 세 관점 구성 프로토타입과 다릅니다.

## 요구사항 대응

| 항목 | 슬라이드 |
| --- | --- |
| Concept / Premise | 3 |
| Intended Experience | 4 |
| References / Inspiration | 8, 19 |
| Mood / Vision Board | 9 |
| Visual Language | 10 |
| Sitemap | 11 |
| User Flow | 12 |
| Wireframes | 13 / assets의 펼침·비교 배치도 |
| Responsive Intentions | 16 |

발표에서는 정보의 역할이 섞이는 문제, 5개 내부 유형과 화면 구조를 분리한 판단, Type과 Facets,
기준 체계의 선택, 단계적 공개, A 대안의 맥락 유지, 개념 내부 비교를 강조합니다.

## 검증과 범위

브라우저 테스트 15개가 통과했습니다. 전체 8계열과 모든 펼침, Musk/Musky 구분, Material·Accord 공개,
내부 비교와 상태 복귀, 키보드·움직임 감소, 320/390/768/1024/1440px에서 넘침·노드 겹침을 확인했습니다.
슬라이드 출력과 폰트·텍스트 영역을 검사하고, 단일 HTML의 탐색·비교·외부 요청 없음도 확인했습니다.

Family 기준은 제공된 업데이트 리서치에 기반하며 원문 새 접근은 프록시 403으로 제한됐습니다.
관계와 향의 용례는 편집 초안으로 전문가 검토가 필요합니다. 학습 효과는 아직 디자인 가설입니다.
시간 변화, 실제 조향 예측, 제품 추천, 임의의 강도·유사도 점수는 포함하지 않습니다.

## 재생성

프로젝트 루트에서 개발 서버를 시작하고 다른 터미널에서 실행합니다.

```sh
npm run dev -- --port 5173 --strictPort
node submission-atlas/source/export.mjs
```

이 환경의 Python 문서 라이브러리와 Chromium을 사용합니다. 기획 글은 PROJECT-PROPOSAL.md,
슬라이드 내용은 source/atlas_content.py에서 수정합니다. 프로토타입은 현재 src와 index.html에서 생성합니다.
