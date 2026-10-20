// Notes and descriptors can be associated with more than one family.
// These relationships are curated examples, not measured similarity scores.
window.ScentData = {
  families: {
    fresh: { name:'Fresh', number:'01', color:'#C8DDE2', summary:'Bright, airy, and invigorating impressions.', scene:'The cool clarity of a freshly opened window, citrus peel, and a little green air.', notes:['Bergamot','Lemon','Mint','Neroli'], descriptors:['Crisp','Airy','Green','Clean','Soapy'] },
    floral: { name:'Floral', number:'02', color:'#D4A7AD', summary:'An expressive family built around impressions of flowers.', scene:'A petal, a stem, a bloom: similar sources can still suggest very different textures.', notes:['Rose','Iris','Jasmine','Orange Blossom'], descriptors:['Soft','Powdery','Dewy','Luminous'] },
    floriental: { name:'Floriental', number:'03', color:'#DEA89B', summary:'Floral impressions with a warmer, fuller direction.', scene:'Flower petals against soft, enveloping warmth rather than a light bouquet alone.', notes:['Jasmine','Orange Blossom','Vanilla','Rose'], descriptors:['Warm','Creamy','Sweet','Radiant'] },
    ambree: { name:'Ambrée', number:'04', color:'#D9B98F', summary:'A warm, rounded family often described with resinous depth.', scene:'Golden warmth, gentle resins, and the feeling of something softly glowing.', notes:['Labdanum','Benzoin','Vanilla','Tonka Bean'], descriptors:['Warm','Resinous','Sweet','Soft'] },
    gourmand: { name:'Gourmand', number:'05', color:'#DECBBC', summary:'Scents that evoke edible sweetness and rich comfort.', scene:'Warm vanilla, cocoa, caramel: recognizable associations, not an actual recipe.', notes:['Vanilla','Tonka Bean','Caramel','Cocoa'], descriptors:['Sweet','Creamy','Warm','Edible'] },
    chypre: { name:'Chypre', number:'06', color:'#B7C6BA', summary:'A layered direction often associated with citrus, moss, and earthy depth.', scene:'Brightness at the edge, then leaves, moss, and a textured, dry base.', notes:['Bergamot','Oakmoss','Patchouli','Rose'], descriptors:['Mossy','Dry','Earthy','Elegant'] },
    woody: { name:'Woody', number:'07', color:'#CBBFB6', summary:'Wood-like scent impressions, from dry grain to smooth softness.', scene:'One piece of wood may feel crisp and dry; another may seem rounded and creamy.', notes:['Cedarwood','Sandalwood','Vetiver','Patchouli'], descriptors:['Dry','Creamy','Earthy','Warm'] },
    fougere: { name:'Fougère', number:'08', color:'#B8CEC5', summary:'An aromatic direction often combining herbal freshness and mossy warmth.', scene:'Lavender, green leaves, and the familiar contrast of fresh and earthy notes.', notes:['Lavender','Coumarin','Oakmoss','Bergamot'], descriptors:['Aromatic','Green','Mossy','Clean'] }
  },
  notes: {
    'Bergamot': {summary:'A bright, citrus-like note with an airy, sometimes bitter edge.', scene:'The brightness of freshly opened citrus peel.', connects:['Crisp']},
    'Lemon': {summary:'A recognizable zesty citrus impression.',scene:'A sharp, bright strip of lemon peel.',connects:['Crisp']},
    'Mint': {summary:'A cool, herbal scent impression.',scene:'Crushed mint leaves and the sense of cool air.',connects:['Green']},
    'Neroli': {summary:'A fresh, floral-citrus impression associated with bitter orange blossoms.',scene:'Light orange blossoms near a green leaf.',connects:['Airy']},
    'Rose': {summary:'A floral note with possible petal-like, green, or rich nuances.',scene:'Rose petals and stems; what you notice depends on the context.',connects:['Soft']},
    'Iris': {summary:'A floral note often described as soft, powdery, or violet-like.',scene:'A fine, velvety powder rather than a loud bouquet.',connects:['Powdery','Soft']},
    'Jasmine': {summary:'A recognizable white-floral impression that can feel delicate or lush.',scene:'A small white blossom with a surprisingly rich presence.',connects:['Luminous']},
    'Orange Blossom': {summary:'A floral note that can suggest both brightness and warmth.',scene:'Orange blossoms in gentle light.',connects:['Radiant']},
    'Vanilla': {summary:'A familiar sweet, warm note whose role changes with its fragrance family.',scene:'The same warmth can suggest dessert, softness, or an amber-like impression.',connects:['Sweet','Warm','Creamy']},
    'Labdanum': {summary:'A resinous note commonly associated with ambery depth.',scene:'A dark resin warmed by the sun.',connects:['Resinous']},
    'Benzoin': {summary:'A sweet, balsamic resinous impression.',scene:'Warm resin with a soft, rounded sweetness.',connects:['Resinous','Warm']},
    'Tonka Bean': {summary:'A warm, sweet note with vanilla-like and softly aromatic facets.',scene:'A comforting warmth with a faint dry edge.',connects:['Sweet']},
    'Caramel': {summary:'A sweet, edible association used in gourmand descriptions.',scene:'A thin ribbon of warmed sugar.',connects:['Edible','Sweet']},
    'Cocoa': {summary:'A recognizable chocolate-like note, sometimes warm or dry.',scene:'A dusting of dark cocoa.',connects:['Edible']},
    'Oakmoss': {summary:'A moss-like impression associated with earthy, shaded depth.',scene:'A cool, moss-covered surface beneath trees.',connects:['Mossy']},
    'Patchouli': {summary:'An earthy, woody-herbal impression used in several fragrance styles.',scene:'Dark leaves, earth, and textured wood.',connects:['Earthy']},
    'Cedarwood': {summary:'A woody note often associated with a dry, pencil-like grain.',scene:'Freshly sharpened pencil shavings.',connects:['Dry']},
    'Sandalwood': {summary:'A woody note frequently described as soft, smooth, or creamy.',scene:'A polished piece of wood with rounded edges.',connects:['Creamy','Soft']},
    'Vetiver': {summary:'A woody-rooty note that can feel dry, earthy, or green.',scene:'Roots and dry grass after the rain has passed.',connects:['Dry','Earthy']},
    'Lavender': {summary:'An aromatic floral-herbal note.',scene:'A sprig of lavender between fingers.',connects:['Aromatic']},
    'Coumarin': {summary:'A sweet, hay-like impression often associated with fougère structures.',scene:'Warm dry grass and a soft sweetness.',connects:['Aromatic']}
  },
  descriptors: {
    'Crisp':'A clear, brisk impression, often used for energetic freshness.',
    'Airy':'Light and open rather than heavy or dense.',
    'Green':'An impression of stems, leaves, or freshly cut vegetation.',
    'Clean':'A broad sense of freshness or cleanliness, not one fixed scent.',
    'Soapy':'An association with soap or freshly washed materials.',
    'Soft':'An impression without sharp edges, often gentle or smooth.',
    'Powdery':'A soft, fine, dry texture-like impression; not a specific ingredient.',
    'Dewy':'A light, fresh impression that recalls moisture on petals or leaves.',
    'Luminous':'A figurative way to describe an open or radiant-feeling scent.',
    'Warm':'A comforting, rounded impression rather than literal temperature.',
    'Creamy':'A smooth, rounded impression, as opposed to a fine dry powder.',
    'Sweet':'An impression that recalls sweetness, not necessarily food.',
    'Radiant':'A figurative sense of brightness and outward presence.',
    'Resinous':'An impression associated with balsams, resins, or warm depth.',
    'Edible':'An association that evokes food or dessert rather than a literal flavor.',
    'Mossy':'An impression associated with damp moss or shaded greenery.',
    'Dry':'An impression with less perceived sweetness or moisture-like softness.',
    'Earthy':'An impression that recalls soil, roots, leaves, or dark wood.',
    'Elegant':'A subjective aesthetic description, not a measurable scent property.',
    'Aromatic':'A recognizable herbal or leafy quality, often in fougère descriptions.'
  }
};