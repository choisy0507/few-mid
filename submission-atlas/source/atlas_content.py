"""Current design A: one persistent eight-family map with progressive disclosure."""
def bind(api):
    globals().update({k:api[k] for k in ['svg_box','svg_text','arrow','save_svg','slide','text','rect','image','card','INK','MUTED','LIME','LINE']})

def make_diagrams(api):
    bind(api)
    b=svg_box(435,20,530,85,LIME)+svg_text(700,56,'HOME / INTRO + HOW TO READ',23,anchor='middle',weight=600)+svg_text(700,88,'큰 방향 · 대상 · 감각의 차이',19,anchor='middle')
    b+=arrow(700,106,700,142)+svg_box(160,145,1080,90)+svg_text(700,184,'ATLAS / 전체 8개 Family',28,anchor='middle')+svg_text(700,215,'한 계열을 선택해도 다른 7개는 같은 지도에 남음',20,anchor='middle')
    b+=arrow(700,236,700,275)+svg_box(260,278,880,95,'#ECEFE3')+svg_text(700,317,'SELECTED FAMILY / 노트와 감각 표현 펼침',25,anchor='middle')+svg_text(700,352,'A 대안: 전체 지도 안에서 깊이를 늘림',19,anchor='middle')
    b+=arrow(700,374,700,411)+svg_box(430,415,540,94)+svg_text(700,453,'SELECTED CONCEPT / 우측 상세 패널',23,anchor='middle')+svg_text(700,490,'의미 · 장면 · 관계 · 관찰 질문',20,anchor='middle')
    b+=arrow(455,509,280,547)+arrow(945,509,1120,547)
    for x,title,desc in [(35,'UNDERSTAND','필요할 때 Accord · Material'),(890,'DEEPER COMPARISON','선택한 개념 안에서 심화 비교')]:
        b+=svg_box(x,552,470,85,'#ECEFE3')+svg_text(x+235,588,title,23,anchor='middle')+svg_text(x+235,620,desc,19,anchor='middle')
    b+=svg_text(700,679,'비교를 닫으면 같은 지도 위치로 복귀 / 시간 변화는 범위에서 제외',18,MUTED,anchor='middle')
    save_svg('sitemap',b)

    b=''
    steps=[(25,'01 OVERVIEW','8계열과 정보 유형'),(302,'02 SELECT','Floral 선택'),(579,'03 EXPLORE','Musk 노트 발견'),(856,'04 COMPARE','Musk 안에서 비교'),(1133,'05 RETURN','같은 위치로 복귀')]
    for x,t,d in steps:
        b+=svg_box(x,100,245,130,LIME if x==302 else '#FBFBF8')+svg_text(x+18,145,t,21,weight=600)+svg_text(x+18,195,d,20)
        if x<1133:b+=arrow(x+246,164,x+270,164)
    b+='<path d="M1255 232V342H417V241" fill="none" stroke="#899978" stroke-width="2" marker-end="url(#a)"/>'
    b+=svg_text(790,332,'다른 계열로도 언제든 이동',20,MUTED,anchor='middle')
    b+=svg_box(205,430,990,150,'#E9EDDF')+svg_text(700,479,'선택하지 않은 7계열 = 맥락',30,anchor='middle')+svg_text(700,530,'세부를 읽는 동안에도 전체 방향과 현재 위치를 유지합니다.',23,anchor='middle')
    b+=svg_text(700,651,'비교는 독립된 첫 입구가 아니라, 궁금한 개념에서 한 단계 더 들어가는 경험입니다.',19,MUTED,anchor='middle')
    save_svg('user-flow',b)

    b=svg_box(30,18,1340,635,'#FCFCFA','#9BA798')+svg_text(58,57,'THE SCENT ATLAS',23,weight=600)+svg_text(1320,57,'Explore / How to read / Our approach',18,anchor='end')
    b+=svg_text(58,108,'A map of the invisible.',31)+svg_text(58,147,'① 짧은 소개 → Family / Note / Descriptor의 차이',18,MUTED)
    b+=svg_box(55,181,935,410,'#ECEEE4')+svg_box(990,181,352,410)+svg_text(80,214,'② 8개 Family / 같은 지도 안의 펼침',19)
    for x,y,n in [(230,271,'Fresh'),(517,255,'Floral'),(790,272,'Floriental'),(873,407,'Ambrée'),(784,540,'Gourmand'),(517,553,'Chypre'),(208,540,'Woody'),(129,407,'Fougère')]:b+=svg_text(x,y,n,20,MUTED,anchor='middle')
    b+=svg_box(429,358,160,64,LIME)+svg_text(509,399,'Woody',28,anchor='middle')
    for x,y,n in [(334,320,'◇ Cedarwood'),(663,320,'◇ Sandalwood'),(365,479,'○ Dry'),(662,479,'○ Creamy')]:b+=svg_box(x-87,y-30,174,44)+svg_text(x,y,n,18,anchor='middle')
    b+=arrow(480,361,366,327)+arrow(551,361,636,327)+arrow(480,422,388,451)+arrow(551,422,638,451)
    b+=svg_text(1012,218,'③ 유형 / 역할',18,MUTED)+svg_text(1012,261,'이름 · 의미 · 장면',23)+svg_box(1008,295,315,66,'#E9EDDF')+svg_text(1023,323,'What to Notice',19)+svg_text(1023,350,'무엇에 주목할까요?',17)
    b+=svg_text(1012,401,'설명이 있는 관계',21)+svg_text(1012,448,'필요할 때 조합과 실제 향료',17)+svg_box(1008,491,315,59,INK)+svg_text(1165,529,'④ 이 개념 안에서 비교 ↗',18,'#F6F5EF',anchor='middle')
    b+=svg_text(60,626,'기호: ● Family / ◇ Note / ○ Descriptor · 위치는 유사도 점수가 아님',16,MUTED)
    save_svg('wireframe-desktop',b)

    b=''
    for x,title,expanded in [(25,'BEFORE / 전체 8계열',False),(725,'AFTER / Woody 선택',True)]:
        b+=svg_box(x,40,650,535,'#FCFCFA','#9BA798')+svg_text(x+25,82,title,26)
        b+=svg_box(x+20,107,610,396,'#ECEEE4')
        for dx,dy,n in [(145,174,'Fresh'),(325,155,'Floral'),(515,174,'Floriental'),(545,308,'Ambrée'),(515,453,'Gourmand'),(325,477,'Chypre'),(145,453,'Woody'),(87,308,'Fougère')]:
            if expanded and n=='Woody':continue
            b+=svg_text(x+dx,dy,n,21,MUTED if expanded else INK,anchor='middle')
        if expanded:
            b+=svg_box(x+250,270,150,65,LIME)+svg_text(x+325,312,'Woody',29,anchor='middle')
            for dx,dy,n in [(220,224,'◇ Cedarwood'),(437,224,'◇ Sandalwood'),(220,395,'○ Dry'),(437,395,'○ Creamy')]:b+=svg_text(x+dx,dy,n,18,anchor='middle')
            b+=arrow(x+296,272,x+237,239)+arrow(x+354,272,x+420,239)+arrow(x+296,337,x+237,373)+arrow(x+354,337,x+420,373)
        b+=svg_text(x+325,544,'큰 방향부터 선택' if not expanded else '다른 7계열은 보조로 남고 관련 개념이 펼쳐짐',20,MUTED,anchor='middle')
    b+=svg_text(700,651,'A 대안: 화면을 별도 세계로 전환하지 않고, 현재 지도에서 깊이를 늘립니다.',21,MUTED,anchor='middle')
    save_svg('wireframe-expansion',b)

    b=svg_box(50,22,1300,640,'#FCFCFA','#97A592')+svg_text(80,68,'ATLAS / FLORAL / MUSK / COMPARE',21,MUTED)+svg_text(1320,68,'지도로 돌아가기 ×',18,anchor='end')
    b+=svg_text(80,122,'Similar doesn’t mean the same.',32)
    for x,name,scene in [(90,'Clean musk','갓 세탁한 천'),(970,'Warm musk','체온이 남은 천')]:
        b+=svg_box(x,176,340,274,'#ECEEE4')+svg_text(x+22,220,name,27)+svg_box(x+22,242,296,95,'#DFE5D6' if x==90 else '#E8D8C9')+svg_text(x+22,384,scene,23)+svg_text(x+22,422,'장면과 관찰 질문',18,MUTED)
    pts='700,184 834,282 783,434 617,434 566,282';b+=f'<polygon points="{pts}" fill="#E9EDDF" stroke="#91A57A"/>'+svg_text(700,313,'5가지 관찰 항목',21,anchor='middle')+svg_text(700,347,'강도 점수 없음',18,MUTED,anchor='middle')
    b+=svg_box(90,492,1220,126,LIME)+svg_text(116,536,'비슷한 인상과 구별할 초점을 함께 읽기',25)+svg_text(116,580,'사례별 항목을 같은 기준으로 비교 / 구체적인 정성적 설명 제공',21)
    save_svg('wireframe-compare',b)

    b=svg_box(25,85,830,465,'#FCFCFA','#97A592')+svg_text(53,126,'WIDE / 전체 구조 + 상세 패널',22)
    b+=svg_box(52,153,522,303,'#ECEEE4')+svg_text(313,276,'8계열의 공간 배치',27,anchor='middle')+svg_text(313,320,'선택한 계열 주변에 펼침',21,anchor='middle')+svg_box(589,153,239,303)+svg_text(708,277,'상세 설명',24,anchor='middle')+svg_text(708,321,'개념 내부 비교',19,anchor='middle')
    b+=svg_box(971,20,330,640,'#FCFCFA','#53654B',22)+svg_text(1136,64,'NARROW / 전체 맥락 유지',17,anchor='middle')
    for y,h,t in [(91,139,'8계열 선택 블록'),(244,122,'펼친 Note·Descriptor'),(381,147,'상세 설명 + 관찰 질문'),(543,82,'이 개념 안에서 비교')]:b+=svg_box(990,y,292,h,LIME if y==543 else '#ECEEE4')+svg_text(1136,y+h/2+7,t,19,anchor='middle')
    b+=arrow(872,309,949,309)+svg_text(430,607,'1050px: 상세 패널 아래로 / 760px: 지도 블록 재구성',21,MUTED,anchor='middle')+svg_text(700,692,'유지: 전체 계열의 접근, 현재 선택, 유형 이름, 관계의 이유',19,MUTED,anchor='middle')
    save_svg('wireframe-responsive',b)

def make_deck(api):
    bind(api)
    s=slide('FRONT-END WEB / WEEK 06','',notes='약 20초. 향의 전체 구조에서 작은 차이로 탐색하는 The Scent Atlas를 소개합니다. 기존의 지도와 비교 화면을 유지하며 8개 계열 중심의 A 대안으로 발전시켰습니다.')
    text(s,80,110,800,300,'The Scent\nAtlas',108,font='Georgia');text(s,85,432,760,70,'Discover how scents connect.',34,font='Georgia',italic=True)
    text(s,85,549,750,145,'전체 향의 구조에서,\n작은 차이와 관계를 발견하는 경험.',33)
    image(s,905,107,620,650,'assets/atlas-woody.png');text(s,85,755,720,40,'A 대안 / 같은 지도 안에서 펼치는 향의 언어',20,MUTED)

    s=slide('01 / THE PROBLEM','단어는 함께 쓰이지만, 같은 정보는 아닙니다.','전체 방향, 구체적인 대상, 느껴지는 방식이 한 문장에 섞입니다.',notes='약 20초. Woody는 나무 향이라고만 설명하면 충분하지 않습니다. 계열, 노트, 표현의 역할과 그 사이의 차이를 이해하는 데 초점을 맞춥니다.')
    for x,k,t,b in [(80,'● FAMILY','Woody','큰 방향은 알지만\n어떤 나무의 인상인지 막연함'),(575,'◇ NOTE','Sandalwood','대상을 알아도\n어떻게 느껴지는지 막연함'),(1070,'○ DESCRIPTOR','Creamy','부드럽다는 말과\n노트 사이의 관계가 막연함')]:card(s,x,284,450,369,k,t,b)
    rect(s,80,704,1440,89,LIME);text(s,112,726,1370,51,'질문: 무엇을 설명하는 단어이며, 어디에 주목하면 구별될까요?',29)

    s=slide('02 / CONCEPT & PREMISE','전체 구조를 남겨둔 채, 깊이 들어갑니다.','8계열 → 계열 선택 → 노트와 특징 → 상세 설명 → 필요한 심화 비교',notes='약 20초. 선택한 계열 주변에서 관련 정보가 펼쳐지되 다른 일곱 계열은 남습니다. 현재 위치와 큰 방향을 잃지 않는 A 대안이 핵심입니다.')
    image(s,90,270,960,478,'assets/wireframe-expansion.png');text(s,1110,290,400,92,'THE A APPROACH',17,MUTED);text(s,1110,363,395,271,'같은 지도 안에서 펼침\n\n다른 7계열은 맥락으로 유지\n\n비교는 선택한 개념 안에서',29)

    s=slide('03 / INTENDED EXPERIENCE','탐색 뒤에는 무엇을 새롭게 읽을까요?',notes='약 20초. 차분한 호기심, 정보 유형의 차이, 공유 특징의 발견, 관계의 이해, 직접 관찰이라는 변화를 목표로 합니다. 학습 효과는 아직 디자인 가설이며 피드백으로 확인합니다.')
    for i,(k,t,b) in enumerate([('FEEL','차분한 호기심','조용한 편집 공간'),('NOTICE','역할의 차이','계열·노트·표현 구분'),('DISCOVER','겹치는 특징','한 노트의 여러 면'),('UNDERSTAND','연결의 의미','동의어나 하위 분류가 아님'),('DO','직접 탐색','선택·연결·비교·복귀')]):
        rect(s,80+i*290,277,265,335,'#ECEFE3',radius=True);text(s,101+i*290,310,225,34,k,17,MUTED);text(s,101+i*290,384,225,60,t,29);text(s,101+i*290,481,225,110,b,22)
    rect(s,80,670,1440,124,LIME);text(s,112,697,1370,85,'“우디는 그냥 나무 향?” → “같은 방향에서도 마른 결과 매끈함을 따로 관찰할 수 있겠다.”',28)

    s=slide('04 / THE KNOWLEDGE MODEL','데이터는 다섯 유형. 화면은 필요한 깊이만.','다섯 가지를 동등한 메뉴나 하나의 카테고리 트리로 만들지 않습니다.',notes='약 25초. 내부에서는 Family, Note, Descriptor, Accord, Material을 구분합니다. 지도는 앞의 세 유형 중심으로, 조합과 실제 향료는 상세에서 필요할 때 읽게 합니다.')
    rows=[('Family','큰 방향','Floral · Woody','지도 시작'),('Note','연상되는 대상','Rose · Musk','선택 후 펼침'),('Descriptor','질감과 인상','Dry · Creamy','관련 특징'),('Accord','조합으로 만드는 인상','Amber Accord','상세에서 공개'),('Material','실제로 구현하는 향료','Rose Absolute · Vanillin','필요할 때 설명')]
    for i,(a,b,c,d) in enumerate(rows):
        y=266+i*102;rect(s,80,y,1440,85,'#ECEFE3' if i<3 else '#F0EEE5');text(s,107,y+22,255,45,a,29,font='Georgia');text(s,378,y+23,335,45,b,25);text(s,730,y+25,490,44,c,24);text(s,1263,y+25,238,44,d,22,MUTED)

    s=slide('05 / ORGANIZING THE INFORMATION','Type과 Facets를 분리합니다.','관련되어도, 같은 종류나 고정된 하위 분류는 아닙니다.',notes='약 25초. Sandalwood의 타입은 노트이고 Creamy, Warm, Dry는 드러날 수 있는 특징입니다. Musk 노트와 Musky 표현도 구분합니다. 여러 계열과 연결되는 다대다 관계입니다.')
    card(s,80,282,670,365,'EXAMPLE 01','◇ Sandalwood','Type: Note\n관련 방향: Woody\n가능한 Facets: Creamy · Warm · Dry')
    card(s,850,282,670,365,'EXAMPLE 02','◇ Musk ≠ ○ Musky','Musk: 연상되는 노트\nMusky: 관련 인상을 설명하는 표현\nClean · Powdery · Warm은 고정 특성이 아님')
    text(s,90,718,1430,74,'관계에는 종류와 이유를 저장합니다. ‘연관된다’는 선 하나로 설명을 대신하지 않습니다.',28)

    s=slide('06 / THE CLASSIFICATION CHOICE','처음 8계열은 하나의 기준으로 조직합니다.','The Perfume Society의 8계열 / 다른 체계는 비교 참고로 구분합니다.',notes='약 20초. Fresh, Floral, Floriental, Ambrée, Gourmand, Chypre, Woody, Fougère를 사용합니다. Michael Edwards의 세부 계열이나 Leather를 섞어 공식 목록처럼 부르지 않습니다. 기준은 제공된 리서치에 기반합니다.')
    familyNames=['Fresh','Floral','Floriental','Ambrée','Gourmand','Chypre','Woody','Fougère']
    for i,name in enumerate(familyNames):
        x=80+(i%4)*365;y=285+(i//4)*160;rect(s,x,y,335,125,'#ECEFE3',radius=True);text(s,x+25,y+35,285,68,name,38,font='Georgia')
    text(s,90,666,1400,134,'Michael Edwards: 다른 세분화와 연속적 휠의 참고\n원칙: 여러 체계를 섞어 하나의 공식 분류처럼 제시하지 않음\n노트·표현의 연결과 공간 배치는 프로젝트의 교육용 설계',24,MUTED)

    s=slide('07 / REFERENCES & INSPIRATION','참고한 형식보다, 설계에 가져온 원칙.',notes='약 20초. 분류 기준, 용례의 편집, 공간 탐색, 직접 조작하는 설명을 서로 다른 근거로 구분합니다. 원문 새 접근의 제한은 출처 문서에 표시합니다.')
    rows=[('The Perfume Society','8계열 기준과 원료·노트 용례','큰 방향과 실제 향료의 역할 구분'),('Michael Edwards','다른 기준의 세부 분류','일관된 기준과 다른 체계의 차이 설명'),('Fragrantica / Scent Verdict','노트·제품·공간 탐색','정의보다 관계를 먼저 읽는 경험'),('Explorable Explanations / 관찰 노트','조작으로 이해하는 설명','선택·펼침·주석에 정보의 역할 부여')]
    for i,(a,b,c) in enumerate(rows):
        y=267+i*120;rect(s,80,y,1440,101,'#ECEFE3' if i%2==0 else '#F0F0E8');text(s,105,y+25,465,57,a,24);text(s,600,y+25,400,57,b,23);text(s,1040,y+25,450,57,c,23)
    text(s,90,787,1400,37,'제공된 업데이트 리서치에 기반한 분석 / 원문 접근 상태와 편집 범위는 부록에서 구분',20,MUTED)

    s=slide('08 / MOOD & VISION BOARD','Quiet. Tactile. Connected. Curious.',notes='약 15초. 선호했던 원래 화면의 분위기를 유지합니다. 소재 질감은 감각을 생각해 볼 비유이며 실제 냄새나 원료의 증거 사진이 아닙니다.')
    image(s,80,247,1040,535,'assets/moodboard.png');text(s,1170,283,355,358,'종이 위의 관찰\n\n가느다란 관계선\n\n질감의 대비\n\n조용한 발견',29);text(s,1170,730,355,70,'기존 자체 생성 소재 보드.\n실제 향료 사진이나 측정값 아님.',18,MUTED)

    s=slide('09 / VISUAL LANGUAGE','기존 지도와 비교 화면의 목소리를 유지합니다.',notes='약 20초. 종이색, 깊은 초록, 연두 선택, 세리프, 우측 패널을 유지합니다. 정보 종류는 기호와 이름으로 구분하고 움직임은 관심의 이동을 알려줍니다.')
    for i,(name,color) in enumerate([('PAPER','#F6F5EF'),('PINE','#263D32'),('SELECT','#DEF19F'),('COMPARE B','#BC8653')]):
        rect(s,80+i*365,260,335,130,color,LINE);text(s,85+i*365,412,330,40,name+' / '+color,19,MUTED)
    text(s,85,494,735,180,'A map of\nthe invisible.',61,font='Georgia',italic=True);text(s,90,699,710,84,'Georgia serif / DM Sans + 한국어 sans\n본문과 선택 표시의 대비를 유지',23,MUTED)
    rect(s,890,485,630,298,'#ECEFE3',radius=True);text(s,919,517,575,55,'● Family    ◇ Note    ○ Descriptor',28);text(s,920,598,565,150,'연두: 현재 관심 / 약화: 남아 있는 맥락\n질감 이미지 + 장면 + What to Notice\n펼침·이동의 목적: 현재 위치와 관계를 읽기',23)

    s=slide('10 / SITEMAP','전체에서 세부로, 정보의 깊이를 늘립니다.',notes='약 15초. Home의 짧은 설명 뒤에 전체 지도, 계열 펼침, 개념 상세가 이어집니다. Accord와 Material은 상세 안에서, 비교도 개념 안에서 엽니다. 시간 변화는 제외했습니다.')
    image(s,120,228,1360,603,'assets/sitemap.png')

    s=slide('11 / USER FLOW','세부로 가도, 전체 위치를 잃지 않습니다.',notes='약 15초. Floral을 선택해 Musk를 읽고 그 안에서 비교한 뒤 같은 위치로 돌아갑니다. 다른 계열로도 자유롭게 이동할 수 있고 복귀 시 선택 상태를 보존합니다.')
    image(s,110,250,1380,570,'assets/user-flow.png')

    s=slide('12 / WIREFRAMES','소개는 간결하게. 지도는 중심에.',notes='약 20초. 짧은 소개와 세 정보 유형의 차이 아래에 큰 지도를 둡니다. 우측 패널은 의미, 장면, 관찰 질문, 관계를 연결하고 필요할 때 전문 정보를 더 읽게 합니다.')
    image(s,110,247,1380,565,'assets/wireframe-desktop.png')

    s=slide('13 / THE ATLAS IN ACTION','Woody를 선택하면, 같은 지도 안에서 펼쳐집니다.','수정된 실제 웹사이트 캡처 / 다른 7계열은 남아 있습니다.',notes='약 40초. 지도에서 Woody를 선택해 Cedarwood와 Sandalwood, Dry와 Creamy를 읽어봅니다. 노트와 표현을 한 단계의 분류로 합치지 않고 관계로 연결합니다.')
    image(s,80,270,1030,525,'assets/atlas-woody.png');text(s,1160,292,355,343,'01 전체 8계열\n\n02 선택한 계열 강조\n\n03 관련 노트·표현 펼침\n\n04 설명이 있는 관계',26)

    s=slide('14 / DEEPER COMPARISON','Musk 안에서 더 궁금해질 때 비교합니다.','비교를 닫으면 같은 지도 위치로 돌아옵니다.',notes='약 30초. 원래 두 인상 카드와 오각형의 분위기를 유지합니다. 다만 강도 점수는 제거하고 머스크 비교에 맞는 다섯 항목과 설명을 제공합니다. 큰 메뉴와 동등한 입구보다 개념 안의 심화 경험입니다.')
    image(s,80,263,1150,535,'assets/compare-musk.png');text(s,1270,300,250,380,'두 인상 카드\n\n사례별 관찰 항목\n\n임의의 점수 없음\n\n구체적인 질문\n\n지도 상태 보존',23)

    s=slide('15 / RESPONSIVE INTENTIONS','공간 관계를 읽는 순서로 바꿉니다.',notes='약 20초. 중간 폭에서는 설명을 아래로, 좁은 화면에서는 전체 계열과 펼친 개념을 블록으로 나눕니다. 다른 계열의 접근, 유형, 관계 설명과 선택 상태는 유지됩니다.')
    image(s,110,247,1380,552,'assets/wireframe-responsive.png');text(s,120,812,1350,34,'키보드·터치·초점 복원 · 움직임 감소 설정 · hover에 필수 정보를 숨기지 않음',20,MUTED)

    s=slide('APPENDIX A / DESIGN PROCESS','분류와 조직화의 선택을 설명합니다.',notes='발견한 문제, 설계 결정, 기대 효과를 연결합니다. 기대 효과는 검증된 결과가 아니라 발표 피드백으로 확인할 디자인 가설입니다.')
    rows=[('분류 체계가 여러 개','8계열 기준을 선택하고 다른 체계는 구분','일관된 탐색'),('정보 역할이 섞임','다섯 데이터 타입과 화면 구조 분리','혼동 감소'),('한 단어의 특징이 겹침','Type과 Facets를 분리해 다대다 연결','복합적인 인상 표현'),('처음부터 전문 정보가 많음','Accord·Material을 단계적으로 공개','탐색 부담 감소'),('세부에서 현재 위치를 잃음','A 대안으로 다른 7계열 유지','맥락 유지')]
    for i,(a,b,c) in enumerate(rows):
        y=245+i*107;rect(s,80,y,1440,90,'#ECEFE3' if i%2==0 else '#F0F0E8');text(s,104,y+22,425,50,a,24);text(s,560,y+22,640,50,b,24);text(s,1240,y+23,253,50,c,23,MUTED)

    s=slide('APPENDIX B / IMPLEMENTATION & FIELD NOTES','기능의 검증과 이해의 검증을 구분합니다.',notes='수정된 사이트의 실제 브라우저 테스트는 15개입니다. 8계열과 모든 펼침, 내부 비교, 키보드, 움직임 감소를 확인했습니다. 768px의 작은 겹침을 측정하고 수정했습니다. 학습 효과와 콘텐츠는 다음 사용자·전문가 검토가 필요합니다.')
    card(s,80,278,450,420,'PREPARED','8계열 · 5유형','42개 콘텐츠 예시\n94개 설명이 있는 관계\nType / Facets 분리\nAccord·Material은 상세에서')
    card(s,575,278,450,420,'VERIFIED','브라우저 테스트 15개','전체와 모든 계열의 펼침\n개념 내부 비교와 상태 복귀\n320–1440px 레이아웃\n키보드와 움직임 감소')
    card(s,1070,278,450,420,'NEXT TO CHECK','사용자의 이해 변화','유형의 차이를 설명하는가?\n전체 위치를 유지하는가?\n다음 시향의 질문을 갖는가?\n전문가가 용례를 검토')
    text(s,90,745,1400,66,'범위 제외: 시간 변화 · 실제 조향 예측 · 자동 계열 판정 · 제품 추천 · 근거 없는 유사도 점수',23,MUTED)

    s=slide('APPENDIX C / SOURCES','기준, 편집, 시각 자료의 근거를 구분합니다.',notes='Family 기준은 사용자 제공 업데이트 리서치에서 채택했습니다. 원문 접근은 프록시 403으로 제한되어 직접 검증을 마친 것처럼 표시하지 않습니다. 관계는 편집 초안이고 화면은 실제 캡처입니다.')
    for i,(label,url) in enumerate([('The Perfume Society · Fragrance Families','https://perfumesociety.org/discover-perfume/an-introduction/fragrance-families/'),('Michael Edwards · Fragrances of the World','https://www.fragrancesoftheworld.com/'),('The Perfume Society · Ingredients','https://perfumesociety.org/ingredients/'),('Fragrantica · Perfume Finder','https://www.fragrantica.com/perfume-finder/'),('Scent Verdict · Scent Wheel','https://scentverdict.com/guides/scentwheel')]):text(s,90,258+i*75,1400,56,label+' ↗',25,href=url)
    rect(s,80,668,1440,145,'#E9EDDF');text(s,110,690,1370,104,'원문 새 접근: 프록시 403으로 제한 / 제공된 리서치와 편집 용례의 검토 상태를 표시\n실제 화면 캡처와 배치도 구분 / 무드보드는 자체 생성한 감각 비유\n거리·크기·색은 측정된 향의 강도나 유사도가 아닙니다.',23)

    s=slide('APPENDIX D / FEEDBACK','탐색 뒤, 어디에 주목할지 말할 수 있나요?',notes='사용자에게 역할의 차이, 공유 특징, 현재 위치, 다음 관찰 질문을 물어보겠습니다. 이것이 프로젝트가 해결하려는 이해의 문제와 연결되는 피드백입니다.')
    questions=['Family · Note · Descriptor는 무엇이 다른가요?','Sandalwood가 Creamy의 하위 항목인가요?','Musk와 Musky는 어떤 관계인가요?','세부를 읽으며 다른 계열로 이동하기 쉬웠나요?']
    for i,q in enumerate(questions):text(s,90,267+i*106,85,52,str(i+1).zfill(2),31,MUTED,font='Georgia');text(s,204,267+i*106,1300,66,q,30)
    rect(s,80,722,1440,88,LIME);text(s,113,746,1360,47,'최종 목표: 전체 구조를 이해하고, 작은 차이를 관찰할 기준을 얻는 것.',29)

    s=slide('APPENDIX E / REQUIREMENTS','요구사항과 제출 자료를 연결했습니다.',notes='요구사항 아홉 항목을 발표와 상세 기획 글에 대응시켰습니다. 1–16장을 본 발표에, 17–21장을 부록에 사용하며 약 5–6분으로 진행할 수 있습니다.')
    rows=[('Concept / Premise','3장 / PROJECT-PROPOSAL.md'),('Intended Experience','4장 / Feel · Notice · Discover · Understand · Do'),('References / Inspiration','8장·19장 / REFERENCE-NOTES.md'),('Mood / Vision Board','9장 / assets/moodboard.png'),('Visual Language','10장 / 기존 화면의 색상·서체·기호·강조'),('Sitemap','11장 / assets/sitemap.svg'),('User Flow','12장 / assets/user-flow.svg'),('Wireframes','13장 / wireframe-desktop·expansion·compare'),('Responsive Intentions','16장 / wireframe-responsive.svg')]
    for i,(a,b) in enumerate(rows):
        y=244+i*62;rect(s,80,y,1440,53,'#ECEFE3' if i%2==0 else '#F0F0E8');text(s,102,y+10,535,36,a,22);text(s,670,y+10,820,36,b,21,MUTED)
