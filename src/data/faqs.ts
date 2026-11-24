import { FaqItem } from '../types';

export const FAQS: FaqItem[] = [
  {
    id: 'powerbank-vibration',
    q: '스텔스 강력 진동 알람시계 탑제 보조배터리의 진동 세기는 어느 정도인가요?',
    a: '손목 스마트워치 진동의 약 3배에 달하는 대형 편심 햅틱 모터를 장착하여 가방 속에 넣어두거나 무릎 위에 올려두어도 확실하게 몸 전체로 전달됩니다. 소음은 0dB에 가까워 조용한 지하철이나 열람실에서도 다른 승객에게 전혀 피해를 주지 않습니다.',
    keywords: [
      '보조배터리',
      '배터리',
      '스텔스',
      '진동',
      '세기',
      '세',
      '강',
      '약',
      '무소음',
      '소음',
      '소리',
      '조용',
      '지하철',
      '열람실',
      '도서관',
      '버스',
      '통근',
      '가방',
      '무릎',
      '햅틱',
      '모터',
      '충전',
      '케이블',
      '알람음',
      '0db',
    ],
  },
  {
    id: 'dumbbell-count',
    q: '덤벨 알람시계의 30회 카운트는 대충 흔들어도 인식되나요?',
    a: '아닙니다! 3축 정밀 중력 자이로 센서가 탑재되어 있어, 유효 가속도와 수직 궤적이 기준치에 도달해야만 1회로 카운트됩니다. 잔머리를 쓰거나 살짝 까딱거려서는 꺼지지 않아 확실한 기상 운동 효과를 선사합니다.',
    keywords: [
      '덤벨',
      '아령',
      '30회',
      '30번',
      '서른',
      '횟수',
      '카운트',
      '인식',
      '센서',
      '자이로',
      '대충',
      '살짝',
      '흔들',
      '가속도',
      '궤적',
      '운동',
      '해제',
      '안꺼',
      '꺼지',
      'lcd',
    ],
  },
  {
    id: 'dumbbell-plates',
    q: '덤벨 원판 교체형(13,500원)은 일반 헬스용 원판과 호환되나요?',
    a: '표준 25mm~28mm 내경의 소형 경량 원판과 호환되며, 듀얼 스틸 락킹 스크류 방식으로 흔들릴 때 원판이 빠지지 않도록 2중 안전 잠금 설계가 적용되어 있습니다.',
    keywords: [
      '원판',
      '교체',
      '커스텀',
      '13500',
      '13,500',
      '무게',
      'kg',
      '헬스',
      '호환',
      '내경',
      '25mm',
      '28mm',
      '잠금',
      '빠지',
      '고정',
      '덤벨',
      '아령',
      '스크류',
    ],
  },
  {
    id: 'carpet-wash',
    q: '카펫 알람시계는 세탁이 가능한가요?',
    a: '네, 뒷면 지퍼를 열어 내부 고내구성 압력 센서 및 메모리폼 패널을 분리한 후, 외피 초극세사 벨벳 커버만 세탁망에 넣어 표준 물세탁(울코스 권장) 하실 수 있습니다.',
    keywords: [
      '카펫',
      '매트',
      '발판',
      '세탁',
      '빨래',
      '물세탁',
      '청소',
      '오염',
      '더러',
      '커버',
      '지퍼',
      '분리',
      '벨벳',
      '메모리폼',
      '압력',
      '건조',
      '밟',
      '일어서',
      '직립',
      '무게',
      '하중',
    ],
  },
  {
    id: 'shipping-refund',
    q: '배송 기간 및 교환/환불 정책은 어떻게 되나요?',
    a: '평일 오후 4시 이전 결제 완료 건은 당일 출고되며, 전국 1~2일 내 수령 가능합니다. 제품 수령 후 7일 이내 단순 변심 시에도 100% 안심 교환/반품을 보장해 드립니다.',
    keywords: [
      '배송',
      '기간',
      '언제',
      '며칠',
      '출고',
      '당일',
      '도착',
      '택배',
      '교환',
      '환불',
      '반품',
      '취소',
      '변심',
      '정책',
      '결제',
      '수령',
      '보장',
      '고장',
      '불량',
      '수리',
      '무료배송',
      '배송비',
      '주문',
    ],
  },
];

export function findSimilarFaqs(query: string, limit = 3): FaqItem[] {
  const normalized = query
    .trim()
    .toLowerCase()
    .replace(/[?!.,~'"()[\]{}]/g, ' ')
    .replace(/\s+/g, ' ');

  if (!normalized) return [];

  const queryTokens = normalized.split(' ').filter((t) => t.length >= 2);

  const scored = FAQS.map((faq) => {
    let score = 0;
    const qLower = faq.q.toLowerCase();
    const aLower = faq.a.toLowerCase();

    // 1. Keyword inclusion (works smoothly for Korean suffixes like "세탁할", "배송은", "진동이")
    for (const kw of faq.keywords) {
      if (normalized.includes(kw)) {
        score += Math.max(4, kw.length * 3);
      }
    }

    // 2. Direct token overlap against FAQ question & answer text
    for (const token of queryTokens) {
      if (qLower.includes(token)) {
        score += 5;
      } else if (aLower.includes(token)) {
        score += 2;
      }
    }

    // 3. Reverse check: 2+ char words from FAQ question appearing in user's query
    const faqWords = qLower
      .replace(/[?!.,()]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 2);
    for (const word of faqWords) {
      const stem = word.slice(0, Math.min(word.length, 3));
      if (stem.length >= 2 && normalized.includes(stem)) {
        score += 2;
      }
    }

    return { faq, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.faq);
}
