import React, { useState, useEffect } from 'react';
import { ArrowDown, BellRing, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onQuizClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onQuizClick }) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white border-b border-neutral-800">
      {/* Subtle ambient gradient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.15),rgba(255,255,255,0))]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Provocative Value Proposition & Punchy Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide text-amber-400">
              <span>수면 전쟁 종결 프로젝트</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>100% 강제 기상 보장 솔루션</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>평점 4.9/5.0</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[26px] sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.25] break-keep">
              <span className="whitespace-nowrap">오늘도 알람 끄고</span>{' '}
              <span className="text-amber-400 underline decoration-amber-400/40 underline-offset-8 whitespace-nowrap">
                다시 잤나요?
              </span>
              <br />
              <span className="whitespace-nowrap">절대 안 깨고 못 배기는</span>
              <br />
              <span className="whitespace-nowrap">알람시계가 왔다!</span>
            </h1>

            {/* Subcopy */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              이동 중 지하철·버스에서 내릴 역을 놓치는 순간부터, 침대 속에서 무의식적으로 알람을 끄고 지각하는 아침까지—
              당신의 일상 수면을 완벽히 깨워줄 개성 넘치고 강력한 <strong className="text-white font-semibold">이색 알람시계 3종</strong>을 만나보세요.
            </p>

            {/* Problem checkpoints */}
            <div className="pt-2 pb-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-start gap-2 bg-neutral-900/80 border border-neutral-800 rounded-lg p-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>지하철 졸음 역 놓침 해결</span>
              </div>
              <div className="flex items-start gap-2 bg-neutral-900/80 border border-neutral-800 rounded-lg p-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>30회 모닝 덤벨 펌핑 기상</span>
              </div>
              <div className="flex items-start gap-2 bg-neutral-900/80 border border-neutral-800 rounded-lg p-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>두 발 직립 3초 강제 기상</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg shadow-amber-400/20 active:scale-[0.98]"
              >
                <span>개성 강한 알람시계 3종 보기</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <button
                onClick={onQuizClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-xl transition-colors active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>나의 잠 깨우기 유형 테스트</span>
              </button>
            </div>

            {/* Quiet social proof indicator */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 pt-2">
              <span>누적 구매 만족도 98.4%</span>
              <span aria-hidden="true">·</span>
              <span>지각률 평균 89% 감소 체감</span>
              <span aria-hidden="true">·</span>
              <span>당일 출고</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Contrast Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
              <img
                src="/src/assets/images/hero_morning_wakeup_struggle_1793685597394.jpg"
                alt="출퇴근길 지하철과 침대 속 아침 기상의 극적인 대비"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Scrim overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent pointer-events-none" />

              {/* Live Digital Clock Badge */}
              <div className="absolute top-4 right-4 bg-neutral-950/80 backdrop-blur-md border border-neutral-700/80 px-3.5 py-1.5 rounded-lg flex items-center gap-2 text-xs font-mono tabular-nums text-amber-400">
                <BellRing className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                <span>현재 시각 {time || '07:30:00'}</span>
              </div>

              {/* Floating contrast label card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-neutral-800">
                <div className="grid grid-cols-2 gap-3 text-xs divide-x divide-neutral-800">
                  <div className="space-y-1">
                    <span className="text-amber-400 font-semibold block">지하철 통근길</span>
                    <p className="text-neutral-300 text-[11px] leading-tight">
                      깜빡 졸다가 환승역 지나치는 참사 예방!
                    </p>
                  </div>
                  <div className="pl-3 space-y-1">
                    <span className="text-amber-400 font-semibold block">침대 속 아침</span>
                    <p className="text-neutral-300 text-[11px] leading-tight">
                      무의식 끄기 원천 차단! 덤벨 30회 & 3초 직립
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
