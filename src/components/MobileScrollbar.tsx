import React, { useEffect, useState, useRef } from 'react';

/**
 * MobileScrollbar:
 * - Ensures scrollbar track is completely transparent (no white/light bar)
 * - Fades the thumb to transparent after 2 seconds of scroll inactivity
 * - Immediately shows the thumb as soon as scrolling starts
 */
export const MobileScrollbar: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScrollActivity = () => {
      // Calculate scroll ratio
      const doc = document.documentElement;
      const totalScroll = doc.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(progress);
      }

      // Mark scrolling active
      setIsScrolling(true);
      doc.classList.add('is-scrolling');
      document.body.classList.add('is-scrolling');

      // Clear previous 2-second timeout
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }

      // Set 2 seconds inactivity timer to fade out
      timerRef.current = window.setTimeout(() => {
        setIsScrolling(false);
        doc.classList.remove('is-scrolling');
        document.body.classList.remove('is-scrolling');
      }, 2000);
    };

    window.addEventListener('scroll', handleScrollActivity, { passive: true });
    window.addEventListener('touchmove', handleScrollActivity, { passive: true });
    window.addEventListener('wheel', handleScrollActivity, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollActivity);
      window.removeEventListener('touchmove', handleScrollActivity);
      window.removeEventListener('wheel', handleScrollActivity);
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      document.documentElement.classList.remove('is-scrolling');
      document.body.classList.remove('is-scrolling');
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="md:hidden fixed top-2 right-1 bottom-2 w-1.5 pointer-events-none z-50 select-none bg-transparent"
    >
      {/* Floating thumb with 2s fade out */}
      <div
        className={`w-1 rounded-full bg-white/45 shadow-xs transition-opacity duration-500 ease-out ${
          isScrolling ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          height: '48px',
          transform: `translateY(${scrollProgress * (window.innerHeight - 68)}px)`,
        }}
      />
    </div>
  );
};
