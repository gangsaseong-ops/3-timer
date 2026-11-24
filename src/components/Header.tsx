import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenOrder: (productId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenOrder }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '보조배터리 진동', href: '#powerbank' },
    { label: '덤벨 알람', href: '#dumbbell' },
    { label: '카펫 알람', href: '#carpet' },
    { label: '비교 요약표', href: '#comparison' },
    { label: '수면 유형 테스트', href: '#quiz' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
        isScrolled
          ? 'bg-neutral-900/95 backdrop-blur-md border-neutral-800 text-neutral-100 shadow-md'
          : 'bg-neutral-900 border-neutral-800 text-neutral-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark (Single element, no pill chips) */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors"
        >
          절대기상 3종
        </a>

        {/* Zone 2: 4-5 Concise Single-line Nav Links (Visible on desktop) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action & Tablet/Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 md:mr-2 lg:mr-0">
          <button
            onClick={() => onOpenOrder()}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm active:scale-95 cursor-pointer"
          >
            <span>수면 탈출하기</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile & Tablet hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 focus:outline-none cursor-pointer"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-neutral-900 px-4 sm:px-6 pt-3 pb-5 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="block w-full text-left py-2 px-3 text-sm font-medium text-neutral-300 hover:text-amber-400 hover:bg-neutral-800/60 rounded-md transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              수면 탈출하기 (즉시 구매 및 상담)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
