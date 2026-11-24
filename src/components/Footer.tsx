import React, { useState } from 'react';
import { soundEffects } from '../utils/audio';
import { FAQS } from '../data/faqs';
import { InquiryModal } from './InquiryModal';
import { Copy, Check, ChevronDown, ChevronUp, MessageSquare, HelpCircle, MapPin } from 'lucide-react';

const PRODUCTION_MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x357b71de217f5f4b%3A0x4e3b5d5a8bef7aa6!2z67CY7JuU6rWt6rCA7IKw7JeF64uo7KeA!5e0!3m2!1sko!2skr!4v1795499922722!5m2!1sko!2skr';

const PRODUCTION_MAP_DIRECTIONS_URL =
  'https://www.google.com/maps/place/%EB%B0%98%EC%9B%94%EA%B5%AD%EA%B0%80%EC%82%B0%EC%97%85%EB%8B%A8%EC%A7%80/data=!4m4!3m3!1s0x357b71de217f5f4b:0x4e3b5d5a8bef7aa6!16s%2Fg%2F1hb_ddy9j!20s8Q988Q8H%2B464?authuser=2&entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D';

interface FooterProps {
  onOpenOrder: () => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrder, onShowToast }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState<boolean>(false);

  const handleCopyLink = () => {
    soundEffects.playPop();
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      onShowToast('웹페이지 링크가 클립보드에 복사되었습니다! 친구들에게 공유해보세요.');
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      onShowToast('링크 복사 완료!');
    });
  };

  const handleOpenInquiry = () => {
    soundEffects.playPop();
    setInquiryModalOpen(true);
  };

  const handleDirectionsClick = () => {
    soundEffects.playPop();
  };

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-800">
      
      {/* Bottom CTA Banner */}
      <div className="border-b border-neutral-800 bg-gradient-to-b from-neutral-900/60 to-neutral-950 py-16 px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-amber-400">
            WAKE UP REVOLUTION
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            아침마다 지각과 자책으로 괴로웠던 날들,<br />
            이제 확실하게 끝내세요!
          </h3>
          <p className="text-sm text-neutral-400">
            지하철에서 내릴 역을 놓치지 않는 보조배터리부터, 두 발로 일어서야만 꺼지는 카펫까지.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onOpenOrder}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg shadow-amber-400/20 active:scale-95"
          >
            지금 알람시계 주문하고 수면 탈출하기
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '링크 복사 완료' : '친구에게 페이지 공유하기'}</span>
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>자주 묻는 질문 (FAQ)</span>
          </div>
          <h4 className="text-xl font-bold text-white">알람시계 3종 궁금증 해결</h4>
        </div>

        <div className="divide-y divide-neutral-800 border-y border-neutral-800">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full text-left flex items-center justify-between text-sm sm:text-base font-semibold text-neutral-200 hover:text-white transition-colors"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0 ml-2" />
                )}
              </button>
              {openFaqIndex === idx && (
                <p className="mt-2.5 text-xs sm:text-sm text-neutral-400 leading-relaxed pl-1 animate-fadeIn">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Production Location Map Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-5">
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>생산 거점 안내</span>
          </div>
          <h4 className="text-xl font-bold text-white">반월국가산업단지 생산 위치</h4>
        </div>

        <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-lg">
          <iframe
            src={PRODUCTION_MAP_EMBED_URL}
            title="반월국가산업단지 생산 위치 지도"
            className="w-full h-[320px] sm:h-[450px] border-0 block"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>

      {/* Social Sharing & Copyright */}
      <div className="border-t border-neutral-800/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
        
        {/* SNS Buttons & AI Notice */}
        <div className="flex flex-col items-center md:items-start gap-2.5">
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <span className="text-neutral-500 font-medium">SNS 공유:</span>
            
            <button
              type="button"
              onClick={handleOpenInquiry}
              className="px-3 py-1.5 bg-amber-400 text-neutral-950 font-bold rounded-lg hover:bg-amber-300 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>문의하기</span>
            </button>

            <a
              href={PRODUCTION_MAP_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDirectionsClick}
              className="px-3 py-1.5 bg-neutral-800 text-neutral-200 hover:text-white font-medium rounded-lg hover:bg-neutral-700 transition-all text-xs flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>오시는 길</span>
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-neutral-800 text-neutral-200 hover:text-white font-medium rounded-lg hover:bg-neutral-700 transition-all text-xs flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>URL 복사</span>
            </button>
          </div>
          <p className="text-[11px] text-neutral-500 text-center md:text-left">
            본 웹사이트는 AI를 이용하여 제작되었습니다.
          </p>
        </div>

        {/* Legal & Wordmark */}
        <div className="text-center md:text-right space-y-1">
          <div className="font-semibold text-neutral-300">
            절대 안 깨고 못 배기는 개성 강한 알람시계 3종
          </div>
          <div className="text-neutral-500 text-[11px]">
            © 2026 WakeUp 3 Inc. All rights reserved. | 고객센터: 1588-0000 (평일 09:00~18:00)
          </div>
        </div>

      </div>

      {/* Inquiry Modal with FAQ Similarity Search */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        onShowToast={onShowToast}
      />
    </footer>
  );
};
