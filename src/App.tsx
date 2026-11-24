import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCardPowerbank } from './components/ProductCardPowerbank';
import { ProductCardDumbbell } from './components/ProductCardDumbbell';
import { ProductCardCarpet } from './components/ProductCardCarpet';
import { ComparisonTable } from './components/ComparisonTable';
import { SleepQuiz } from './components/SleepQuiz';
import { OrderModal } from './components/OrderModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { MobileScrollbar } from './components/MobileScrollbar';
import { PRODUCTS } from './data/products';
import { ProductId } from './types';
import { soundEffects } from './utils/audio';
import { ArrowDown } from 'lucide-react';

export default function App() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<ProductId>('powerbank');
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>('1kg');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const powerbankProduct = PRODUCTS.find((p) => p.id === 'powerbank')!;
  const dumbbellProduct = PRODUCTS.find((p) => p.id === 'dumbbell')!;
  const carpetProduct = PRODUCTS.find((p) => p.id === 'carpet')!;

  const handleOpenOrder = (productId?: string, optionId?: string) => {
    if (productId && (productId === 'powerbank' || productId === 'dumbbell' || productId === 'carpet')) {
      setSelectedProductId(productId as ProductId);
    }
    if (optionId) {
      setSelectedOptionId(optionId);
    }
    setOrderModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToProduct = (productId: ProductId) => {
    scrollToSection(productId);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* Header adhering to Top Bar Contract */}
      <Header onOpenOrder={() => handleOpenOrder()} />

      {/* Hero Section */}
      <Hero
        onExploreClick={() => scrollToSection('products-overview')}
        onQuizClick={() => scrollToSection('quiz')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Section Lead In & 3-Column Tall Product Quick Jump */}
        <section
          id="products-overview"
          className="scroll-mt-20 py-12 sm:py-16 bg-neutral-900 border-b border-neutral-800 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl mx-auto space-y-3 text-center">
            <span className="text-xs font-semibold text-amber-400">
              FEATURED COLLECTION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              개성 강한 알람시계 3종 상세 라인업
            </h2>
            <p className="text-sm text-neutral-400">
              각 상황에 맞춘 강력한 인터랙티브 기상 장치들을 직접 체험해보고 나에게 맞는 아이템을 골라보세요.
            </p>
          </div>

          {/* Hidden on mobile portrait & landscape, 3 tall cards side-by-side on tablet/desktop */}
          <div className="product-quick-jump grid-cols-3 max-w-5xl mx-auto mt-10 gap-5 lg:gap-6 items-stretch">
            {PRODUCTS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  handleNavigateToProduct(item.id);
                }}
                className="group text-left bg-neutral-950 rounded-2xl border border-neutral-800 hover:border-amber-400/80 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                {/* Image Slot: 16:10 on mobile stack, 3:4 tall portrait on sm+ */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[3/4] overflow-hidden bg-neutral-900">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Product Name & Jump Cue */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-amber-400 block">
                      0{idx + 1} · {item.shortName}
                    </span>
                    <h3 className="text-base sm:text-sm lg:text-base font-bold text-white leading-snug break-keep group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <div className="pt-2.5 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-neutral-400 group-hover:text-amber-400 transition-colors">
                    <span>상세 설명 바로가기</span>
                    <ArrowDown className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-y-0.5" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 3 Detailed Product Cards Container */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
          {/* Product 1: Powerbank */}
          <ProductCardPowerbank
            product={powerbankProduct}
            onOpenOrder={(id) => handleOpenOrder(id)}
            onShowToast={(msg) => setToastMessage(msg)}
          />

          {/* Product 2: Dumbbell */}
          <ProductCardDumbbell
            product={dumbbellProduct}
            onOpenOrder={(id, opt) => handleOpenOrder(id, opt)}
          />

          {/* Product 3: Carpet */}
          <ProductCardCarpet
            product={carpetProduct}
            onOpenOrder={(id) => handleOpenOrder(id)}
          />
        </div>

        {/* 3-Way Comparison Table */}
        <ComparisonTable onSelectProduct={handleNavigateToProduct} />

        {/* Interactive Sleep Quiz: 나의 잠 깨우기 유형 테스트 */}
        <SleepQuiz
          onNavigateToProduct={handleNavigateToProduct}
          onOpenOrder={(id) => handleOpenOrder(id)}
        />
      </main>

      {/* Footer with FAQ, SNS share & bottom CTA */}
      <Footer
        onOpenOrder={() => handleOpenOrder()}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      {/* Order & Reservation Modal */}
      <OrderModal
        isOpen={orderModalOpen}
        initialProductId={selectedProductId}
        initialOptionId={selectedOptionId}
        onClose={() => setOrderModalOpen(false)}
        onSuccessToast={(msg) => setToastMessage(msg)}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Mobile Scrollbar with transparent track and 2s fade out */}
      <MobileScrollbar />
    </div>
  );
}
