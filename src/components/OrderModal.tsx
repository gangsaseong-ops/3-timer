import React, { useState, useEffect } from 'react';
import { ProductId } from '../types';
import { PRODUCTS, DUMBBELL_OPTIONS } from '../data/products';
import { soundEffects } from '../utils/audio';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, ShieldCheck, Truck, ArrowRight, Minus, Plus, CreditCard, Landmark, Lock } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  initialProductId?: ProductId;
  initialOptionId?: string;
  onClose: () => void;
  onSuccessToast: (msg: string) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  initialProductId = 'powerbank',
  initialOptionId = '1kg',
  onClose,
  onSuccessToast,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<ProductId>(initialProductId);
  const [selectedDumbbellOption, setSelectedDumbbellOption] = useState<string>(initialOptionId);
  const [quantity, setQuantity] = useState<number>(1);

  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [deliveryRequest, setDeliveryRequest] = useState<string>('');
  
  // Payment Method States
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [cardInstallment, setCardInstallment] = useState<string>('일시불');
  const [bankName, setBankName] = useState<string>('카카오뱅크');
  const [bankAccountNumber, setBankAccountNumber] = useState<string>('');
  const [bankDepositor, setBankDepositor] = useState<string>('');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setSelectedProductId(initialProductId);
      if (initialOptionId) setSelectedDumbbellOption(initialOptionId);
      setQuantity(1);
      setIsSubmitted(false);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, initialProductId, initialOptionId, onClose]);

  if (!isOpen) return null;

  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const currentPrice =
    selectedProductId === 'dumbbell'
      ? DUMBBELL_OPTIONS.find((o) => o.id === selectedDumbbellOption)?.price || 10000
      : currentProduct.price;

  const totalPrice = currentPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('주문자 성함과 연락처를 입력해주세요.');
      return;
    }

    const generatedOrderNum = `WK-${Date.now().toString().slice(-6)}`;
    setOrderNumber(generatedOrderNum);
    setIsSubmitted(true);
    soundEffects.playVictoryFanfare();

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }

    onSuccessToast(`[주문 완료] 주문번호 ${generatedOrderNum}가 성공적으로 접수되었습니다!`);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-lg max-h-[85vh] sm:max-h-[88vh] rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col relative animate-fadeIn">
        
        {/* Modal Header: Sticky at the top, Title on left, Prominent X on the right on the same row */}
        <div className="sticky top-0 z-20 shrink-0 bg-neutral-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between gap-4 border-b border-neutral-800">
          <div className="min-w-0 pr-2">
            <span className="text-[11px] font-bold text-amber-400 tracking-wide block">ORDER & RESERVATION</span>
            <h3 className="text-base sm:text-lg font-extrabold text-white truncate">수면 탈출 알람시계 주문하기</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="주문 창 닫기"
            title="닫기 (상품 보기로 돌아가기)"
            className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 pb-20 sm:pb-8 space-y-5 overflow-y-auto flex-1 overscroll-contain">
            {/* 1. Product Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-800 block">
                1. 알람시계 모델 선택
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => {
                      soundEffects.playPop();
                      if (selectedProductId !== prod.id) {
                        setSelectedProductId(prod.id);
                        setQuantity(1);
                      }
                    }}
                    className={`p-2.5 text-left rounded-xl border text-xs transition-all ${
                      selectedProductId === prod.id
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="font-bold truncate">{prod.shortName}</div>
                    <div className={`text-[11px] mt-0.5 ${selectedProductId === prod.id ? 'text-amber-400' : 'text-neutral-500'}`}>
                      {prod.priceFormatted}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Dumbbell weight selector if dumbbell is active */}
            {selectedProductId === 'dumbbell' && (
              <div className="space-y-2 bg-amber-50/50 p-3 rounded-xl border border-amber-200">
                <label className="text-xs font-bold text-amber-900 block">
                  덤벨 무게 옵션 선택
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {DUMBBELL_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        soundEffects.playPop();
                        setSelectedDumbbellOption(opt.id);
                      }}
                      className={`p-1.5 rounded-lg text-xs font-semibold border transition-all text-center ${
                        selectedDumbbellOption === opt.id
                          ? 'bg-amber-500 text-neutral-950 border-amber-500 font-bold'
                          : 'bg-white text-neutral-700 border-neutral-200'
                      }`}
                    >
                      {opt.weight} ({opt.price.toLocaleString()}원)
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Quantity & Pricing */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 border border-neutral-300 text-xs">
              <span className="font-bold text-neutral-900 text-sm">수량 선택</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="수량 감소"
                  onClick={() => {
                    soundEffects.playPop();
                    setQuantity(Math.max(1, quantity - 1));
                  }}
                  className="w-8 h-8 rounded-lg bg-white border-2 border-neutral-900 text-neutral-950 flex items-center justify-center hover:bg-neutral-100 active:scale-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-950 cursor-pointer"
                >
                  <Minus className="w-4 h-4 text-neutral-950 stroke-[3]" />
                </button>
                <span className="font-extrabold text-neutral-950 text-base tabular-nums min-w-[2.5rem] text-center">
                  {quantity}개
                </span>
                <button
                  type="button"
                  aria-label="수량 증가"
                  onClick={() => {
                    soundEffects.playPop();
                    setQuantity(quantity + 1);
                  }}
                  className="w-8 h-8 rounded-lg bg-white border-2 border-neutral-900 text-neutral-950 flex items-center justify-center hover:bg-neutral-100 active:scale-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-950 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-neutral-950 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* 4. Customer Info Fields */}
            <div className="space-y-3.5 pt-1">
              <div>
                <label className="text-xs font-bold text-neutral-800 block mb-1">
                  주문자 성함 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-semibold text-neutral-950 bg-white placeholder:text-neutral-500 placeholder:font-normal rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20 shadow-xs transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-800 block mb-1">
                  연락처 (휴대폰 번호) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-semibold text-neutral-950 bg-white placeholder:text-neutral-500 placeholder:font-normal rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20 shadow-xs transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-800 block mb-1">
                  배송지 주소 (세부주소)
                </label>
                <input
                  type="text"
                  placeholder="예: 서울시 강남구 테헤란로 123, 101동 202호"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-semibold text-neutral-950 bg-white placeholder:text-neutral-500 placeholder:font-normal rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20 shadow-xs transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-800 block mb-1">
                  배송 요청사항
                </label>
                <input
                  type="text"
                  placeholder="예: 문 앞 보관 부탁드립니다 / 부재 시 경비실"
                  value={deliveryRequest}
                  onChange={(e) => setDeliveryRequest(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-semibold text-neutral-950 bg-white placeholder:text-neutral-500 placeholder:font-normal rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20 shadow-xs transition-colors"
                />
              </div>
            </div>

            {/* 5. 결제수단 (Payment Method) */}
            <div className="space-y-3.5 pt-3 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-800 block">
                  5. 결제수단 선택 및 정보 입력
                </label>
                <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-neutral-400" />
                  SSL 256bit 암호화
                </span>
              </div>

              {/* Payment Type Selection Tabs */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setPaymentMethod('card');
                  }}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>신용 / 체크카드</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setPaymentMethod('bank');
                  }}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'bank'
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <Landmark className="w-4 h-4" />
                  <span>계좌이체 / 무통장</span>
                </button>
              </div>

              {/* Card Inputs Form */}
              {paymentMethod === 'card' && (
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3 animate-fadeIn">
                  <div>
                    <label className="text-[11px] font-bold text-neutral-800 block mb-1">
                      카드 번호 (16자리)
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="예: 1234-5678-9012-3456"
                      value={cardNumber}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
                        const formatted = raw.match(/.{1,4}/g)?.join('-') || raw;
                        setCardNumber(formatted);
                      }}
                      className="w-full px-3.5 py-2.5 text-sm font-semibold text-neutral-950 bg-white placeholder:text-neutral-500 placeholder:font-normal rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20 shadow-xs transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-neutral-800 block mb-1">
                        유효기간 (MM/YY)
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="예: 08/28"
                        value={cardExpiry}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
                          const formatted = raw.length >= 3 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw;
                          setCardExpiry(formatted);
                        }}
                        className="w-full px-3.5 py-2.5 text-sm font-semibold text-neutral-950 bg-white placeholder:text-neutral-500 placeholder:font-normal rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20 shadow-xs transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-neutral-800 block mb-1">
                        CVC (뒷면 3자리)
                      </label>
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="예: 123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        className="w-full px-3.5 py-2.5 text-sm font-semibold text-neutral-950 bg-white placeholder:text-neutral-500 placeholder:font-normal rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20 shadow-xs transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-neutral-800 block mb-1">
                      할부 선택
                    </label>
                    <select
                      value={cardInstallment}
                      onChange={(e) => setCardInstallment(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-semibold text-neutral-950 bg-white rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20 shadow-xs transition-colors"
                    >
                      <option value="일시불">일시불 (무이자)</option>
                      <option value="2개월 무이자">2개월 (무이자)</option>
                      <option value="3개월 무이자">3개월 (무이자)</option>
                      <option value="6개월">6개월 할부</option>
                      <option value="12개월">12개월 할부</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Bank Transfer Inputs Form */}
              {paymentMethod === 'bank' && (
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3 animate-fadeIn">
                  <div>
                    <label className="text-[11px] font-bold text-neutral-800 block mb-1">
                      이체 은행 선택
                    </label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-semibold text-neutral-950 bg-white rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20 shadow-xs transition-colors"
                    >
                      <option value="카카오뱅크">카카오뱅크</option>
                      <option value="토스뱅크">토스뱅크</option>
                      <option value="KB국민은행">KB국민은행</option>
                      <option value="신한은행">신한은행</option>
                      <option value="우리은행">우리은행</option>
                      <option value="NH농협은행">NH농협은행</option>
                      <option value="하나은행">하나은행</option>
                      <option value="IBK기업은행">IBK기업은행</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-neutral-800 block mb-1">
                      환불/입금 계좌번호
                    </label>
                    <input
                      type="text"
                      placeholder="예: 3333-01-1234567"
                      value={bankAccountNumber}
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-semibold text-neutral-950 bg-white placeholder:text-neutral-500 placeholder:font-normal rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20 shadow-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-neutral-800 block mb-1">
                      예금주명 (주문자 성함 권장)
                    </label>
                    <input
                      type="text"
                      placeholder="예: 홍길동"
                      value={bankDepositor}
                      onChange={(e) => setBankDepositor(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-semibold text-neutral-950 bg-white placeholder:text-neutral-500 placeholder:font-normal rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20 shadow-xs transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Total Summary */}
            <div className="pt-3 border-t border-neutral-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>배송비</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  무료 배송
                </span>
              </div>
              <div className="flex items-center justify-between text-base font-extrabold text-neutral-900">
                <span>최종 결제 예정 금액</span>
                <span className="text-amber-600 text-xl tabular-nums">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* Submit Button with bottom clearance */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-amber-400/20"
              >
                <span>{totalPrice.toLocaleString()}원 주문 접수하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Extra bottom scroll margin on mobile portrait */}
            <div className="h-10 sm:h-2 shrink-0" aria-hidden="true" />
          </form>
        ) : (
          /* Confirmation Screen */
          <div className="p-6 sm:p-8 text-center space-y-5 overflow-y-auto flex-1 overscroll-contain">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-neutral-400">주문 접수 완료</span>
              <h4 className="text-xl font-extrabold text-neutral-900">
                {customerName}님의 수면 탈출 주문이 완료되었습니다!
              </h4>
              <p className="text-xs text-neutral-500">
                주문번호: <strong className="text-neutral-800 font-mono">{orderNumber}</strong>
              </p>
            </div>

            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">주문 상품:</span>
                <strong className="text-neutral-900">
                  {currentProduct.name}{' '}
                  {selectedProductId === 'dumbbell' && `(${selectedDumbbellOption})`}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">주문 수량:</span>
                <strong className="text-neutral-900">{quantity}개</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">결제 금액:</span>
                <strong className="text-amber-600 font-bold text-sm">
                  {totalPrice.toLocaleString()}원 (무료 배송)
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">결제 수단:</span>
                <strong className="text-neutral-900">
                  {paymentMethod === 'card'
                    ? `신용/체크카드 (${cardInstallment}${cardNumber ? ` · 끝자리 ${cardNumber.slice(-4)}` : ''})`
                    : `${bankName} 계좌이체${bankDepositor ? ` (예금주: ${bankDepositor})` : ''}`}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">발송 예정일:</span>
                <strong className="text-neutral-800">당일 오후 4시 이전 주문 당일 출고</strong>
              </div>
              {shippingAddress && (
                <div className="flex justify-between pt-1 border-t border-neutral-200">
                  <span className="text-neutral-500 shrink-0">배송지:</span>
                  <strong className="text-neutral-900 text-right truncate max-w-[65%] pl-2">{shippingAddress}</strong>
                </div>
              )}
              {deliveryRequest && (
                <div className="flex justify-between">
                  <span className="text-neutral-500 shrink-0">요청사항:</span>
                  <strong className="text-neutral-900 text-right truncate max-w-[65%] pl-2">{deliveryRequest}</strong>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-xs sm:text-sm font-semibold bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl transition-colors"
            >
              확인 및 닫기
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
