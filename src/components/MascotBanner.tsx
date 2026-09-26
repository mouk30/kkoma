import React, { useState } from 'react';
import { Sparkles, Heart, Coffee, ChevronRight, MessageCircle } from 'lucide-react';
import { MASCOT_INFO, MenuItem, MENU_ITEMS } from '../data/cafeData';

interface MascotBannerProps {
  onSelectRecommendedItem: (item: MenuItem) => void;
}

export const MascotBanner: React.FC<MascotBannerProps> = ({ onSelectRecommendedItem }) => {
  const [activeSpeech, setActiveSpeech] = useState<number>(0);

  const speeches = [
    "안녕! 나는 꼬마다방의 공식 바리스타 마스코트 '꼬마'야! 🧡",
    "새벽 5시까지 불을 밝히고 맛있는 커피와 달콤한 크로플로 기다리고 있어!",
    "우리 매장의 핑크 빈티지 전화기 포토존에서 인생샷 꼭 남겨봐!"
  ];

  const handleRecommendClick = (title: string) => {
    const found = MENU_ITEMS.find((m) => m.name.includes(title) || title.includes(m.name));
    if (found) {
      onSelectRecommendedItem(found);
    }
  };

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-r from-[#FFF5EE] via-[#FFF8F3] to-[#FFF0E6] border-y border-[#FFE2D1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-[#FFD9C4] relative overflow-hidden">
          {/* Subtle decorative background circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF6B00]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#FF758F]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left: Mascot Image & Badge */}
            <div className="lg:col-span-4 flex flex-col items-center sm:flex-row lg:flex-col justify-center gap-3.5 sm:gap-4 text-center sm:text-left lg:text-center">
              <div className="relative group shrink-0">
                <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full p-1 sm:p-1.5 bg-gradient-to-tr from-[#FF6B00] via-[#FF8A3D] to-[#FFB703] shadow-lg">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white">
                    <img
                      src={MASCOT_INFO.avatar}
                      alt="꼬마다방 마스코트 꼬마"
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                {/* Floating Heart Sticker */}
                <div className="absolute -bottom-0.5 -right-0.5 bg-[#FF6B00] text-white p-1.5 sm:p-2 rounded-full shadow-md flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFEDE3] text-[#FF5B00] text-[11px] sm:text-xs font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{MASCOT_INFO.badge}</span>
                </div>
                <h3 className="font-brand text-xl sm:text-2xl font-black text-[#18181B] tracking-tight">
                  {MASCOT_INFO.name}
                </h3>
                <p className="text-xs text-[#71717A] mt-0.5 break-keep">
                  {MASCOT_INFO.title}
                </p>
              </div>
            </div>

            {/* Right: Interactive Speech & Mascot Recommendations */}
            <div className="lg:col-span-8 space-y-5">
              {/* Mascot Dialogue Bubble */}
              <div
                onClick={() => setActiveSpeech((prev) => (prev + 1) % speeches.length)}
                className="relative bg-[#FFF7F2] p-4 sm:p-5 rounded-2xl border border-[#FFDECE] cursor-pointer hover:bg-[#FFF2E9] transition-colors group active:scale-[0.99]"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#FF6B00] text-white shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#FF5B00] tracking-wider uppercase block">
                        꼬마의 한마디 (터치하면 다음 메시지)
                      </span>
                      <span className="text-[10px] text-[#A1A1AA] hidden sm:inline">
                        {activeSpeech + 1}/{speeches.length}
                      </span>
                    </div>
                    <p className="font-modern-kr text-sm sm:text-base font-semibold text-[#27272A] mt-1 leading-snug break-keep">
                      &ldquo;{speeches[activeSpeech]}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Mascot's Recommended Picks */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                  <span className="text-xs font-bold text-[#27272A] flex items-center gap-1.5">
                    <Coffee className="w-4 h-4 text-[#FF5B00]" />
                    <span>꼬마가 직접 추천하는 시그니처 3선</span>
                  </span>
                  <span className="text-[11px] text-[#A1A1AA]">
                    카드를 누르면 바로 주문 옵션이 열려요
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {MASCOT_INFO.recommends.map((rec, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRecommendClick(rec.title)}
                      className="p-3.5 rounded-2xl bg-[#FCFBF9] hover:bg-[#FFF5ED] border border-[#EBE5DC] hover:border-[#FF6B00] text-left transition-all duration-200 group/rec cursor-pointer flex flex-col justify-between active:scale-[0.98]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FF6B00]/10 text-[#FF5B00]">
                            Pick 0{idx + 1}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#A1A1AA] group-hover/rec:text-[#FF5B00] group-hover/rec:translate-x-0.5 transition-all" />
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#18181B] group-hover/rec:text-[#FF5B00] transition-colors break-keep">
                          {rec.title}
                        </h4>
                        <p className="text-[11px] text-[#71717A] mt-1 leading-relaxed break-keep">
                          {rec.reason}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-[#F0EBE3] text-[10px] font-semibold text-[#FF5B00]">
                        + 옵션 선택 & 담기
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
