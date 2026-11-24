import React, { useState, useEffect } from 'react';
import { ProductDetail } from '../types';
import { soundEffects } from '../utils/audio';
import { BatteryCharging, Vibrate, VolumeX, ShieldCheck, Check, Sparkles, Train, ArrowRight } from 'lucide-react';

interface ProductCardPowerbankProps {
  product: ProductDetail;
  onOpenOrder: (productId: string) => void;
  onShowToast?: (msg: string) => void;
}

export const ProductCardPowerbank: React.FC<ProductCardPowerbankProps> = ({
  product,
  onOpenOrder,
  onShowToast,
}) => {
  const [isVibrating, setIsVibrating] = useState(false);
  const [isSilentMode, setIsSilentMode] = useState(false);
  const [deviceVibrated, setDeviceVibrated] = useState(false);
  const [batteryPercent, setBatteryPercent] = useState(87);
  const [currentTime, setCurrentTime] = useState('07:42');
  const [selectedStationTimer, setSelectedStationTimer] = useState<number>(15);
  const [demoStatusText, setDemoStatusText] = useState('진동 체감 버튼을 눌러 스텔스 진동력을 직접 느껴보세요');

  // Clock tick effect
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      );
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleTriggerVibration = () => {
    if (isVibrating) return;

    setIsVibrating(true);
    setIsSilentMode(false);
    setDeviceVibrated(false);
    setDemoStatusText('📳 [체감 중] 손과 가방 전체를 울리는 초강력 진동 모터 작동! (알람음 0dB)');

    let silentDetected = false;
    soundEffects.startVibration(
      3000,
      () => {
        setIsVibrating(false);
        setDeviceVibrated(false);
        if (!silentDetected) {
          setDemoStatusText('체험 완료! 조용한 지하철이나 도서관에서도 완벽히 혼자서만 깹니다.');
        }
      },
      (status) => {
        setDeviceVibrated(status.vibrated && status.isMobile);
        if (status.isSilent) {
          silentDetected = true;
          setIsSilentMode(true);
          setDemoStatusText('🔇 무음 상태입니다. 휴대폰의 무음/방해금지 또는 진동 설정을 확인해주세요.');
          onShowToast?.('무음 상태입니다.');
        } else if (status.isMobile && status.vibrated) {
          setDemoStatusText('📳 [실제 휴대폰 진동 작동 중] 모바일 진동 모터로 스텔스 진동을 체감해보세요!');
        }
      }
    );
  };

  const handleSimulateStation = (mins: number) => {
    setSelectedStationTimer(mins);
    soundEffects.playPop();
    setDemoStatusText(`📍 [${mins}분 타이머 설정 완료] 내릴 역 3분 전 초강력 스텔스 진동이 예약되었습니다.`);
  };

  return (
    <div
      id="powerbank"
      className="scroll-mt-20 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
    >
      {/* Top Banner Header */}
      <div className="bg-neutral-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <span>ITEM 01</span>
            <span aria-hidden="true">·</span>
            <span>지하철 & 통근길 특화</span>
            <span aria-hidden="true">·</span>
            <span>4-in-1 케이블 & 스텔스 진동 알람</span>
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
          <span className="text-[11px] text-neutral-400">무료 배송 · 당일 발송 가능</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* 1. Product Photo */}
          <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-900 aspect-[4/3] max-h-[500px] w-full group">
            <img
              src={product.image}
              alt={product.imageAlt}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isVibrating ? 'animate-vibrate scale-102' : 'group-hover:scale-102'
              }`}
              referrerPolicy="no-referrer"
            />

            {/* Subtle Subway Context Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-700/70 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs text-neutral-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-semibold text-white">지하철 실착 모드</span>
              </div>

              <div className="bg-neutral-950/85 backdrop-blur-md border border-neutral-700/70 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-[11px] text-neutral-300">
                <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                <span>무소음 스텔스</span>
              </div>
            </div>

            {/* Active Vibration Ripple Visual Effect */}
            {isVibrating && (
              <div className="absolute inset-0 border-4 border-amber-400/80 rounded-xl pointer-events-none animate-ping" />
            )}
          </div>

          {/* 2. Interactive Simulation Console */}
          <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Vibrate className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-neutral-900">스텔스 진동 & 타이머 인터랙티브 체험</span>
              </div>
              <span className="text-[11px] text-neutral-500">소리 0dB / 모터 진동 100%</span>
            </div>

            {/* Station Preset Timer Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-neutral-600">
                <span className="flex items-center gap-1">
                  <Train className="w-3.5 h-3.5 text-neutral-500" />
                  내릴 정거장 도착 타이머 설정:
                </span>
                <span className="font-semibold text-neutral-900">{selectedStationTimer}분 후 진동</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[10, 15, 25].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => handleSimulateStation(mins)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                      selectedStationTimer === mins
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {mins}분 퀵설정
                  </button>
                ))}
              </div>
            </div>

            {/* Test Trigger Button */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleTriggerVibration}
                disabled={isVibrating}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  isVibrating
                    ? 'bg-amber-500 text-neutral-950 animate-pulse cursor-wait'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm active:scale-[0.99]'
                }`}
              >
                <Vibrate className="w-4 h-4 text-amber-400" />
                <span>{isVibrating ? '초강력 햅틱 진동 작동 중...' : '📳 진동 체감해보기 (클릭)'}</span>
              </button>

              {isSilentMode && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 flex items-center gap-2 text-xs font-bold text-red-700 animate-fadeIn">
                  <VolumeX className="w-4 h-4 text-red-600 shrink-0" />
                  <span>무음 상태입니다. 휴대폰의 무음/방해금지 또는 진동 설정을 확인해주세요.</span>
                </div>
              )}

              {isVibrating && deviceVibrated && !isSilentMode && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2 flex items-center justify-center gap-2 text-xs font-bold text-amber-900 animate-fadeIn">
                  <Vibrate className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>휴대폰 실제 진동이 울리고 있습니다!</span>
                </div>
              )}

              <p className="text-[11px] text-neutral-500 text-center leading-normal">
                {demoStatusText}
              </p>
            </div>
          </div>

          {/* 3. Product Description: Key Features, Tech Specs, Durability */}
          <div className="space-y-6 pt-2 border-t border-neutral-200">
            {/* 3 Core Mechanisms */}
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
            <div className="bg-amber-50/60 rounded-xl border border-amber-200/80 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>재질 및 내구성 검증</span>
              </div>
              <ul className="text-xs text-neutral-700 space-y-1.5 list-disc list-inside">
                <li><strong className="text-neutral-900">내구성 강화 매트 블랙 바디:</strong> 가방 속 열쇠, 펜, 텀블러와의 마찰 스크래치를 방지하는 하드코팅 & 스트랩 일체형</li>
                <li><strong className="text-neutral-900">초강력 내구성:</strong> 일상 충격 방지 실리콘 내부 패킹 및 과충전·과방전·과열 방지 9중 안전 회로</li>
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
              <span>스텔스 알람 탑제 보조배터리 구매 / 신청</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-xs text-neutral-500 text-center sm:text-left">
              <span>권장 대상: </span>
              <strong className="text-neutral-800">지하철/버스에서 졸다 역 놓치는 통근족</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
