import React, { useState, useRef, useEffect } from 'react';
import { ProductDetail } from '../types';
import { soundEffects } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Footprints, Volume2, VolumeX, ShieldCheck, CheckCircle2, RotateCcw, ArrowRight, HeartHandshake } from 'lucide-react';

interface ProductCardCarpetProps {
  product: ProductDetail;
  onOpenOrder: (productId: string) => void;
}

export const ProductCardCarpet: React.FC<ProductCardCarpetProps> = ({
  product,
  onOpenOrder,
}) => {
  const [isAlarmPlaying, setIsAlarmPlaying] = useState<boolean>(false);
  const [isPressing, setIsPressing] = useState<boolean>(false);
  const [pressProgress, setPressProgress] = useState<number>(0);
  const [isCleared, setIsCleared] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>(
    '먼저 [🚨 알람 울리기]를 누른 후, [두 발로 꾹 딛고 서기]를 3초간 꾹 눌러보세요.'
  );

  const pressIntervalRef = useRef<number | null>(null);

  // Clean up sounds on unmount
  useEffect(() => {
    return () => {
      soundEffects.stopCarpetAlarm();
      if (pressIntervalRef.current) {
        window.clearInterval(pressIntervalRef.current);
      }
    };
  }, []);

  const handleStartAlarm = () => {
    setIsCleared(false);
    setPressProgress(0);
    setIsAlarmPlaying(true);
    soundEffects.startCarpetAlarm();
    setFeedbackMessage('🚨 삐삐삐삐-! 시끄러운 알람 작동 중! 두 발로 3초간 서 있어야만 꺼집니다!');
  };

  const handleStopAlarmManual = () => {
    setIsAlarmPlaying(false);
    soundEffects.stopCarpetAlarm();
    setFeedbackMessage('알람이 수동으로 중지되었습니다.');
  };

  const handlePressStart = () => {
    if (isCleared) return;
    if (!isAlarmPlaying) {
      handleStartAlarm();
    }

    setIsPressing(true);
    setFeedbackMessage('👣 두 발로 체중을 싣고 서 있는 중... (3초간 유지하세요!)');

    const startTime = Date.now();
    const duration = 3000;

    if (pressIntervalRef.current) window.clearInterval(pressIntervalRef.current);

    pressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setPressProgress(progress);

      if (progress >= 100) {
        if (pressIntervalRef.current) window.clearInterval(pressIntervalRef.current);
        setIsPressing(false);
        setIsAlarmPlaying(false);
        setIsCleared(true);
        soundEffects.playPeacefulChime();
        setFeedbackMessage('🎉 3초 체중 감지 완료! 알람이 해제되었습니다. 완벽한 기상 성공!');

        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.65 },
          });
        } catch {
          // ignore
        }
      }
    }, 50);
  };

  const handlePressEnd = () => {
    if (isCleared) return;
    setIsPressing(false);

    if (pressIntervalRef.current) {
      window.clearInterval(pressIntervalRef.current);
      pressIntervalRef.current = null;
    }

    if (pressProgress < 100) {
      setPressProgress(0);
      setFeedbackMessage('⚠️ 3초를 다 채우기 전에 발을 떼셨습니다! 침대에 다시 눕지 말고 3초를 꽉 채워 서 계세요!');
    }
  };

  return (
    <div
      id="carpet"
      className="scroll-mt-20 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
    >
      {/* Top Banner Header */}
      <div className="bg-neutral-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <span>ITEM 03</span>
            <span aria-hidden="true">·</span>
            <span>직립 보행 강제 시스템</span>
            <span aria-hidden="true">·</span>
            <span>150kg 하중 내구성 메모리폼</span>
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
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {product.priceFormatted}
            </span>
          </div>
          <span className="text-[11px] text-neutral-400">지퍼 분리형 초극세사 벨벳 커버</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* 1. Product Photo */}
          <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-950 aspect-[4/3] max-h-[500px] w-full group">
            <img
              src={product.image}
              alt={product.imageAlt}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isAlarmPlaying ? 'animate-siren-ring' : 'group-hover:scale-102'
              }`}
              referrerPolicy="no-referrer"
            />

            {/* Glowing clock display simulation */}
            <div className="absolute bottom-6 right-6 pointer-events-none">
              <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-700 px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-xs font-mono text-amber-400">
                <span>침대 옆 매트 알람</span>
                <span className="text-white font-bold">07:15 AM</span>
              </div>
            </div>

            {/* Status indicators */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-700 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs text-neutral-200">
                <Footprints className="w-3.5 h-3.5 text-amber-400" />
                <span>체중 감지 센서 {isPressing ? '82kg 가압 중' : '대기 중'}</span>
              </div>
              {isAlarmPlaying && (
                <div className="bg-red-500/90 text-white px-2.5 py-1 rounded-md text-[11px] font-bold animate-pulse">
                  ALARM RINGING
                </div>
              )}
            </div>
          </div>

          {/* 2. Interactive Footstep Pressure Console */}
          <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Footprints className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-neutral-900">
                  직립 3초 압력 해제 시뮬레이션
                </span>
              </div>
              <span className="text-xs font-bold text-amber-600 tabular-nums">
                {pressProgress}% / 100%
              </span>
            </div>

            {/* Pressure gauge bar */}
            <div className="w-full bg-neutral-200 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-75 ${
                  pressProgress >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${pressProgress}%` }}
              />
            </div>

            {/* Two Feet Interactive Press Pad */}
            <div className="space-y-2">
              <div
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
                className={`cursor-pointer select-none border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-150 ${
                  isPressing
                    ? 'bg-amber-100 border-amber-500 scale-[0.98] shadow-inner'
                    : isCleared
                    ? 'bg-emerald-50 border-emerald-500'
                    : 'bg-white border-neutral-300 hover:border-amber-400 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-6">
                  {/* Left Foot */}
                  <div
                    className={`w-10 h-16 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isPressing
                        ? 'border-amber-600 bg-amber-200 text-amber-900'
                        : isCleared
                        ? 'border-emerald-600 bg-emerald-200 text-emerald-900'
                        : 'border-neutral-300 bg-neutral-100 text-neutral-400'
                    }`}
                  >
                    <span className="text-[10px] font-bold">L</span>
                  </div>

                  {/* Center Label */}
                  <div className="text-center">
                    <span className="text-xs font-bold text-neutral-900 block">
                      {isCleared
                        ? '기상 완료! 알람 꺼짐'
                        : isPressing
                        ? '두 발로 버티는 중...'
                        : '👣 여기를 3초간 꾹 누르고 계세요 (두 발 직립)'}
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">
                      {isPressing ? `진행률: ${pressProgress}%` : '마우스 또는 손가락으로 누른 상태 유지'}
                    </span>
                  </div>

                  {/* Right Foot */}
                  <div
                    className={`w-10 h-16 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isPressing
                        ? 'border-amber-600 bg-amber-200 text-amber-900'
                        : isCleared
                        ? 'border-emerald-600 bg-emerald-200 text-emerald-900'
                        : 'border-neutral-300 bg-neutral-100 text-neutral-400'
                    }`}
                  >
                    <span className="text-[10px] font-bold">R</span>
                  </div>
                </div>
              </div>

              {/* Sound Controls */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={isAlarmPlaying ? handleStopAlarmManual : handleStartAlarm}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border ${
                    isAlarmPlaying
                      ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {isAlarmPlaying ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-red-600" />
                      <span>알람 소리 끄기 (일시정지)</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>🔊 알람 사운드 테스트 울리기</span>
                    </>
                  )}
                </button>

                {isCleared && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCleared(false);
                      setPressProgress(0);
                      setFeedbackMessage('새로운 기상 도전을 위해 초기화되었습니다.');
                    }}
                    className="py-2 px-3 rounded-lg text-xs font-semibold bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>초기화</span>
                  </button>
                )}
              </div>

              <p className="text-[11px] text-neutral-500 text-center leading-normal">
                {feedbackMessage}
              </p>
            </div>
          </div>

          {/* 3. Product Description: Features, Materials, Durability */}
          <div className="space-y-6 pt-2 border-t border-neutral-200">
            
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
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>재질 및 내구성 특장점</span>
              </div>
              <ul className="text-xs text-neutral-700 space-y-1.5 list-disc list-inside">
                <li><strong className="text-neutral-900">고밀도 메모리폼 & 초극세사 벨벳:</strong> 부드러운 감촉으로 아침 발걸음을 편안하게 감싸며 분리 세탁 가능</li>
                <li><strong className="text-neutral-900">150kg 하중 지속 감지 패널:</strong> 강한 체중이 반복되어도 센서 왜곡이나 고장이 없는 고신뢰성 압력 필름 탑재</li>
                <li><strong className="text-neutral-900">논슬립 실리콘 패드:</strong> 바닥 밀림을 차단하여 잠결에 미끄러져 넘어질 위험 원천 차단</li>
              </ul>
            </div>

            {/* Specs Grid */}
            <div className="border-t border-neutral-200 pt-4">
              <h4 className="text-xs font-bold text-neutral-400 mb-2">상세 스펙 요약</h4>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                {product.specs.slice(0, 6).map((spec, sIdx) => (
                  <div key={sIdx} className="flex justify-between py-1 border-b border-neutral-100">
                    <dt className="text-neutral-500">{spec.label}</dt>
                    <dd className="font-medium text-neutral-900 text-right truncate max-w-[55%]">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenOrder(product.id)}
              className="w-full sm:flex-1 py-3.5 px-6 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>카펫 알람시계 [15,000원] 주문하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-xs text-neutral-500 text-center sm:text-left">
              <span>추천 대상: </span>
              <strong className="text-neutral-800">알람 끄고 무의식 중에 다시 잠드는 사람</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
