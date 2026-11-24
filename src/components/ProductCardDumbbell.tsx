import React, { useState } from 'react';
import { ProductDetail } from '../types';
import { DUMBBELL_OPTIONS } from '../data/products';
import { soundEffects } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Dumbbell, Trophy, RotateCcw, ShieldAlert, Sparkles, ArrowRight, Zap } from 'lucide-react';

interface ProductCardDumbbellProps {
  product: ProductDetail;
  onOpenOrder: (productId: string, optionId?: string) => void;
}

export const ProductCardDumbbell: React.FC<ProductCardDumbbellProps> = ({
  product,
  onOpenOrder,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('1kg');
  const [repsRemaining, setRepsRemaining] = useState<number>(30);
  const [isSwinging, setIsSwinging] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const selectedOption =
    DUMBBELL_OPTIONS.find((opt) => opt.id === selectedOptionId) || DUMBBELL_OPTIONS[0];

  const handleShake = () => {
    if (isCompleted) return;

    setIsSwinging(true);
    setTimeout(() => setIsSwinging(false), 240);

    const nextReps = repsRemaining - 1;
    soundEffects.playShakeSound(nextReps);

    if (nextReps <= 0) {
      setRepsRemaining(0);
      setIsCompleted(true);
      soundEffects.playVictoryFanfare();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    } else {
      setRepsRemaining(nextReps);
    }
  };

  const handleReset = () => {
    soundEffects.playPop();
    setRepsRemaining(30);
    setIsCompleted(false);
  };

  const handleOptionChange = (id: string) => {
    soundEffects.playPop();
    setSelectedOptionId(id);
  };

  const progressPercent = Math.round(((30 - repsRemaining) / 30) * 100);

  return (
    <div
      id="dumbbell"
      className="scroll-mt-20 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
    >
      {/* Top Banner Header */}
      <div className="bg-neutral-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <span>ITEM 02</span>
            <span aria-hidden="true">·</span>
            <span>신체 각성 & 모닝 펌핑</span>
            <span aria-hidden="true">·</span>
            <span>6가지 맞춤 무게 옵션</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            {product.name}
          </h2>
          <p className="text-sm text-neutral-300 mt-1">
            {product.tagline}
          </p>
        </div>

        <div className="text-left md:text-right shrink-0">
          <div className="flex items-baseline md:justify-end gap-2">
            <span className="text-xs font-bold text-amber-400">선택형</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {selectedOption.price.toLocaleString()}원
            </span>
          </div>
          <span className="text-[11px] text-neutral-400">
            현재 선택: {selectedOption.name}
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* 1. Product Photo */}
          <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-950 aspect-[4/3] max-h-[500px] w-full group">
            <img
              src={product.image}
              alt={product.imageAlt}
              className={`w-full h-full object-cover transition-transform duration-200 ${
                isSwinging ? 'animate-dumbbell-swing' : 'group-hover:scale-102'
              }`}
              referrerPolicy="no-referrer"
            />

            {/* Simulated Dumbbell LCD screen */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-700 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-mono text-white">
                <span className="text-amber-400 font-bold">LCD 센서:</span>
                <span className="text-emerald-400 font-semibold">{30 - repsRemaining} / 30 회</span>
              </div>
              <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-700 px-2.5 py-1.5 rounded-lg text-xs font-medium text-amber-400">
                {selectedOption.weight}
              </div>
            </div>

            {/* Victory Overlay on Completion */}
            {isCompleted && (
              <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                <Trophy className="w-12 h-12 text-amber-400 mb-2 animate-bounce" />
                <h4 className="text-xl font-extrabold text-white">30회 완료! 알람 해제</h4>
                <p className="text-xs text-neutral-300 mt-1 max-w-xs">
                  상체 펌핑과 혈액순환으로 뇌가 100% 각성되었습니다. 성공적인 아침 시작!
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>다시 도전해보기</span>
                </button>
              </div>
            )}
          </div>

          {/* 2. Interactive Shake Console */}
          <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-neutral-900">30회 흔들기 실시간 인터랙션 체험</span>
              </div>
              <span className="text-xs font-bold text-amber-600 tabular-nums">
                {repsRemaining > 0 ? `남은 횟수: ${repsRemaining}회` : '달성 완료!'}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-neutral-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-500 h-2.5 rounded-full transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Shake Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleShake}
                disabled={isCompleted}
                className={`flex-1 py-3.5 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 text-white cursor-not-allowed'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white active:scale-95 shadow-sm'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>
                  {isCompleted
                    ? '30회 미션 완수!'
                    : `위아래로 흔들기 (클릭 / 터치 - 현재 ${30 - repsRemaining}회)`}
                </span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                title="카운트 리셋"
                className="p-3.5 bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 rounded-xl transition-colors shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-neutral-500 text-center leading-normal">
              알람이 울리면 중력 센서가 상하 30회 수직 스윙을 정확하게 감지해야만 소리가 꺼집니다.
            </p>
          </div>

          {/* 3. Product Description: Weight Selector Tabs, Features, Materials */}
          <div className="space-y-6 pt-2 border-t border-neutral-200">
            
            {/* 6 Weight Lineup Tabs */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900">
                  무게 옵션 선택 (총 6가지 라인업)
                </span>
                <span className="text-xs font-semibold text-amber-600">
                  {selectedOption.price.toLocaleString()}원
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DUMBBELL_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleOptionChange(opt.id)}
                    className={`py-2 px-3 text-left rounded-lg border text-xs transition-all ${
                      selectedOptionId === opt.id
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>{opt.weight}</span>
                      {opt.badge && (
                        <span className={`text-[10px] px-1 rounded ${selectedOptionId === opt.id ? 'bg-amber-400 text-neutral-950' : 'bg-amber-100 text-amber-800'}`}>
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <div className={`text-[11px] mt-0.5 ${selectedOptionId === opt.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {opt.price.toLocaleString()}원
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                <strong>선택 팁:</strong> {selectedOption.description}
              </p>
            </div>

            {/* Core Features */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-neutral-400 tracking-wider">
                CORE FEATURES
              </h3>
              <div className="space-y-3">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-amber-200">
                      {idx + 1}
                    </div>
                    <div>
                      <strong className="text-neutral-900 block font-semibold">
                        {feat.title}
                      </strong>
                      <p className="text-neutral-600 text-xs sm:text-sm mt-0.5 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials & Durability Callout */}
            <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>재질 및 내구성 특장점</span>
              </div>
              <ul className="text-xs text-neutral-700 space-y-1.5 list-disc list-inside">
                <li><strong className="text-neutral-900">고밀도 ABS & 실리콘 그립:</strong> 땀에 미끄러지지 않는 논슬립 그립 & 낙하 충격을 흡수하는 방진 프레임</li>
                <li><strong className="text-neutral-900">원판 커스텀 모델:</strong> 강철 스틸 고정 핀과 견고한 락킹 스크류 방식으로 중량 원판 체결 시 유격 없이 안전 고정</li>
              </ul>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenOrder(product.id, selectedOptionId)}
              className="w-full sm:flex-1 py-3.5 px-6 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>덤벨 알람시계 [{selectedOption.name}] 주문하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-xs text-neutral-500 text-center sm:text-left">
              <span>추천 대상: </span>
              <strong className="text-neutral-800">아침마다 몸이 무겁고 뇌가 안 깨는 사람</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
