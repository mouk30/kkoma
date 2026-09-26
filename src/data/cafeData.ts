export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'signature' | 'dessert' | 'coffee' | 'non-coffee';
  price: number;
  description: string;
  image: string;
  badge?: string;
  isPopular?: boolean;
  tempOptions: ('HOT' | 'ICE' | 'BOTH' | 'NONE');
  tags: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  date: string;
  rating: number;
  content: string;
  tag: string;
  likes: number;
}

export const MASCOT_INFO = {
  name: "꼬마 (Kkoma)",
  title: "COMA CAFE 공식 마스코트",
  badge: "Official Mascot",
  avatar: "/src/assets/images/mascot_kkoma_girl_1790408941120.jpg",
  bakingImg: "/src/assets/images/mascot_kkoma_baking_1790408956303.jpg",
  greeting: "안녕! 꼬마다방에 온 걸 환영해! 오늘 꼬마가 갓 구운 바삭한 크로플 하나 추천해줄까?",
  quote: "새벽 5시까지 불을 밝히고 맛있는 커피와 달콤한 디저트로 기다리고 있어!",
  recommends: [
    { title: "브라운치즈 젤라또 크로플", reason: "내가 제일 좋아하는 겉바속촉 크로플에 젤라또랑 짭짤한 브라운치즈 듬뿍!" },
    { title: "꼬마 아인슈페너", reason: "꼬마의 특제 동물성 생크림이 묵직하고 쫀득해서 한 입 마시면 기분이 좋아져!" },
    { title: "수제 달고나 라떼", reason: "달콤 바삭하게 씹히는 수제 달고나가 듬뿍 들어간 힙한 인기 메뉴!" }
  ]
};

export const CAFE_INFO = {
  brandName: "COMA CAFE",
  name: "꼬마다방",
  subName: "24시 꼬마다방 & 만남의 광장",
  tagline: "신림동의 모던 & 힙 플레이스, 새벽 5시까지 열려있는 만남의 광장",
  description: "선명한 비비드 오렌지 파사드와 스트라이프 어닝, 감각적인 코랄레드 부스석과 핑크 스피커, 그리고 귀여운 마스코트 '꼬마'가 반겨주는 현대적이고 힙한 만남의 광장입니다. 오전 11시부터 다음 날 새벽 5시까지 열려있어 늦은 밤에도 여유로운 커피와 달콤한 수제 디저트를 즐기실 수 있습니다.",
  address: "서울특별시 관악구 신림동 1433-66 (신림역 5번 출구 신원시장 방면)",
  shortAddress: "서울 관악구 신림동 1433-66",
  phone: "0507-1342-8921",
  naverMapUrl: "https://map.naver.com/p/search/%EA%BC%AC%EB%A7%88%EB%8B%A4%EB%B0%A9/place/1280222723?placePath=%2Fhome",
  hours: {
    open: "11:00 오전",
    close: "05:00 익일 새벽",
    display: "매일 11:00 ~ 새벽 05:00",
    future: "심야 영업 중 · 한 달 뒤 24시 연중무휴 예정",
    note: "연중무휴 새벽 5시까지 영업"
  },
  facilities: [
    { title: "심야 & 만남의 광장", desc: "오전 11시부터 새벽 5시까지 쾌적하게 이용" },
    { title: "인스타 감성 포토존", desc: "튤 조명 대형 원형 거울 & 빈티지 핑크 전화기" },
    { title: "반려동물 동반 환영", desc: "케이지 또는 목줄 착용 시 실내 동반 가능" },
    { title: "모던 콘센트 & 기가 Wi-Fi", desc: "전 좌석 충전 콘센트 및 무선 인터넷 완비" }
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "sig-einspanner",
    name: "꼬마 아인슈페너",
    nameEn: "Kkoma Signature Einspänner",
    category: "signature",
    price: 5500,
    description: "꼬마다방만의 특제 쫀득 크림과 진한 에스프레소가 층을 이루는 모던 시그니처 커피",
    image: "/src/assets/images/signature_einspanner_coffee_1790408458724.jpg",
    badge: "꼬마 추천 1위",
    isPopular: true,
    tempOptions: "ICE",
    tags: ["시그니처", "인기 1위", "특제크림"]
  },
  {
    id: "sig-dalgona",
    name: "수제 달고나 라떼",
    nameEn: "Handmade Dalgona Latte",
    category: "signature",
    price: 5200,
    description: "바삭바삭 씹히는 수제 카라멜 달고나 크런치가 풍성하게 올라간 뉴트로 라떼",
    image: "/src/assets/images/signature_einspanner_coffee_1790408458724.jpg",
    badge: "달콤 바삭",
    isPopular: true,
    tempOptions: "BOTH",
    tags: ["수제 달고나", "바삭달콤", "인기음료"]
  },
  {
    id: "sig-sesame",
    name: "흑임자 크림 라떼",
    nameEn: "Black Sesame Cream Latte",
    category: "signature",
    price: 5800,
    description: "100% 국산 흑임자의 극강의 고소함과 묵직한 크림 텍스처",
    image: "/src/assets/images/signature_einspanner_coffee_1790408458724.jpg",
    badge: "고소함 극대화",
    tempOptions: "ICE",
    tags: ["고소달콤", "진한크림"]
  },
  {
    id: "des-croffle-gelato",
    name: "브라운치즈 젤라또 크로플",
    nameEn: "Brown Cheese Gelato Croffle",
    category: "dessert",
    price: 8500,
    description: "프랑스산 발효버터 크루아상을 갓 구워 젤라또와 카라멜 브라운치즈를 산더미처럼 올린 베스트셀러",
    image: "/src/assets/images/dessert_croffle_macarons_1790408446761.jpg",
    badge: "꼬마의 최애 디저트",
    isPopular: true,
    tempOptions: "NONE",
    tags: ["겉바속촉", "젤라또", "단짠정석"]
  },
  {
    id: "des-plain-croffle",
    name: "클래식 메이플 크로플 (2pcs)",
    nameEn: "Classic Maple Croffle",
    category: "dessert",
    price: 5000,
    description: "주문 즉시 구워내 따뜻하고 바삭한 크로플 위에 순수 메이플 시럽과 은은한 시나몬",
    image: "/src/assets/images/dessert_croffle_macarons_1790408446761.jpg",
    tempOptions: "NONE",
    tags: ["주문즉시구움", "버터풍미"]
  },
  {
    id: "des-macaron-set",
    name: "꼬마 수제 뚱카롱 (5구 세트)",
    nameEn: "Handmade Fat Macaron Set",
    category: "dessert",
    price: 13500,
    description: "아몬드 100% 쫀득한 꼬끄와 달지 않은 천연 버터 필링 (황치즈, 솔티카라멜, 얼그레이, 말차, 딸기)",
    image: "/src/assets/images/dessert_croffle_macarons_1790408446761.jpg",
    badge: "선물 추천",
    isPopular: true,
    tempOptions: "NONE",
    tags: ["선물포장", "수제구움", "덜단마카롱"]
  },
  {
    id: "des-dacquoise",
    name: "쌀가루 수제 다쿠아즈 (앙버터)",
    nameEn: "Rice Flour Dacquoise",
    category: "dessert",
    price: 3800,
    description: "국내산 쌀가루로 구워 겉바속푹 다쿠아즈 속에 고메버터와 국산 팥앙금을 도톰하게 채운 건강 디저트",
    image: "/src/assets/images/dessert_croffle_macarons_1790408446761.jpg",
    tempOptions: "NONE",
    tags: ["글루텐프리", "쌀디저트"]
  },
  {
    id: "des-basque",
    name: "스모키 바스크 치즈케이크",
    nameEn: "Basque Burnt Cheesecake",
    category: "dessert",
    price: 6500,
    description: "끼리 크림치즈를 고온에서 구워내 겉은 스모키, 속은 촉촉한 글루텐프리 치즈케이크",
    image: "/src/assets/images/dessert_croffle_macarons_1790408446761.jpg",
    tempOptions: "NONE",
    tags: ["진한크림치즈", "커피페어링"]
  },
  {
    id: "cof-dabang",
    name: "COMA 뉴트로 다방커피",
    nameEn: "COMA Modern Dabang Coffee",
    category: "coffee",
    price: 3800,
    description: "스페셜티 에스프레소에 프리미엄 연유를 황금비율로 조합한 달콤 쌉싸름한 꼬마다방 시그니처",
    image: "/src/assets/images/signature_einspanner_coffee_1790408458724.jpg",
    badge: "뉴트로 감성",
    tempOptions: "BOTH",
    tags: ["달달구리", "당충전"]
  },
  {
    id: "cof-americano",
    name: "COMA 아메리카노 (고소한 블렌드)",
    nameEn: "Americano (Nutty Blend)",
    category: "coffee",
    price: 4000,
    description: "다크초콜릿과 볶은 아몬드의 묵직한 바디감과 깔끔한 애프터테이스트",
    image: "/src/assets/images/signature_einspanner_coffee_1790408458724.jpg",
    tempOptions: "BOTH",
    tags: ["고소한원두", "데일리커피"]
  },
  {
    id: "cof-latte",
    name: "카페 라떼",
    nameEn: "Cafe Latte",
    category: "coffee",
    price: 4800,
    description: "부드러운 스팀 밀크와 에스프레소의 실키한 조화",
    image: "/src/assets/images/signature_einspanner_coffee_1790408458724.jpg",
    tempOptions: "BOTH",
    tags: ["실키밀크", "부드러움"]
  },
  {
    id: "cof-vanilla",
    name: "천연 바닐라빈 라떼",
    nameEn: "Vanilla Bean Latte",
    category: "coffee",
    price: 5300,
    description: "유기농 통 바닐라빈 시럽으로 완성한 인위적이지 않은 품격 있는 단맛",
    image: "/src/assets/images/signature_einspanner_coffee_1790408458724.jpg",
    tempOptions: "BOTH",
    tags: ["바닐라빈", "깊은풍미"]
  },
  {
    id: "tea-strawberry",
    name: "리얼 생딸기 라떼",
    nameEn: "Real Fresh Strawberry Latte",
    category: "non-coffee",
    price: 6000,
    description: "생딸기 과육이 한가득 씹히는 과즙 가득 시즈널 밀크 음료",
    image: "/src/assets/images/detail_mirror_pink_phone_1790409014643.jpg",
    badge: "생과육 듬뿍",
    tempOptions: "ICE",
    tags: ["생딸기", "상큼달콤"]
  },
  {
    id: "tea-passion-ade",
    name: "백향과 망고 에이드",
    nameEn: "Passion Fruit Mango Ade",
    category: "non-coffee",
    price: 5500,
    description: "패션후르츠 씨앗이 톡톡 터지는 수제청과 달콤한 망고 베이스의 스파클링 에이드",
    image: "/src/assets/images/detail_mirror_pink_phone_1790409014643.jpg",
    tempOptions: "ICE",
    tags: ["톡톡청량", "비타민가득"]
  },
  {
    id: "tea-grapefruit-tea",
    name: "자몽 허니 블랙티",
    nameEn: "Grapefruit Honey Black Tea",
    category: "non-coffee",
    price: 5500,
    description: "생자몽 청과 실론 홍차의 깊고 청량한 밸런스",
    image: "/src/assets/images/detail_mirror_pink_phone_1790409014643.jpg",
    tempOptions: "BOTH",
    tags: ["자허블", "깔끔한단맛"]
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "오렌지홀릭",
    date: "2026.03.24",
    rating: 5,
    content: "외관 오렌지 컬러가 너무 예뻐서 홀린 듯 들어갔는데 내부 코랄 부스석이랑 핑크 스피커가 완전 취향저격이에요! 귀여운 꼬마 캐릭터 스티커도 챙겨주시고 새벽 늦게까지 해서 신림 최고의 아지트입니다.",
    tag: "인테리어가 멋져요",
    likes: 48
  },
  {
    id: "rev-2",
    author: "크로플헌터",
    date: "2026.03.20",
    rating: 5,
    content: "브라운치즈 젤라또 크로플 비주얼 미쳤어요.. 진짜 바삭하고 치즈 듬뿍! 거울 조명 포토존에서 핑크 전화기 들고 찍으면 인스타 인생샷 바로 나옵니다.",
    tag: "사진이 잘 나와요",
    likes: 56
  },
  {
    id: "rev-3",
    author: "야행성단골",
    date: "2026.03.15",
    rating: 5,
    content: "신림에서 새벽 5시까지 하는 이렇게 힙하고 깔끔한 모던 카페는 꼬마다방밖에 없어요. 와이파이 빠르고 콘센트 많아서 밤에 노트북 작업하기에도 최고예요.",
    tag: "늦게까지 열려있어요",
    likes: 39
  },
  {
    id: "rev-4",
    author: "신림동주민_현",
    date: "2026.03.04",
    rating: 5,
    content: "마스코트 꼬마 캐릭터 너무 귀여워요ㅠㅠ 도장 쿠폰 쾅쾅 찍는 재미가 있어서 매일 출근도장 찍고 있습니다. 아인슈페너 크림 완전 쫀쫀해요!",
    tag: "음료가 맛있어요",
    likes: 27
  }
];

export const SPACE_STORIES = [
  {
    title: "시그니처 오렌지 파사드 & 잔디 테라스",
    subtitle: "Vibrant Orange Facade & Deck",
    desc: "신림동 골목을 밝히는 감각적인 비비드 오렌지 외관과 그린 스트라이프 어닝, 초록빛 테라스 데크가 COMA CAFE의 활기를 전합니다.",
    image: "/src/assets/images/hero_coma_cafe_modern_1790408966634.jpg",
    tag: "익스테리어 명소"
  },
  {
    title: "코랄레드 부스석 & 핑크 사운드 박스",
    subtitle: "Modern Coral Booth & Pink Sound",
    desc: "미니멀한 크림톤 벽면과 세련된 코랄레드 부스 시트, 감각적인 핑크 사운드 스피커와 원형 테이블이 모던한 감성을 극대화합니다.",
    image: "/src/assets/images/interior_coma_cafe_modern_1790408982224.jpg",
    tag: "모던 라운지"
  },
  {
    title: "플라워 링 거울 & 레트로 핑크폰 포토존",
    subtitle: "Fairy Light Mirror & Vintage Phone",
    desc: "몽환적인 튤 플라워 조명으로 장식된 대형 원형 거울과 파스텔 핑크 빈티지 전화기가 있는 꼬마다방의 대표 인생샷 스팟입니다.",
    image: "/src/assets/images/detail_mirror_pink_phone_1790409014643.jpg",
    tag: "시그니처 포토존"
  }
];
