import React, { useState, useEffect } from 'react';
import { Stamp, Sparkles, Gift, RotateCcw } from 'lucide-react';
import { MASCOT_INFO } from '../data/cafeData';

export const StampSection: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('010-1280-2227');
  const [stampsCount, setStampsCount] = useState(7);
  const [stampedMessage, setStampedMessage] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`coma_stamps_${phoneNumber}`);
      if (saved !== null) {
        setStampsCount(parseInt(saved, 10));
      } else {
        setStampsCount(7);
      }
    } catch {
      // ignore
    }
  }, [phoneNumber]);

  const handleAddStamp = () => {
    if (stampsCount >= 10) {
      setStampedMessage('🎉 축하합니다! 꼬마 스탬프 10개가 모두 모였습니다. 매장에서 무료 혜택을 이용하세요!');
      return;
    }
    const nextCount = stampsCount + 1;
    setStampsCount(nextCount);
    try {
      localStorage.setItem(`coma_stamps_${phoneNumber}`, nextCount.toString());
    } catch {
      // ignore
    }

    if (nextCount === 5) {
      setStampedMessage('🎁 꼬마의 선물! 5번째 스탬프 달성으로 아메리카노 1잔 무료 쿠폰 지급!');
    } else if (nextCount === 10) {
      setStampedMessage('🎊 10번째 스탬프 완성! 수제 크로플 또는 시그니처 아인슈페너 무료 혜택!');
    } else {
      setStampedMessage(`꼬마 도장이 쾅! 찍혔습니다. (${nextCount}/10)`);
    }

    setTimeout(() => {
      setStampedMessage(null);
    }, 3500);
  };

  const handleResetCard = () => {
    setStampsCount(0);
    try {
      localStorage.setItem(`coma_stamps_${phoneNumber}`, '0');
    } catch {
      // ignore
    }
    setStampedMessage('새로운 꼬마 도장 카드가 발급되었습니다.');
    setTimeout(() => setStampedMessage(null), 2500);
  };

  return (
    <section id="stamp" className="py-16 md:py-24 bg-[#F8F6F0] border-y border-[#EDE8DE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="text-xs text-[#FF5B00] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Kkoma Punch Card</span>
          </div>
          <h2 className="font-brand text-2xl sm:text-3xl font-black text-[#18181B]">
            COMA CAFE 단골 꼬마 스탬프
          </h2>
          <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
            마스코트 꼬마가 쾅! 찍어주는 모던 단골 쿠폰입니다.
            5잔에 아메리카노 1잔, 10잔에 꼬마의 최애 수제 크로플 또는 시그니처 음료를 선물합니다.
          </p>
        </div>

        {/* The Modern Stamp Card Component */}
        <div className="relative max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#FFE2D1] overflow-hidden">
          {/* Top Decorative accent banner */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF5B00] via-[#FFA726] to-[#FF758F]" />

          {/* Card Header with Mascot Avatar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-dashed border-[#F0ECE4] pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 bg-[#FF5B00] shrink-0">
                <img
                  src={MASCOT_INFO.avatar}
                  alt="꼬마"
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#FF5B00] block">
                  COMA CAFE 24시 꼬마다방
                </span>
                <h3 className="font-brand text-xl font-black text-[#18181B]">
                  꼬마 도장 모바일 쿠폰
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] text-[#A1A1AA] block">단골 적립 번호</span>
              <span className="font-mono text-sm font-bold text-[#18181B]">
                {phoneNumber}
              </span>
            </div>
          </div>

          {/* Stamp Grid (10 slots) */}
          <div className="grid grid-cols-5 gap-3 sm:gap-4 mb-6">
            {Array.from({ length: 10 }).map((_, index) => {
              const isStamped = index < stampsCount;
              const isReward5 = index === 4;
              const isReward10 = index === 9;

              return (
                <div
                  key={index}
                  className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center p-1.5 transition-all ${
                    isStamped
                      ? 'bg-[#FFF3EB] border-2 border-[#FF5B00] shadow-sm'
                      : 'bg-[#FCFBF9] border-2 border-dashed border-[#E4E4E7]'
                  }`}
                >
                  <span className="absolute top-1 left-2 text-[10px] font-mono text-[#A1A1AA] tabular-nums">
                    {index + 1}
                  </span>

                  {isStamped ? (
                    <div className="flex flex-col items-center justify-center transform rotate-[-6deg] animate-in zoom-in-75 duration-300">
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#FF5B00] bg-white p-0.5 shadow-2xs">
                        <img
                          src={MASCOT_INFO.avatar}
                          alt="꼬마 도장"
                          referrerPolicy="no-referrer"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <span className="text-[9px] font-bold text-[#FF5B00] mt-0.5">
                        꼬마★
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center opacity-70">
                      {isReward5 ? (
                        <>
                          <Gift className="w-4 h-4 text-[#FF5B00] mb-0.5" />
                          <span className="text-[9px] font-bold text-[#FF5B00]">
                            커피무료
                          </span>
                        </>
                      ) : isReward10 ? (
                        <>
                          <Sparkles className="w-4 h-4 text-[#FF758F] mb-0.5" />
                          <span className="text-[9px] font-bold text-[#FF758F]">
                            크로플무료
                          </span>
                        </>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-dashed border-[#D4D4D8]" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reward Status Bar */}
          <div className="p-3.5 bg-[#F9F7F2] rounded-2xl flex items-center justify-between text-xs mb-6 border border-[#EBE5DC]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5B00] animate-pulse" />
              <span className="text-[#27272A]">
                현재 달성: <strong className="font-mono text-sm text-[#FF5B00]">{stampsCount} / 10</strong>개
              </span>
            </div>
            <span className="text-[#FF5B00] font-bold">
              {stampsCount >= 10
                ? '모든 혜택 사용 가능'
                : `다음 혜택까지 ${stampsCount < 5 ? 5 - stampsCount : 10 - stampsCount}개 남음`}
            </span>
          </div>

          {/* Feedback Message */}
          {stampedMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-[#FFF5ED] border border-[#FFD2B8] text-[#D94800] text-xs font-bold text-center animate-in fade-in">
              {stampedMessage}
            </div>
          )}

          {/* Interactive Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <label htmlFor="phoneInput" className="text-xs font-medium text-[#71717A] shrink-0">
                조회 번호:
              </label>
              <input
                id="phoneInput"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="전화번호 입력"
                className="px-3 py-2 text-xs bg-white border border-[#E4E4E7] rounded-xl text-[#18181B] w-36 font-mono focus:outline-hidden focus:border-[#FF5B00]"
              />
            </div>

            <div className="flex items-center gap-2 justify-end">
              <button
                type="button"
                onClick={handleResetCard}
                className="flex items-center gap-1 px-3 py-2 text-xs text-[#71717A] hover:text-[#18181B] transition-colors cursor-pointer"
                title="카드 초기화"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>새 카드</span>
              </button>
              <button
                type="button"
                onClick={handleAddStamp}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#FF5B00] hover:bg-[#E65200] text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Stamp className="w-4 h-4" />
                <span>꼬마 도장 1개 찍기 (체험)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
