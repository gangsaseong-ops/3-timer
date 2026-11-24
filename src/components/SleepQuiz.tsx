import React, { useState } from 'react';
import { QUIZ_QUESTIONS, PRODUCTS } from '../data/products';
import { ProductId } from '../types';
import { soundEffects } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle, Check, Award } from 'lucide-react';

interface SleepQuizProps {
  onNavigateToProduct: (productId: ProductId) => void;
  onOpenOrder: (productId: ProductId) => void;
}

export const SleepQuiz: React.FC<SleepQuizProps> = ({
  onNavigateToProduct,
  onOpenOrder,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<ProductId[]>([]);
  const [resultProduct, setResultProduct] = useState<ProductId | null>(null);

  const handleSelectOption = (productId: ProductId) => {
    soundEffects.playPop();
    const newAnswers = [...answers, productId];
    setAnswers(newAnswers);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate most frequent recommended product
      const counts: Record<ProductId, number> = {
        powerbank: 0,
        dumbbell: 0,
        carpet: 0,
      };
      newAnswers.forEach((id) => {
        counts[id] = (counts[id] || 0) + 1;
      });

      let topProduct: ProductId = 'powerbank';
      let maxCount = -1;
      (Object.keys(counts) as ProductId[]).forEach((id) => {
        if (counts[id] > maxCount) {
          maxCount = counts[id];
          topProduct = id;
        }
      });

      setResultProduct(topProduct);
      soundEffects.playVictoryFanfare();
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleResetQuiz = () => {
    soundEffects.playPop();
    setCurrentStep(0);
    setAnswers([]);
    setResultProduct(null);
  };

  const currentQ = QUIZ_QUESTIONS[currentStep];
  const matchedProduct = PRODUCTS.find((p) => p.id === resultProduct);

  const personaMap: Record<ProductId, { title: string; subtitle: string; tip: string }> = {
    powerbank: {
      title: '🚌 통근길 스텔스 세이프가드 유형',
      subtitle: '지하철·버스에서 졸다가 종점까지 가버린 뼈아픈 기억이 있는 분!',
      tip: '남들 눈치 볼 필요 없는 0dB 무소음 초강력 모터로, 가방 속이나 손안에서 확실히 깨워주는 보조배터리 알람시계가 필수입니다.',
    },
    carpet: {
      title: '🛏️ 침대 껌딱지 무의식 재수면 유형',
      subtitle: '알람 끄고 "5분만 더..." 하다가 1시간 순간이동하는 프로 늦잠러!',
      tip: '손으로 끄는 알람은 통하지 않습니다. 두 발로 침대에서 완전히 일어나 체중을 3초간 실어야 꺼지는 카펫 알람으로 신체를 강제 기상시키세요.',
    },
    dumbbell: {
      title: '⚡ 뇌 각성 모닝 갓생 챌린저 유형',
      subtitle: '눈은 떴지만 멍하고 활력이 없어 침대 위에서 시간 낭비하는 분!',
      tip: '상체 근육을 30회 수직으로 펌핑하며 혈액순환과 도파민을 즉각 공급하는 덤벨 알람시계로 하루를 활기차게 시작해보세요.',
    },
  };

  return (
    <section id="quiz" className="scroll-mt-20 py-16 sm:py-24 bg-neutral-950 text-white border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title and Intro */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE TEST</span>
            <span aria-hidden="true">·</span>
            <span>나의 잠 깨우기 유형 진단</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            나에게 딱 맞는 알람시계 찾기
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            당신의 가장 곤란했던 수면 순간을 선택하면, 100% 기상을 보장해줄 최적의 아이템을 진단해 드립니다.
          </p>
        </div>

        {/* Quiz Box */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {!resultProduct ? (
            <div className="space-y-6">
              {/* Step indicator */}
              <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-4">
                <span>질문 {currentStep + 1} / {QUIZ_QUESTIONS.length}</span>
                <span className="text-amber-400 font-semibold">
                  진행률 {Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}%
                </span>
              </div>

              {/* Question Text */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-2xl font-bold text-white">
                  Q{currentQ.id}. {currentQ.question}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options list */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(opt.targetProduct)}
                    className="text-left p-4 sm:p-5 rounded-xl border border-neutral-800 bg-neutral-950/60 hover:bg-neutral-800/80 hover:border-amber-400/60 transition-all duration-200 group flex items-start gap-4 active:scale-[0.99]"
                  >
                    <div className="w-6 h-6 rounded-full bg-neutral-800 group-hover:bg-amber-400 group-hover:text-neutral-950 text-neutral-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <div className="space-y-1 flex-1">
                      <span className="font-bold text-sm sm:text-base text-white group-hover:text-amber-400 transition-colors block">
                        {opt.label}
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="inline-flex p-3 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                <Award className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-amber-400 tracking-wider">
                  진단 결과: 궁합 지수 99.4%
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {personaMap[resultProduct].title}
                </h3>
                <p className="text-sm text-neutral-300 max-w-lg mx-auto">
                  {personaMap[resultProduct].subtitle}
                </p>
              </div>

              {/* Matched Product Card Snippet */}
              {matchedProduct && (
                <div className="bg-neutral-950 rounded-xl border border-neutral-800 p-5 text-left flex flex-col sm:flex-row items-center gap-5 max-w-2xl mx-auto">
                  <img
                    src={matchedProduct.image}
                    alt={matchedProduct.imageAlt}
                    className="w-28 h-28 object-cover rounded-lg shrink-0 border border-neutral-800"
                  />
                  <div className="space-y-1.5 flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-amber-400">
                      <span>추천 아이템</span>
                      <span aria-hidden="true">·</span>
                      <span>{matchedProduct.badge}</span>
                    </div>
                    <h4 className="font-bold text-base sm:text-lg text-white">
                      {matchedProduct.name}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {personaMap[resultProduct].tip}
                    </p>
                    <div className="text-sm font-extrabold text-amber-400 pt-1">
                      판매가: {matchedProduct.priceFormatted}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigateToProduct(resultProduct)}
                  className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span>추천 제품 상세 & 체험 보기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenOrder(resultProduct)}
                  className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors"
                >
                  <span>바로 주문 / 예약하기</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="w-full sm:w-auto px-4 py-3 text-xs text-neutral-400 hover:text-white rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>테스트 다시하기</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
