import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShoppingBag, ExternalLink } from 'lucide-react';
import { CAFE_INFO, MASCOT_INFO } from '../data/cafeData';
import { toggleCafeAudio } from '../utils/cafeAudio';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenStamp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenStamp }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const state = toggleCafeAudio(0.2, (playing) => setIsPlayingAudio(playing));
    setIsPlayingAudio(state);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#F0EBE1]'
          : 'bg-[#FCFBF7] border-b border-[#F0ECE4]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand title with Mascot avatar icon */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#FF5B00] to-[#FFA726] shadow-xs shrink-0">
            <img
              src={MASCOT_INFO.avatar}
              alt="꼬마 마스코트"
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-brand text-lg sm:text-xl font-black tracking-tight text-[#18181B] group-hover:text-[#FF5B00] transition-colors leading-none">
                {CAFE_INFO.brandName}
              </span>
              <span className="text-[11px] font-bold text-white bg-[#FF5B00] px-1.5 py-0.2 rounded-md">
                꼬마다방
              </span>
            </div>
            <span className="text-[10px] text-[#71717A] tracking-tight">
              24시 & 만남의 광장
            </span>
          </div>
        </a>

        {/* Zone 2: 4-6 Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#52525B]">
          <a href="#menu" className="hover:text-[#FF5B00] transition-colors relative py-1">
            메뉴 소개
          </a>
          <a href="#story" className="hover:text-[#FF5B00] transition-colors relative py-1">
            공간 & 포토존
          </a>
          <button
            onClick={onOpenStamp}
            className="hover:text-[#FF5B00] transition-colors relative py-1 cursor-pointer"
          >
            단골 스탬프
          </button>
          <a href="#reviews" className="hover:text-[#FF5B00] transition-colors relative py-1">
            방문자 리뷰
          </a>
          <a href="#location" className="hover:text-[#FF5B00] transition-colors relative py-1">
            오시는 길
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient BGM Radio button */}
          <button
            onClick={handleAudioToggle}
            title={isPlayingAudio ? 'BGM 끄기' : '모던 다방 BGM 켜기'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-[#FF5B00] text-white shadow-xs'
                : 'bg-[#F4F1EA] text-[#52525B] hover:bg-[#EBE6DC] hover:text-[#18181B]'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline">BGM ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#FF5B00]" />
                <span className="hidden sm:inline">BGM</span>
              </>
            )}
          </button>

          {/* Naver Place Link */}
          <a
            href={CAFE_INFO.naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#03C75A]/10 text-[#029844] hover:bg-[#03C75A]/20 transition-colors"
          >
            <span>네이버 플레이스</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Takeout Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-[#18181B] text-white hover:bg-[#FF5B00] transition-colors cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-4 h-4 text-[#FFA726]" />
            <span>포장 주문</span>
            {cartCount > 0 && (
              <span className="bg-[#FF5B00] text-white text-[11px] font-black px-1.5 py-0.2 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
