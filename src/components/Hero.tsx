import React, { useMemo } from 'react';
import { ExternalLink, ShoppingBag, Stamp, Sparkles, Moon, Sun } from 'lucide-react';
import { CAFE_INFO, MASCOT_INFO } from '../data/cafeData';

interface HeroProps {
  onOrderClick: () => void;
  onStampClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onStampClick }) => {
  // Calculate real-time open status (11:00 AM to 05:00 AM next day!)
  const openStatus = useMemo(() => {
    const now = new Date();
    // KST
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const kst = new Date(utc + 3600000 * 9);
    const hour = kst.getHours();

    // Open from 11:00 to 05:00 next day (closed only between 05:00 and 11:00 morning for cleaning)
    const isLateNightOrOpen = hour >= 11 || hour < 5;

    if (isLateNightOrOpen) {
      const isLateNight = hour >= 23 || hour < 5;
      return {
        isOpen: true,
        text: isLateNight ? "심야 만남의 광장 영업 중" : "지금 활짝 영업 중",
        timeDesc: "새벽 05:00까지 운영 (라스트오더 04:30)",
        isNight: isLateNight,
      };
    }

    return {
      isOpen: false,
      text: "매장 정비 & 준비 시간",
      timeDesc: "오늘 오전 11:00 오픈",
      isNight: false,
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:pt-14 md:pb-20 border-b border-[#F0ECE4] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & Mascot Integration */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Metadata & Status */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#52525B]">
              <span className="font-bold text-[#FF5B00] tracking-wide">
                신림동 핫플레이스
              </span>
              <span aria-hidden="true" className="text-[#D4D4D8]">·</span>
              <span className="flex items-center gap-1.5 font-semibold text-[#18181B]">
                <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                {openStatus.text} ({openStatus.timeDesc})
              </span>
              <span aria-hidden="true" className="text-[#D4D4D8] hidden sm:inline">·</span>
              <span className="hidden sm:inline text-[#71717A]">신원시장 골목 50m</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-brand text-sm sm:text-base font-extrabold text-[#FF5B00] uppercase tracking-wider">
                  24 Hours & Community Lounge
                </span>
                <span className="text-xs bg-[#FFEDE3] text-[#FF5B00] font-bold px-2 py-0.5 rounded-full">
                  새벽 5시까지 운영
                </span>
              </div>
              <h1 className="font-brand text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#18181B] leading-[1.2]">
                모던하고 힙한 만남의 광장,<br />
                <span className="text-[#FF5B00]">COMA CAFE</span> 꼬마다방
              </h1>
            </div>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl">
              비비드한 시그니처 오렌지 파사드와 스트라이프 어닝,
              감각적인 코랄레드 부스석과 핑크 스피커, 그리고 사랑스러운 마스코트 <strong>&apos;꼬마&apos;</strong>가 반겨주는 현대적인 공간.
              새벽 5시까지 갓 구운 브라운치즈 크로플과 스페셜티 커피를 즐겨보세요!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOrderClick}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF5B00] hover:bg-[#E65200] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap active:scale-98"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>메뉴 보기 & 포장 주문</span>
              </button>

              <a
                href={CAFE_INFO.naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl border-2 border-[#03C75A]/40 bg-[#03C75A]/5 hover:bg-[#03C75A]/15 text-[#028a3d] font-bold text-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full bg-[#03C75A]" />
                <span>네이버 플레이스 연동</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onStampClick}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl border border-[#E4E4E7] bg-white hover:bg-[#F4F4F5] text-[#27272A] font-bold text-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <Stamp className="w-4 h-4 text-[#FF5B00]" />
                <span>꼬마 도장 쿠폰</span>
              </button>
            </div>

            {/* Key Modern Highlights (Real store features) */}
            <div className="pt-4 border-t border-[#F0ECE4] grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-brand text-2xl font-black text-[#18181B] tabular-nums">
                  11~05시
                </span>
                <span className="text-xs text-[#71717A] font-medium">새벽 심야 만남의 광장</span>
              </div>
              <div>
                <span className="block font-brand text-2xl font-black text-[#FF5B00] tabular-nums">
                  인스타 핫플
                </span>
                <span className="text-xs text-[#71717A] font-medium">플라워 미러 & 핑크폰</span>
              </div>
              <div>
                <span className="block font-brand text-2xl font-black text-[#18181B] tabular-nums">
                  수제 크로플
                </span>
                <span className="text-xs text-[#71717A] font-medium">젤라또 & 브라운치즈</span>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Exterior Showcase + Floating Mascot Widget */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EBE5DC] bg-[#F7F5F0] aspect-[4/3] lg:aspect-[16/11]">
              <img
                src="/src/assets/images/hero_coma_cafe_modern_1790408966634.jpg"
                alt="COMA CAFE 꼬마다방 모던 오렌지 외관"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-brand text-base font-black tracking-wide">
                  COMA CAFE · 24시 꼬마다방 & 만남의 광장
                </p>
                <p className="text-xs text-white/90 mt-0.5">
                  비비드 오렌지 파사드 & 그린 스트라이프 테라스
                </p>
              </div>
            </div>

            {/* Floating Cute Mascot Card */}
            <div className="flex items-center gap-3 absolute -bottom-5 -left-4 sm:-left-6 bg-white p-3 rounded-2xl shadow-xl border border-[#FFD9C4] max-w-[280px] animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#FF5B00] to-[#FFA726] shrink-0">
                <img
                  src={MASCOT_INFO.avatar}
                  alt="마스코트 꼬마"
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#18181B]">바리스타 꼬마</span>
                  <span className="text-[10px] text-[#FF5B00] font-bold">Mascot</span>
                </div>
                <p className="text-[#52525B] text-[11px] leading-tight mt-0.5">
                  &ldquo;안녕! 맛있는 크로플 구워둘게 🧡&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
