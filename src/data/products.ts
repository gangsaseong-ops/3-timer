import { DumbbellOption, ProductDetail, QuizQuestion } from '../types';

export const DUMBBELL_OPTIONS: DumbbellOption[] = [
  { id: '1kg', name: '1kg (기본형)', weight: '1kg', price: 10000, description: '가벼운 모닝 스트레칭 & 여성·입문자 추천' },
  { id: '2kg', name: '2kg 모델', weight: '2kg', price: 11000, description: '적당한 자극으로 아침 잠을 날려주는 기본 중량' },
  { id: '3kg', name: '3kg 모델', weight: '3kg', price: 12000, description: '팔 근육이 뻐근해지며 뇌가 즉시 깨어나는 강도' },
  { id: '4kg', name: '4kg 모델', weight: '4kg', price: 13000, description: '30번 흔들다 보면 잠이 아니라 땀이 터지는 중급자용' },
  { id: '5kg', name: '5kg 파워', weight: '5kg', price: 14000, description: '헤비 슬리퍼 전용! 끄는 순간 이미 오전 운동 완료' },
  {
    id: 'custom',
    name: '원판 교체형 (커스텀)',
    weight: '가변형 (원판 호환)',
    price: 13500,
    description: '양끝 바에 운동용 원판을 자유롭게 장착/분리하는 커스텀형',
    badge: '인기 커스텀'
  },
];

export const PRODUCTS: ProductDetail[] = [
  {
    id: 'powerbank',
    name: '스텔스 강력 진동 알람시계 탑제 보조배터리',
    shortName: '보조배터리 알람',
    tagline: '지하철에서 아무리 깊이 졸아도 내릴 역을 절대 안 놓치는 비법!',
    price: 24500,
    priceFormatted: '24,500원',
    badge: '대중교통 필수템',
    rating: 4.9,
    reviewCount: 1420,
    image: '/assets/aistudio/image_ea6d55b3.png',
    imageAlt: '지하철에서 한 손에 쥐고 사용하는 스텔스 강력 진동 알람시계 탑제 보조배터리',
    highlightSpecs: ['20,000mAh 대용량', '초강력 무소음 모터', '주변 민폐 0% 스텔스'],
    specs: [
      { label: '배터리 사양', value: '20,000mAh 대용량 고밀도 리튬 폴리머 (초고속 충전 지원)' },
      { label: '알람 방식', value: '초강력 햅틱 진동 모터 (알람음 0dB, 진동 전달력 100%)' },
      { label: '디스플레이', value: '전면 고휘도 화이트 LED 시계 + 실시간 배터리 잔량(%) 표기' },
      { label: '설정 인터페이스', value: '측면 직관적 물리 버튼 (분 단위 퀵 타이머 & 고정 알람)' },
      { label: '휴대 디자인', value: '손목 스트랩 일체형 & 지하철 그립 최적화 콤팩트 바디' },
      { label: '소재 및 외장', value: '매트 블랙 충격 완충 하우징 & 스트랩 일체형' },
      { label: '내구성', value: '가방 속 열쇠·소지품 마찰 스크래치 방지 하드코팅' },
    ],
    features: [
      {
        title: '보조배터리 + 정밀 알람시계의 완벽한 융합',
        desc: '단순한 알람이 아닙니다. 일상에서 매일 들고 다니는 고속 보조배터리에 디지털 알람시계를 내장하여 항상 휴대가 편리합니다.',
      },
      {
        title: '손과 가방 속을 뒤흔드는 초강력 무소음 진동 모터',
        desc: '삐삐거리는 소리 없이도 손목이나 무릎 위 가방 전체로 전해지는 묵직한 파동! 깊은 렘수면 중에도 뇌를 흔들어 즉시 깨워줍니다.',
      },
      {
        title: '주변 승객 눈치 0%! 지하철·버스·도서관 최적화 스텔스',
        desc: '소리가 전혀 나지 않아 조용한 지하철 퇴근길이나 열람실에서도 주변 사람에게 민폐를 끼치지 않고 오직 본인만 확실하게 깨어납니다.',
      },
    ],
    materials: [
      { label: '외장 재질', detail: '내구성 강화 매트 블랙 콤팩트 바디 & 휴대용 스트랩' },
      { label: '내구성 특장점', detail: '강력 내마모성 코팅 및 가방 안 소지품과의 마찰 스크래치 원천 차단' },
    ],
    idealFor: '지하철·버스에서 퇴근길 꿀잠 자다 종점까지 가버린 경험이 있는 직장인 및 학생',
    soundType: 'vibration',
  },
  {
    id: 'dumbbell',
    name: '30번 흔들어야 꺼지는 덤벨 알람시계',
    shortName: '덤벨 알람',
    tagline: '아침 운동과 기상을 동시에! 30회 흔들기 전엔 절대 멈추지 않는다',
    price: 10000,
    priceFormatted: '10,000원 ~ 14,000원',
    badge: '모닝 루틴 종결자',
    rating: 4.8,
    reviewCount: 980,
    image: '/src/assets/images/alarm_dumbbell_fitness_1793685598676.jpg',
    imageAlt: '실리콘 논슬립 그립과 LCD 화면이 있는 피트니스 덤벨 알람시계',
    highlightSpecs: ['정밀 중력 센서 내장', '총 6가지 중량 옵션', '방진 충격흡수 프레임'],
    specs: [
      { label: '해제 메커니즘', value: '3축 정밀 중력 자이로 센서 (위아래 30회 정확한 스윙 시 해제)' },
      { label: '무게 옵션', value: '1kg / 2kg / 3kg / 4kg / 5kg / 원판 커스텀 교체형 (총 6종)' },
      { label: '디스플레이', value: '핸들 중앙 방수 LCD 디스플레이 (시간 & 30 카운트다운 실시간 표기)' },
      { label: '외장 재질', value: '고밀도 충격 흡수 ABS + 미끄럼 방지 실리콘 널링 그립' },
      { label: '원판 체결 방식', value: '강철 스틸 고정 핀 & 락킹 스크류 체결 (유격 없이 견고)' },
      { label: '내구성 설계', value: '낙하 충격 완충 실리콘 링 & 내부 센서 충격 방진 밀폐 섀시' },
      { label: '전원 사양', value: 'AAA 배터리 2개 (초저전력 설계로 약 8개월 연속 사용)' },
    ],
    features: [
      {
        title: '알람 끄려면 무조건 30회! 자연스러운 모닝 펌핑',
        desc: '침대에 누운 채 손가락 하나로 끌 수 없습니다. 정밀 중력 센서가 상하 왕복 운동 30회를 정확히 인식해야 비로소 알람이 멈춥니다.',
      },
      {
        title: '체력과 기상 난이도에 맞춘 6가지 맞춤 무게 라인업',
        desc: '가벼운 1kg부터 땀샘을 터뜨리는 5kg, 그리고 헬스 마니아를 위한 규격 원판 교체형(13,500원)까지 본인에게 맞게 선택할 수 있습니다.',
      },
      {
        title: '잠결에 떨어뜨려도 안심! 고밀도 ABS 방진 프레임',
        desc: '알람을 끄다 거칠게 흔들거나 침대 아래로 떨어뜨려도 내부 정밀 센서와 액정이 보호되는 견고한 완충 범퍼 구조를 자랑합니다.',
      },
    ],
    materials: [
      { label: '외장 재질', detail: '고밀도 ABS 소재 & 땀이 나도 미끄러지지 않는 실리콘 논슬립 그립' },
      { label: '원판 모델', detail: '강철 스틸 고정 핀 및 스크류 방식으로 중량 원판 체결 시 유격 제로' },
      { label: '내구성 특장점', detail: '낙하 충격 방진 프레임 & 고중량 흔들림 견딤 설계' },
    ],
    idealFor: '알람을 끄고도 침대 속에서 멍때리다 지각하는 사람 & 아침 활력 충전이 필요한 갓생러',
    soundType: 'shake',
  },
  {
    id: 'carpet',
    name: '두 발로 일어서야 꺼지는 카펫 알람시계',
    shortName: '카펫 알람',
    tagline: '침대에서 두 발로 완전히 일어서야만 알람 해제! 다시 누울 수 없다',
    price: 15000,
    priceFormatted: '15,000원',
    badge: '직립 보행 강제템',
    rating: 4.95,
    reviewCount: 2150,
    image: '/src/assets/images/alarm_carpet_mat_1793685598053.jpg',
    imageAlt: '발자국 압력 감지 센서와 부드러운 메모리폼으로 제작된 카펫 알람시계',
    highlightSpecs: ['3초 체중 압력 감지', '150kg 하중 내구성', '초극세사 벨벳 메모리폼'],
    specs: [
      { label: '해제 메커니즘', value: '양발 전면 압력 센서 (두 발로 올라서서 3초 이상 체중 부하 시 해제)' },
      { label: '사이즈 / 규격', value: '가로 60cm × 세로 40cm × 두께 1.8cm (침대 옆 최적 규격)' },
      { label: '표면 소재', value: '발에 닿는 촉감이 부드러운 고밀도 메모리폼 & 초극세사 벨벳' },
      { label: '내구성 인증', value: '150kg 체중 압력 반복 하중 테스트 통과, 내장 센서 손상 방지 패널' },
      { label: '바닥면 처리', value: '격자 패턴 논슬립(Non-slip) 실리콘 패드로 밀림 완벽 방지' },
      { label: '세탁 편의성', value: '지퍼 분리형 커버 디자인으로 손쉬운 물세탁 및 위생 관리' },
      { label: '알람 음향', value: '85dB 고출력 듀얼 부저 + 해제 시 상쾌한 모닝 하모니' },
    ],
    features: [
      {
        title: '두 발로 땅을 딛고 3초 버티기! 침대 탈출 성공 공식',
        desc: '발끝만 대서는 꺼지지 않습니다. 양 발바닥에 실리는 체중을 감지해 3초간 서 있어야 비로소 소리가 멎으므로 이미 몸은 기상 완료 상태가 됩니다.',
      },
      {
        title: '아침 첫 발걸음을 포근하게 감싸는 초극세사 벨벳',
        desc: '차가운 방바닥의 불쾌감 대신, 발을 딛는 순간 기분 좋은 푹신함을 선사하는 프리미엄 메모리폼으로 기분 좋은 하루를 시작합니다.',
      },
      {
        title: '150kg 하중도 끄떡없는 고내구성 감지 패널 & 분리 세탁',
        desc: '매일 아침 강한 체중이 실려도 센서가 왜곡되거나 망가지지 않으며, 분리형 외피로 커피를 쏟아도 세탁기로 손쉽게 관리할 수 있습니다.',
      },
    ],
    materials: [
      { label: '외장 재질', detail: '고밀도 메모리폼(Memory Foam) & 오염에 강한 초극세사 벨벳 원단' },
      { label: '안전 패널', detail: '150kg 체중 압력 지속 감지 센서 & 바닥면 미끄럼 방지 실리콘 패드' },
      { label: '내구성 특장점', detail: '반복 하중에도 영구 변형 없는 압력 센서 매트 & 지퍼 분리형 세탁' },
    ],
    idealFor: '무의식적으로 침대 옆 스마트폰 알람을 끄고 5분만 더 자다 대참사를 겪는 사람',
    soundType: 'siren',
  },
];

export const COMPARISON_TABLE_DATA = [
  {
    category: '판매 가격',
    powerbank: '24,500원',
    dumbbell: '10,000원 ~ 14,000원\n(원판형: 13,500원)',
    carpet: '15,000원',
  },
  {
    category: '주요 사양',
    powerbank: '22.5W 고속 충전 일체형 케이블\n화이트 LED 시계 디스플레이',
    dumbbell: '1~5kg 중량 선택 또는\n원판 커스텀 교체형',
    carpet: '고밀도 메모리폼 +\n초극세사 벨벳 원단',
  },
  {
    category: '주요 사용 장소',
    powerbank: '지하철 / 버스 / 도서관 / 독서실',
    dumbbell: '집 (침실, 원룸, 기숙사)',
    carpet: '집 (침대 밑 바닥)',
  },
  {
    category: '잠 깨우는 방식',
    powerbank: '손/가방으로 전해지는\n초강력 무소음 진동',
    dumbbell: '상체 근력 운동\n(위아래 30회 연속 흔들기)',
    carpet: '직립 보행 강제\n(두 발로 3초 이상 체중 부하)',
  },
  {
    category: '재질 및 외관',
    powerbank: '메탈/알루미늄 바디,\n보조배터리 겸용 듀얼 설계',
    dumbbell: '고밀도 ABS & 실리콘 그립\n(강철 스틸 원판바)',
    carpet: '고밀도 메모리폼 &\n초극세사 벨벳 (체중 감지)',
  },
  {
    category: '내구성 특장점',
    powerbank: '가방 안 스크래치 방지\n하드 아노다이징 코팅',
    dumbbell: '낙하 충격 방진 프레임 &\n고중량 원판 체결 고정력',
    carpet: '150kg 체중 압력 센서 &\n커버 지퍼 분리 세탁 용이',
  },
  {
    category: '추천 대상',
    powerbank: '지하철에서 졸다 역 놓치는 사람\n통근·통학족 필수',
    dumbbell: '원하는 무게로 아침에 운동하며\n확실하게 깰 사람',
    carpet: '알람 끄고 무의식중에\n다시 침대에 눕는 사람',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '당신이 일상에서 경험한 가장 끔찍하고 난감한 수면 순간은?',
    subtitle: '가장 깊은 공감을 느끼는 보기를 선택해주세요',
    options: [
      {
        label: '대중교통 종점행',
        description: '지하철/버스에서 깜빡 졸다가 환승역이나 내릴 역을 훌쩍 지나쳤을 때',
        targetProduct: 'powerbank',
      },
      {
        label: '무의식 침대 재수면',
        description: '아침 알람을 분명 껐는데, 눈떠보니 40분이 지나 침대에 누워있을 때',
        targetProduct: 'carpet',
      },
      {
        label: '아침 뇌 정지 & 멍때리기',
        description: '눈은 떴지만 몸에 힘이 없고 멍해서 침대에서 30분 동안 핸드폰만 볼 때',
        targetProduct: 'dumbbell',
      },
    ],
  },
  {
    id: 2,
    question: '당신이 가장 필요로 하는 알람의 핵심 조건은 무엇인가요?',
    subtitle: '환경과 라이프스타일에 가장 부합하는 것을 골라주세요',
    options: [
      {
        label: '민폐 제로 스텔스 파워',
        description: '도서관이나 대중교통 등 공공장소에서 남에게 피해 안 주고 나만 깨우는 알람',
        targetProduct: 'powerbank',
      },
      {
        label: '침대에서 강제 이탈',
        description: '내 몸이 물리적으로 침대 밖으로 발을 디디지 않으면 안 되는 강력한 강제력',
        targetProduct: 'carpet',
      },
      {
        label: '도파민 충전 & 모닝 루틴',
        description: '팔과 어깨를 가볍게 펌핑해서 혈액순환을 돌리고 잠기운을 한 방에 털어내는 방식',
        targetProduct: 'dumbbell',
      },
    ],
  },
  {
    id: 3,
    question: '만약 이 알람시계를 갖게 된다면 가장 기대되는 변화는?',
    subtitle: '변화하고 싶은 나의 아침 모습은?',
    options: [
      {
        label: '안심 통근 & 스마트폰 충전',
        description: '이동 중 편하게 눈 붙이면서 배터리 걱정 없이 정거장에 딱 맞춰 하차하기',
        targetProduct: 'powerbank',
      },
      {
        label: '기상 직후 침대 탈출 100%',
        description: '눈뜨자마자 발 딛고 화장실로 직행해 정시 출근·등교 성공하기',
        targetProduct: 'carpet',
      },
      {
        label: '아침 30회 스윙으로 갓생 시작',
        description: '아침마다 덤벨 30회 흔들며 에너지 솟는 활력 모닝 루틴 완성하기',
        targetProduct: 'dumbbell',
      },
    ],
  },
];
