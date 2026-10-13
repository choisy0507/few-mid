import { concepts as previous, relations as previousRelations } from '../src/data.js';

// Primary selections are the user's curated educational dataset, not an official list.
export const primary = [
  ['fresh','Fresh','프레시','#C8DDE2','상쾌한 방향','Bergamot|Lemon|Grapefruit|Rosemary|Violet Leaf|Sea Breeze Accord','Fresh|Bright|Green|Airy|Watery'],
  ['floral','Floral','플로럴','#C98688','꽃을 중심으로','Rose|Jasmine|Peony|Iris|Tuberose|Violet','Floral|Soft|Powdery|Green|Creamy'],
  ['floriental','Floriental','플로리엔탈','#D98B78','꽃과 따뜻함의 만남','Orange Blossom|Jasmine|Rose|Tuberose|Vanilla|Cinnamon','Floral|Warm|Spicy|Sweet|Rich'],
  ['ambree','Ambrée','앰브레','#C89A62','레진과 온기의 깊이','Vanilla|Benzoin|Labdanum|Frankincense|Tonka Bean|Cinnamon','Warm|Resinous|Sweet|Balsamic|Rich'],
  ['gourmand','Gourmand','구르망','#D9C7B8','먹을거리를 떠올리다','Vanilla|Caramel|Coffee|Chocolate|Almond|Milk Accord','Sweet|Creamy|Roasted|Nutty|Rich'],
  ['chypre','Chypre','시프레','#B9BBA9','밝음과 숲바닥의 대비','Bergamot|Oakmoss|Patchouli|Labdanum|Rose|Jasmine','Mossy|Earthy|Dry|Woody|Warm'],
  ['woody','Woody','우디','#C8B19D','나무의 여러 질감','Sandalwood|Cedarwood|Vetiver|Patchouli|Oud|Guaiac Wood','Woody|Dry|Earthy|Creamy|Smoky'],
  ['fougere','Fougère','푸제르','#BFCABB','허브와 이끼의 구조','Lavender|Geranium|Oakmoss|Bergamot|Rosemary|Tonka Bean','Aromatic|Green|Fresh|Mossy|Herbal'],
];
const slug = s => s.toLowerCase().replace(/ /g,'-');
export const canonical = (type,name) => `${type}:${slug(name)}`;
const noteCopy = {
  Bergamot:['밝고 쌉쌀한 시트러스','껍질을 비볐을 때의 산뜻함과 약간의 쓴 느낌을 떠올려보세요.'],
  Lemon:['날카롭고 선명한 시트러스','레몬 껍질을 막 벗긴 순간처럼 또렷한 상쾌함을 설명하는 노트입니다.'],
  Grapefruit:['상쾌함 옆의 쌉쌀함','자몽 껍질의 밝음과 쓴 느낌이 함께 떠오를 수 있습니다.'],
  Rosemary:['허브의 시원한 결','로즈메리 잎을 손끝으로 비볐을 때의 허브 인상을 떠올리는 노트입니다.'],
  'Violet Leaf':['꽃보다 초록 잎의 인상','제비꽃의 꽃 향과 구분되는, 잎의 풋풋함을 설명하는 노트입니다.'],
  'Sea Breeze Accord':['바다와 젖은 공기의 연상','바닷바람 같은 인상을 여러 향료로 구성한 노트입니다. 실제 바닷물을 뜻하지 않습니다.'],
  Rose:['꽃잎, 초록 줄기, 때로는 단맛','장미를 떠올리는 노트입니다. 구성에 따라 풋풋함이나 풍성함이 다르게 드러납니다.'],
  Jasmine:['흰 꽃의 밝고 풍성한 면','재스민을 떠올리는 노트입니다. 가벼운 꽃잎부터 짙은 인상까지 표현이 다양합니다.'],
  Peony:['가볍게 펼쳐지는 꽃잎','작약을 연상시키는 꽃의 인상입니다. 이 이름이 실제 작약 추출물의 사용을 보장하지는 않습니다.'],
  Iris:['꽃의 이름, 보송한 인상','아이리스 노트는 보송함과 마른 뿌리 같은 면으로 설명되기도 합니다. Orris 유래 원료와는 구분합니다.'],
  Tuberose:['두툼하고 풍성한 흰 꽃','튜베로즈를 떠올리는 노트입니다. 크리미하거나 풍성한 면이 드러나는 표현도 있습니다.'],
  Violet:['부드러운 꽃과 보송함','바이올렛 꽃의 인상입니다. 초록 잎을 떠올리는 Violet Leaf 노트와 구분합니다.'],
  'Orange Blossom':['꽃잎 옆의 산뜻함','오렌지 꽃을 연상시키는 노트입니다. 과일의 껍질 향과 같은 것은 아닙니다.'],
  Vanilla:['달콤함과 온기를 떠올리는 대상','바닐라를 연상시키는 노트입니다. 모든 바닐라 표현이 디저트처럼 느껴지는 것은 아닙니다.'],
  Cinnamon:['따뜻하고 선명한 스파이스','계피를 떠올리는 노트입니다. 단맛과 온기가 함께 연상될 수 있습니다.'],
  Benzoin:['달콤하고 부드러운 레진','벤조인 레진을 연상시키는 노트입니다. 향의 인상과 실제 레진 원료를 구분해 읽습니다.'],
  Labdanum:['깊고 따뜻한 레진의 면','라브다넘을 연상시키는 노트입니다. 앰버와 전통적인 시프레 구조를 설명할 때 살펴볼 수 있습니다.'],
  Frankincense:['맑고 깊은 레진의 인상','유향 레진과 관련된 구체적인 노트입니다. 더 넓은 Incense 인상 전체와 같은 뜻은 아닙니다.'],
  'Tonka Bean':['달콤한 건초를 떠올리다','통카빈을 연상시키는 노트입니다. 관련 향료 분자인 Coumarin 자체와는 다릅니다.'],
  Caramel:['설탕을 가열한 듯한 인상','캐러멜을 연상시키는 노트입니다. 실제 설탕을 향료로 넣는다는 뜻은 아닙니다.'],
  Coffee:['볶은 향과 쌉쌀함','커피를 연상시키는 노트입니다. Gourmand가 언제나 달콤하기만 한 계열은 아님을 보여줍니다.'],
  Chocolate:['코코아와 부드러운 단맛','초콜릿을 연상시키는 노트입니다. 달콤함과 볶은 느낌은 구성에 따라 달라집니다.'],
  Almond:['고소함과 마지팬의 연상','아몬드를 떠올리는 노트입니다. 견과류나 마지팬 같은 표현을 읽는 단서가 됩니다.'],
  'Milk Accord':['우유 같은 둥근 인상','유제품 같은 느낌을 구성한 노트입니다. 실제 우유나 모든 Creamy 표현을 뜻하지 않습니다.'],
  Oakmoss:['이끼와 그늘진 숲바닥','오크모스를 떠올리는 노트입니다. 전통적인 Chypre와 Fougère 구조의 설명 요소입니다.'],
  Patchouli:['흙, 잎, 우디한 배경','패출리를 떠올리는 노트입니다. 실제 목재가 아니어도 우디한 인상을 설명할 수 있습니다.'],
  Sandalwood:['둥글고 부드러운 나무의 결','샌들우드를 떠올리는 노트입니다. 따뜻하고 크리미한 면으로 묘사되는 표현도 있습니다.'],
  Cedarwood:['연필을 깎을 때의 마른 결','시더우드를 떠올리는 노트입니다. 또렷한 목재의 결에 주목해보세요.'],
  Vetiver:['뿌리와 흙, 마른 목질감','베티버를 떠올리는 노트입니다. 뿌리나 풀의 인상과 우디함이 함께 묘사될 수 있습니다.'],
  Oud:['짙은 목재의 다양한 표정','침향을 연상시키는 노트입니다. 원료와 재구성에 따라 스모키함이나 깊이가 달라집니다.'],
  'Guaiac Wood':['따뜻하고 스모키한 목재','과이악 우드를 연상시키는 노트입니다. 나무의 인상 안에서도 연기 같은 면을 읽을 수 있습니다.'],
  Lavender:['꽃이면서 허브처럼','라벤더를 연상시키는 노트입니다. 허브의 산뜻함과 꽃의 인상이 함께 묘사될 수 있습니다.'],
  Geranium:['꽃과 초록 잎의 연결','제라늄을 연상시키는 노트입니다. 꽃과 허브, 초록 잎의 여러 인상을 연결해 읽습니다.'],
};
const descriptorCopy = {
  Fresh:['산뜻하고 상쾌하게','느껴지는 산뜻함을 설명합니다. Fresh 계열의 분류와는 역할이 다릅니다.'],
  Bright:['선명하게 드러나는 인상','밝고 또렷하게 느껴지는 면을 설명하는 비유입니다. 실제 빛이나 강도 점수는 아닙니다.'],
  Green:['잎이나 줄기처럼 풋풋하게','초록 잎과 줄기를 떠올리는 인상입니다. 특정 식물 노트 하나의 이름은 아닙니다.'],
  Airy:['가볍고 공간감 있게','공기가 통하는 듯 가볍게 느껴지는 인상의 비유입니다. 지속력을 측정한 표현은 아닙니다.'],
  Watery:['물처럼 투명하고 젖은 듯','물의 맑음과 젖은 느낌을 빗댄 표현입니다. 물 자체가 강한 향을 낸다는 뜻은 아닙니다.'],
  Floral:['꽃을 떠올리게 하는 면','특정 노트에서 꽃 같은 인상을 읽는 표현입니다. Floral 계열과 별도의 개념으로 관리합니다.'],
  Soft:['모서리가 부드럽게 느껴지는','거칠거나 날카롭기보다 부드럽게 읽히는 인상입니다. Powdery나 Creamy와 함께 쓰일 수 있습니다.'],
  Powdery:['고운 가루처럼 보송하게','피부에 얇게 닿은 화장품 파우더처럼 부드럽고 마른 질감의 비유입니다.'],
  Creamy:['가루보다 매끈하고 둥글게','크림처럼 부드럽게 이어지는 질감의 비유입니다. 반드시 우유 냄새나 단맛을 뜻하지 않습니다.'],
  Warm:['온기가 느껴지는 듯','체온이나 따뜻한 빛을 떠올리는 감각적 비유입니다. 실제 온도나 관능성의 측정값은 아닙니다.'],
  Spicy:['스파이스가 떠오르는 면','향신료를 떠올리는 특징입니다. Cinnamon 같은 구체적인 노트와 구분합니다.'],
  Sweet:['단맛이 떠오르는 듯','달콤하게 느껴지는 인상입니다. Sweet하다고 모두 Gourmand인 것은 아닙니다.'],
  Rich:['풍성하고 여러 겹으로','가볍기보다 풍성하게 읽히는 인상입니다. Warm과 동의어이거나 객관적인 농도 수치는 아닙니다.'],
  Resinous:['레진을 연상시키는 면','수지나 레진의 인상을 설명합니다. Benzoin이나 Labdanum 같은 구체적인 노트와 연결해 읽습니다.'],
  Balsamic:['따뜻하고 부드럽게 감싸는','레진·발삼을 떠올리는 따뜻하고 둥근 면의 표현입니다. Resinous와 겹칠 수 있어도 초점이 다릅니다.'],
  Roasted:['볶거나 구운 듯한','가열해 볶은 커피나 코코아를 떠올리는 인상입니다. 반드시 단맛을 뜻하지 않습니다.'],
  Nutty:['견과류처럼 고소한','견과류를 떠올리는 고소한 면을 설명합니다. Almond는 대상, Nutty는 그 특징입니다.'],
  Mossy:['이끼와 그늘이 떠오르는','이끼 같은 인상을 설명합니다. Oakmoss 노트나 Chypre 계열 자체와 같지는 않습니다.'],
  Earthy:['흙과 땅 가까운 인상','흙이나 뿌리를 떠올리는 면입니다. 여러 노트와 계열에 나타날 수 있습니다.'],
  Dry:['단맛보다 마른 결에 주목','마른 나무나 질감을 떠올리는 표현입니다. 향의 수분 함량을 뜻하지 않습니다.'],
  Woody:['목재를 떠올리게 하는 면','나무 같은 특징을 설명하는 표현입니다. Woody 계열과는 별도의 역할입니다.'],
  Smoky:['연기가 떠오르는 면','연기 같은 인상을 묘사합니다. 실제 연기나 Incense 노트가 반드시 있다는 뜻은 아닙니다.'],
  Aromatic:['허브의 선명한 인상','향수 용어에서는 허브 같은 성격을 읽는 표현으로 쓰입니다. 단순히 향이 난다는 뜻과 구분합니다.'],
  Herbal:['허브 잎이 떠오르는 듯','허브를 구체적으로 떠올리는 면입니다. Aromatic과 겹치지만 잎과 식물의 연상에 주목합니다.'],
};
const noteFacets = {
  Bergamot:'Fresh|Bright|Green', Lemon:'Fresh|Bright', Grapefruit:'Fresh|Bright', Rosemary:'Aromatic|Herbal|Green',
  'Violet Leaf':'Green|Fresh', 'Sea Breeze Accord':'Watery|Airy|Fresh', Rose:'Floral|Green|Sweet', Jasmine:'Floral|Sweet|Rich',
  Peony:'Floral|Soft|Fresh', Iris:'Powdery|Earthy|Soft', Tuberose:'Floral|Creamy|Rich', Violet:'Floral|Powdery|Soft',
  'Orange Blossom':'Floral|Fresh|Warm', Vanilla:'Sweet|Warm|Creamy', Cinnamon:'Spicy|Warm|Sweet', Benzoin:'Resinous|Balsamic|Sweet',
  Labdanum:'Resinous|Warm|Rich', Frankincense:'Resinous|Dry', 'Tonka Bean':'Sweet|Warm', Caramel:'Sweet|Warm', Coffee:'Roasted|Dry',
  Chocolate:'Sweet|Roasted', Almond:'Nutty|Sweet', 'Milk Accord':'Creamy|Soft', Oakmoss:'Mossy|Earthy|Dry', Patchouli:'Earthy|Woody|Dry',
  Sandalwood:'Woody|Creamy|Warm|Dry', Cedarwood:'Woody|Dry', Vetiver:'Woody|Earthy|Dry|Green', Oud:'Woody|Smoky|Rich',
  'Guaiac Wood':'Woody|Smoky|Warm', Lavender:'Aromatic|Herbal|Fresh|Green', Geranium:'Floral|Green|Aromatic',
  Musk:'Clean|Powdery|Warm|Musky', Incense:'Smoky|Warm|Dry',
};
const specificImages = {Sandalwood:'wood',Cedarwood:'wood',Vanilla:'vanilla',Powdery:'powder',Creamy:'cream',Woody:'wood',Watery:'hero',Fresh:'hero'};
export const concepts = previous.map(c=>({...c,id:canonical(c.type,c.name),legacyId:c.id,description:c.description||'',phrase:c.phrase||'',imageKey:null}));
function upsert(type,name,definition,description) {
  const id=canonical(type,name); let c=concepts.find(c=>c.id===id);
  if (!c) {c={id,name,type};concepts.push(c);}
  Object.assign(c,{phrase:definition,description,imageKey:specificImages[name]||null,primary:type==='note'?name in noteCopy:type==='descriptor'?name in descriptorCopy:true,provenance:'user-curated-guidelines'});
  return c;
}
for (const [name,[phrase,description]] of Object.entries(noteCopy)) upsert('note',name,phrase,description);
for (const [name,[phrase,description]] of Object.entries(descriptorCopy)) upsert('descriptor',name,phrase,description);
export const families=primary.map(([key,name,ko,color,phrase,notes,descriptors])=>{
 const c=upsert('family',name,phrase,previous.find(c=>c.id===key).description);
 Object.assign(c,{key,ko,color,notes:notes.split('|').map(n=>canonical('note',n)),descriptors:descriptors.split('|').map(n=>canonical('descriptor',n))});
 return c;
});
const legacyId=new Map(previous.map(c=>[c.id,canonical(c.type,c.name)]));
export const relations=previousRelations.map(e=>({...e,fromId:legacyId.get(e.fromId),toId:legacyId.get(e.toId),prominence:'secondary',status:'editorial',sourceUrl:null,source:'previous-editorial-content'}));
export const get=id=>concepts.find(c=>c.id===id);
export const family=key=>families.find(f=>f.key===key);
const reasons={
  fresh:['시트러스의 밝음을 읽는 노트입니다.','또렷한 시트러스의 상쾌함을 읽는 노트입니다.','시트러스의 산뜻함과 쌉쌀함을 함께 읽습니다.','허브가 만드는 아로마틱한 신선함을 읽습니다.','잎사귀의 풋풋한 인상을 읽습니다.','바다와 공기의 인상을 구성한 노트입니다.'],
  floral:['꽃 중심의 방향을 장미라는 구체적인 노트로 읽습니다.','흰 꽃의 풍성한 인상을 읽습니다.','가볍고 산뜻한 꽃의 인상을 읽습니다.','꽃 중심의 방향 안에서 보송한 면을 읽습니다.','풍성한 흰 꽃과 크리미한 면을 읽습니다.','꽃의 인상 안에서 부드럽고 보송한 면을 읽습니다.'],
  floriental:['꽃과 따뜻한 인상을 연결해 읽습니다.','따뜻한 배경 위의 풍성한 꽃을 읽습니다.','꽃의 특징과 스파이스·우디 배경의 조합을 읽습니다.','풍성한 꽃이 따뜻한 배경과 만나는 면을 읽습니다.','꽃의 인상에 더해지는 따뜻함과 단맛을 읽습니다.','꽃과 어우러지는 따뜻한 스파이스를 읽습니다.'],
  ambree:['레진·발삼과 함께 만드는 따뜻한 앰버 인상을 읽습니다.','달콤하고 발삼 같은 레진의 면을 읽습니다.','앰버 인상과 관련된 깊은 레진의 면을 읽습니다.','구체적인 유향 레진의 인상을 읽습니다.','따뜻함과 달콤한 건초의 인상을 읽습니다.','따뜻한 스파이스의 면을 읽습니다.'],
  gourmand:['디저트와 먹을거리를 떠올리게 하는 면을 읽습니다.','캐러멜화된 설탕의 연상을 읽습니다.','볶은 커피의 쌉쌀함을 읽습니다. 달콤함만으로 이 계열을 정의하지 않습니다.','코코아와 초콜릿의 먹을거리 연상을 읽습니다.','견과류·마지팬의 연상을 읽습니다.','유제품 같은 인상을 구성한 노트로 읽습니다.'],
  chypre:['전통적인 구조의 밝은 시트러스 측면을 읽습니다.','전통적인 구조에서 이끼의 인상을 읽습니다.','흙과 우디한 배경을 읽습니다.','전통적인 구조의 깊고 레진감 있는 면을 읽습니다.','Floral Chypre 같은 꽃 중심 변형을 설명하는 예입니다. 필수 구성은 아닙니다.','Floral Chypre 같은 꽃 중심 변형을 설명하는 예입니다. 필수 구성은 아닙니다.'],
  woody:['같은 나무의 방향에서도 둥글고 부드러운 결을 읽습니다.','나무의 방향 안에서 마르고 또렷한 결을 읽습니다.','뿌리·흙의 인상과 우디함을 함께 읽습니다.','실제 목재가 아닌 잎에서도 우디한 특징을 읽습니다.','짙은 목재의 다양한 표현을 읽습니다.','목재의 인상 안에서 따뜻하고 스모키한 면을 읽습니다.'],
  fougere:['전통적인 푸제르 구조의 아로마틱한 중심을 읽습니다.','꽃·그린·아로마틱한 인상의 연결을 읽습니다.','전통적인 구조의 이끼 인상을 읽습니다.','밝은 시트러스 측면을 읽습니다.','허브의 아로마틱한 면을 읽습니다.','달콤한 건초의 인상으로 Coumarin의 관련 성격을 설명하는 예입니다. 두 개념은 같지 않습니다.'],
};
function relation(fromId,toId,kind,explanation,prominence='primary',status='contextual') {
 const existing=relations.find(e=>e.fromId===fromId && e.toId===toId);
 const value={fromId,toId,kind,explanation,contextExplanation:explanation,prominence,status,source:'user-curated-guidelines',sourceUrl:null};
 if(existing)Object.assign(existing,value);else relations.push(value);
}
for(const f of families){
 f.notes.forEach((id,i)=>relation(f.id,id,'representative_note',reasons[f.key][i]));
 f.descriptors.forEach(id=>relation(f.id,id,'possible_character',`${f.name}의 일부 표현에서 ${get(id).name}한 면을 읽을 수 있습니다. 모든 노트에 적용되는 특징은 아닙니다.`));
}
for(const [name,list] of Object.entries(noteFacets)) {
 const c=get(canonical('note',name));
 c.facets=list.split('|').map(n=>canonical('descriptor',n));
 for(const id of c.facets)relation(c.id,id,'has_facet',`${name}의 ${get(id).name}한 면을 읽는 교육용 설명 사례입니다. 구성에 따라 달라집니다.`,'secondary','editorial');
}
for(const name of ['Sea Breeze Accord','Milk Accord'])get(canonical('note',name)).construction='constructed_accord';
concepts.push({id:'material:orris-butter',name:'Orris Butter',type:'material',phrase:'아이리스 뿌리줄기 유래 향료',description:'Iris 노트의 표현에 관련될 수 있는 실제 원료입니다. 노트 표기만으로 원료 사용을 확정할 수 없습니다.'});
relation(canonical('note','Iris'),'material:orris-butter','realized_by','아이리스 노트와 뿌리줄기 유래 원료를 구분합니다.','secondary','editorial');
export const facets=id=>get(id)?.facets || [];
export const relatedFamilies=id=>families.filter(f=>relations.some(e=>e.fromId===f.id&&e.toId===id));
export const contextFor=(key,id)=>relations.find(e=>e.fromId===family(key)?.id && e.toId===id)?.contextExplanation||relations.find(e=>e.fromId===family(key)?.id && e.toId===id)?.explanation;
export const advanced=id=>relations.filter(e=>e.fromId===id&&['accord','material'].includes(get(e.toId)?.type)).map(e=>get(e.toId));
export const comparisons={
 wood:{title:'Two kinds of woody.',subtitle:'같은 나무의 방향, 다른 결.',a:canonical('note','Cedarwood'),b:canonical('note','Sandalwood'),aImage:'wood',bImage:'cream',aTitle:'마르고 또렷한 결',bTitle:'둥글고 부드러운 결',summary:'나무의 이름보다 질감에 주목하세요.',traits:[['질감','마른 나무 부스러기 같은 면','부드럽고 크리미하게 이어지는 면'],['연상 장면','연필을 새로 깎은 순간','매끈한 나무 표면을 손으로 쓸 때'],['구별하는 질문','결이 또렷하고 마른가요?','결이 둥글게 감싸지는가요?']]},
 clean:{title:'Soft, in different ways.',subtitle:'비슷한 깨끗함에도 설명의 초점은 달라요.',a:canonical('descriptor','Soapy'),b:canonical('descriptor','Powdery'),aImage:'hero',bImage:'powder',aTitle:'비누를 떠올리는 기억',bTitle:'가루처럼 보송한 질감',summary:'Soapy는 비누의 연상, Powdery는 가루 같은 질감.',traits:[['초점','어떤 냄새가 떠오르는가','어떤 질감으로 느껴지는가'],['연상 장면','손을 씻은 뒤 남은 비누의 인상','퍼프로 가볍게 두드린 고운 파우더'],['겹칠 수 있는 면','깨끗하거나 부드럽게 느껴질 수 있음','깨끗하거나 부드럽게 느껴질 수 있음']]},
 musk:{title:'Musk has more than one mood.',subtitle:'깨끗한 천부터 체온이 남은 피부까지.',a:canonical('note','Musk'),b:canonical('note','Musk'),aName:'Clean musk',bName:'Warm musk',aImage:'powder',bImage:'cream',aTitle:'세탁한 천의 연상',bTitle:'피부의 온기라는 비유',summary:'Musk라는 하나의 이름이 한 가지 인상을 고정하지 않아요.',traits:[['연상 장면','바람에 말린 면 셔츠','체온이 남은 부드러운 셔츠'],['읽는 특징','Clean·Powdery한 면의 설명 사례','Warm·Musky한 면의 설명 사례'],['주의할 점','모든 머스크가 깨끗한 것은 아님','온기는 실제 온도나 관능성의 점수가 아님']]},
 dry:{title:'Same family. Different touch.',subtitle:'Dry woody와 Creamy woody를 구별해보세요.',a:canonical('descriptor','Dry'),b:canonical('descriptor','Creamy'),aName:'Dry woody',bName:'Creamy woody',aImage:'wood',bImage:'cream',aTitle:'마른 결에 주목',bTitle:'매끈한 연결감에 주목',summary:'Woody는 방향이고, Dry와 Creamy는 읽는 질감입니다.',traits:[['질감','단맛보다 마른 목질감에 주목','둥글고 부드러운 연결감에 주목'],['단서','연필 부스러기 같은 또렷한 결','크림처럼 부드럽게 펼쳐지는 느낌'],['관계','항상 Creamy와 배타적인 것은 아님','반드시 달거나 우유 냄새인 것은 아님']]},
};
export function comparisonFor(id){const name=get(id)?.name;return ['Sandalwood','Cedarwood'].includes(name)?'wood':['Soapy','Powdery','Iris'].includes(name)?'clean':['Musk','Musky','Clean'].includes(name)?'musk':['Woody','Dry','Creamy'].includes(name)?'dry':null;}
