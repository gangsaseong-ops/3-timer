import React, { useState, useEffect, useMemo } from 'react';
import { findSimilarFaqs } from '../data/faqs';
import { soundEffects } from '../utils/audio';
import { X, HelpCircle, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [inquiryText, setInquiryText] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setInquiryText('');
      setContactInfo('');
      setIsSubmitted(false);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const similarFaqs = useMemo(() => findSimilarFaqs(inquiryText, 3), [inquiryText]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;

    soundEffects.playPop();
    setIsSubmitted(true);
    onShowToast('문의 내용이 정상적으로 접수되었습니다.');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-lg max-h-[85vh] sm:max-h-[88vh] rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col relative animate-fadeIn">
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 shrink-0 bg-neutral-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between gap-4 border-b border-neutral-800">
          <div className="min-w-0 pr-2">
            <span className="text-[11px] font-bold text-amber-400 tracking-wide block">
              CUSTOMER INQUIRY
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-white truncate">
              제품 문의하기
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="문의 창 닫기"
            title="닫기"
            className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-6 pb-20 sm:pb-8 space-y-5 overflow-y-auto flex-1 overscroll-contain"
          >
            {/* Inquiry Textarea */}
            <div className="space-y-1.5">
              <label
                htmlFor="inquiry-textarea"
                className="text-xs font-bold text-neutral-800 flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                <span>문의 내용을 적어주세요 *</span>
              </label>
              <textarea
                id="inquiry-textarea"
                rows={4}
                required
                placeholder="예: 카펫 알람시계 세탁이 가능한가요? / 보조배터리 진동이 어느 정도인가요? / 배송 기간이 궁금합니다."
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-medium text-neutral-950 bg-white placeholder:text-neutral-500 placeholder:font-normal rounded-xl border border-neutral-300 focus:outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20 shadow-xs transition-colors resize-none"
              />
            </div>

            {/* Matching FAQ Results from "알람시계 3종 궁금증 해결" */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>비슷한 &apos;알람시계 3종 궁금증 해결&apos; 답변</span>
              </div>

              {!inquiryText.trim() ? (
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-600 leading-relaxed">
                  문의 내용을 입력하시면 <strong className="text-neutral-900">알람시계 3종 궁금증 해결</strong>에서 질문과 비슷한 답변을 바로 찾아 보여드립니다.
                </div>
              ) : similarFaqs.length > 0 ? (
                <div className="space-y-2.5">
                  {similarFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 space-y-1.5 animate-fadeIn"
                    >
                      <div className="text-xs font-extrabold text-neutral-950 leading-snug">
                        Q. {faq.q}
                      </div>
                      <p className="text-xs text-neutral-700 leading-relaxed">
                        A. {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-600 leading-relaxed">
                  입력하신 질문과 바로 일치하는 자주 묻는 질문이 없습니다. 아래에서 문의를 접수해 주시면 확인 후 답변드리겠습니다.
                </div>
              )}
            </div>

            {/* Optional Contact Input */}
            <div className="space-y-1.5 pt-2 border-t border-neutral-200">
              <label
                htmlFor="inquiry-contact"
                className="text-xs font-bold text-neutral-800 block"
              >
                답변 받으실 연락처 또는 이메일 (선택)
              </label>
              <input
                id="inquiry-contact"
                type="text"
                placeholder="예: 010-1234-5678 또는 email@example.com"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-semibold text-neutral-950 bg-white placeholder:text-neutral-500 placeholder:font-normal rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20 shadow-xs transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full py-3.5 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-amber-400/20"
              >
                <Send className="w-4 h-4" />
                <span>문의 접수하기</span>
              </button>
            </div>

            {/* Mobile portrait bottom scroll buffer */}
            <div className="h-10 sm:h-2 shrink-0" aria-hidden="true" />
          </form>
        ) : (
          /* Confirmation View */
          <div className="p-6 sm:p-8 text-center space-y-5 overflow-y-auto flex-1 overscroll-contain">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-neutral-400">문의 접수 완료</span>
              <h4 className="text-xl font-extrabold text-neutral-900">
                문의가 정상적으로 접수되었습니다!
              </h4>
              <p className="text-xs text-neutral-500">
                영업시간(평일 09:00~18:00) 기준 순차적으로 답변드리겠습니다.
              </p>
            </div>

            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-left text-xs space-y-2">
              <div>
                <span className="text-neutral-500 block mb-1">접수된 문의 내용:</span>
                <p className="font-semibold text-neutral-900 whitespace-pre-wrap leading-relaxed">
                  {inquiryText}
                </p>
              </div>
              {contactInfo.trim() && (
                <div className="flex justify-between pt-2 border-t border-neutral-200">
                  <span className="text-neutral-500">회신 연락처:</span>
                  <strong className="text-neutral-900">{contactInfo}</strong>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-xs sm:text-sm font-semibold bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl transition-colors cursor-pointer"
            >
              확인 및 닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
