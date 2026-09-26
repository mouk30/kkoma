import React from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { CAFE_INFO, MASCOT_INFO } from '../data/cafeData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#18181B] text-[#A1A1AA] py-14 border-t border-[#27272A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-[#27272A]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden p-0.5 bg-[#FF5B00]">
                <img
                  src={MASCOT_INFO.avatar}
                  alt="꼬마"
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-brand text-2xl font-black text-white">
                    {CAFE_INFO.brandName}
                  </span>
                  <span className="text-xs font-bold text-white bg-[#FF5B00] px-2 py-0.5 rounded-md">
                    24시 꼬마다방
                  </span>
                </div>
                <span className="text-xs text-[#71717A]">
                  만남의 광장 · 신림동 본점
                </span>
              </div>
            </div>

            <p className="text-xs text-[#71717A] max-w-md leading-relaxed">
              신림동의 모던한 감성 핫플레이스. 선명한 오렌지 파사드, 코랄레드 라운지,
              그리고 귀여운 마스코트 꼬마가 새벽 5시까지 따뜻한 온기로 여러분을 맞이합니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={CAFE_INFO.naverMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#03C75A]/20 hover:bg-[#03C75A]/30 text-[#03C75A] text-xs font-bold transition-colors"
            >
              <span>네이버 플레이스</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-xs font-bold text-white transition-colors cursor-pointer"
            >
              <span>맨 위로</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quiet details */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-[#71717A]">
          <div className="space-y-1">
            <p>상호명: 꼬마다방 (COMA CAFE) · 소재지: {CAFE_INFO.address}</p>
            <p>영업시간: 매일 11:00 ~ 익일 새벽 05:00 (연중무휴) · 문의: {CAFE_INFO.phone}</p>
          </div>
          <p className="font-mono text-[11px] text-[#52525B]">
            © {new Date().getFullYear()} COMA CAFE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
