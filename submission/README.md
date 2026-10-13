# Midterm submission package

프로젝트: **The Anatomy of Scent — One scent. Three perspectives.**

## 바로 사용할 파일

- **The-Anatomy-of-Scent.pptx** — 편집 가능한 발표 자료, 총 21장. 주요 텍스트와 카드·색상은 편집할 수 있으며 화면·도식 이미지는 별도 원본을 제공합니다.
- **The-Anatomy-of-Scent.pdf** — 같은 내용의 제출·발표용 PDF. 한글 폰트를 포함한 출력본입니다.
- **Project-Proposal.docx** — 프로젝트를 설명하는 글과 9개 제출 항목을 정리한 편집용 Word 문서.
- **Project-Proposal.pdf** — 기획 글 PDF, 7쪽.
- **PROJECT-PROPOSAL.md** — 동일 기획의 텍스트 원본.
- **SPEAKER-NOTES.md** — 슬라이드별 발표 메모. PPTX에도 발표자 노트가 들어 있습니다.
- **REFERENCE-NOTES.md** — 참고 자료의 역할, 링크, 원문 검토 상태, 시각 자료 출처.
- **FIELD-NOTES.md** — 수업의 반응형·인터랙션 실험 기록과 검증 결과.

## 발표 순서

1–15장을 본 발표로 약 5–6분 동안 진행합니다. 14장에서 별도 디자인 프로토타입을 시연할 수 있습니다.
16–21장은 비교 상세, 구현 범위, 수업 연결, 출처, 피드백, 요구사항 체크리스트 부록입니다.

`presentation.html`은 브라우저용 슬라이드 뷰어입니다. 방향키, Space, Home, End 또는 하단 버튼으로 이동하고 Print 버튼으로 출력합니다.

## 프로토타입과 시각 자료

`prototype/index.html`을 브라우저에서 열면 Notes / Feel / Family, 요소 집중,
Cedarwood ↔ Sandalwood 사례 비교를 직접 시험할 수 있습니다. 외부 API나 폰트 요청이 필요하지 않습니다.
이 프로토타입은 제출용 디자인 실험이며, 기존 웹사이트의 v1과 별도입니다.

`assets/`에는 무드보드 PNG, 사이트맵·흐름도·와이어프레임의 SVG와 PNG,
프로토타입 상태별 실제 화면 캡처가 있습니다. SVG는 디자인 도구에서 불러와 편집할 수 있습니다.
`assets/slide-previews/`는 최종 PDF의 슬라이드별 PNG입니다.

## 과제 요구사항 대응

| 요구사항 | 발표 슬라이드 | 상세 자료 |
| --- | --- | --- |
| Concept / Premise | 3 | PROJECT-PROPOSAL.md §1 |
| Intended Experience | 5 | §2 / Feel·Notice·Discover·Understand·Do |
| References / Inspiration | 7, 19 | §3 / REFERENCE-NOTES.md |
| Mood / Vision Board | 8 | §4 / assets/moodboard.png |
| Visual Language | 9 | §5 / 색상·서체·기호·강조·움직임 |
| Sitemap | 10 | §6 / assets/sitemap.svg |
| User Flow | 11 | §7 / assets/user-flow.svg |
| Wireframes | 12, 13, 16 | §8 / assets/wireframe-*.svg |
| Responsive Intentions | 15 | §9 / wireframe-responsive.svg |

## 검토 상태

기존 v1은 브라우저 테스트 11개를 통과했습니다. 제출용 프로토타입은 관점과 사례의 상태 유지,
키보드 조작, 320–1440px 레이아웃, reduced motion 등 21개 점검을 통과했습니다.
`prototype-validation.json`, `layout-validation.json`에 결과를 기록했습니다.

외부 레퍼런스의 새 원문 접근은 프록시 403으로 제한됐습니다. 제공된 대화와 URL에 기반한 분석을
현재 사이트의 직접 조사나 스크린샷으로 표시하지 않습니다. 학습 효과와 향 콘텐츠의 전문가 검토는 다음 단계입니다.
무드보드는 자체 생성한 소재 비유이며, 비교 사례는 실제 조향 결과의 예측이나 측정값이 아닙니다.

## 재생성

현재 프로젝트 환경에 python-pptx, python-docx, Pillow, Chromium이 준비되어 있습니다.

```sh
cd /workspace/few-mid
npm run dev -- --port 5173 --strictPort
```

다른 터미널에서:

```sh
node submission/source/export.mjs
```

다른 포트를 사용하면 `SUBMISSION_BASE_URL`을 지정합니다. 텍스트·슬라이드 구성은
`source/build_submission.py`에서 편집하고, 프로토타입은 `prototype/index.html`에서 수정합니다.
