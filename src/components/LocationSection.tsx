import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Copy, Check, ExternalLink, Wifi, Heart, Coffee, ShieldCheck, Moon } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CAFE_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="py-16 md:py-24 bg-[#FCFBF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <div className="text-xs text-[#FF5B00] font-bold tracking-wider uppercase">
            Location & Visiting Guide
          </div>
          <h2 className="font-brand text-2xl sm:text-3xl lg:text-4xl font-black text-[#18181B]">
            오시는 길 & 심야 만남의 광장 안내
          </h2>
          <p className="text-xs sm:text-sm text-[#71717A]">
            신림역 5번 출구 신원시장 방면, 비비드한 오렌지 파사드와 잔디 테라스가 한눈에 보입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stylized Direction Visualizer */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EBE5DC] p-6 sm:p-8 shadow-xs space-y-6">
            {/* Visual Route Guide Box */}
            <div className="relative bg-[#FFF8F3] rounded-2xl p-6 border border-[#FFDECE] overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="font-brand text-sm font-bold text-[#18181B] flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#FF5B00]" />
                  <span>신림역 5번 출구 도보 안내</span>
                </span>
                <span className="text-xs font-bold text-[#FF5B00]">도보 약 5분</span>
              </div>

              {/* Waypoint steps */}
              <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#FFD2B8]">
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#18181B] text-white flex items-center justify-center text-[10px] font-bold">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-[#18181B]">
                    지하철 2호선 · 신림선 신림역 5번 출구
                  </h4>
                  <p className="text-[11px] text-[#71717A] mt-0.5">
                    5번 출구로 나오셔서 신원시장 입구 방면으로 직진합니다.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#FF5B00] text-white flex items-center justify-center text-[10px] font-bold">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-[#18181B]">
                    신원시장 입구 사거리 골목 진입
                  </h4>
                  <p className="text-[11px] text-[#71717A] mt-0.5">
                    골목 안쪽으로 약 50m 들어서면 선명한 오렌지색 건물이 보입니다.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#03C75A] text-white flex items-center justify-center text-[10px] font-bold">
                    ★
                  </div>
                  <h4 className="text-xs font-bold text-[#18181B]">
                    COMA CAFE (24시 꼬마다방) 도착
                  </h4>
                  <p className="text-[11px] text-[#71717A] mt-0.5">
                    비비드 오렌지 파사드 & 그린 스트라이프 어닝, 초록 인조잔디 테라스!
                  </p>
                </div>
              </div>

              {/* Naver Map Direct Action */}
              <div className="mt-6 pt-4 border-t border-[#FFD9C4] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-[#71717A]">
                  실시간 길찾기와 도보 네비게이션을 지원합니다.
                </span>
                <a
                  href={CAFE_INFO.naverMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#03C75A] text-white text-xs font-bold hover:bg-[#029844] transition-colors shadow-xs"
                >
                  <span>네이버 플레이스 길찾기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Address with Copy Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#FCFBF7] rounded-2xl border border-[#EBE5DC]">
              <div className="space-y-0.5">
                <span className="text-[11px] text-[#A1A1AA] block">도로명 / 지번 주소</span>
                <p className="font-brand text-sm font-bold text-[#18181B]">
                  {CAFE_INFO.address}
                </p>
              </div>

              <button
                onClick={handleCopyAddress}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#18181B] bg-white border border-[#E4E4E7] hover:bg-[#F4F4F5] rounded-xl transition-colors cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#FF5B00]" />
                    <span>주소 복사</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Operating Hours & Amenities */}
          <div className="lg:col-span-5 space-y-6">
            {/* Operating Hours Card */}
            <div className="bg-white rounded-3xl border border-[#EBE5DC] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F0ECE4] pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF5B00]" />
                  <h3 className="font-brand text-base font-bold text-[#18181B]">
                    영업시간 안내
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-white bg-[#FF5B00] px-2 py-0.5 rounded-full">
                  새벽 5시까지
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-[#F4F1EA]">
                  <span className="text-[#52525B]">오픈 시간</span>
                  <span className="font-mono font-bold text-[#18181B]">오전 11:00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F1EA]">
                  <span className="text-[#52525B]">마감 시간</span>
                  <span className="font-mono font-bold text-[#FF5B00]">익일 새벽 05:00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F4F1EA]">
                  <span className="text-[#52525B]">심야 라스트오더</span>
                  <span className="font-mono text-[#71717A] font-medium">새벽 04:30</span>
                </div>
                <div className="flex items-center gap-1.5 py-1 text-emerald-700 font-semibold">
                  <Moon className="w-3.5 h-3.5" />
                  <span>연중무휴 · 한 달 뒤 24시간 운영 예정!</span>
                </div>
              </div>

              <div className="p-3 bg-[#FFF8F3] rounded-xl text-[11px] text-[#A05A32] leading-relaxed border border-[#FFDECE]">
                * 늦은 밤 시험공부, 야간 데이트, 모임 등 언제든 편안하게 머무실 수 있습니다.
              </div>
            </div>

            {/* Store Amenities Grid */}
            <div className="bg-white rounded-3xl border border-[#EBE5DC] p-6 shadow-xs space-y-4">
              <h3 className="font-brand text-base font-bold text-[#18181B] border-b border-[#F0ECE4] pb-3">
                편의 시설 & 매장 혜택
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#EBE5DC] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#18181B]">
                    <Heart className="w-3.5 h-3.5 text-[#FF758F]" />
                    <span>반려동물 동반</span>
                  </div>
                  <p className="text-[11px] text-[#71717A]">
                    목줄/케이지 착용 시 실내 동반 환영
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#EBE5DC] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#18181B]">
                    <Wifi className="w-3.5 h-3.5 text-[#FF5B00]" />
                    <span>기가 와이파이</span>
                  </div>
                  <p className="text-[11px] text-[#71717A]">
                    전 좌석 고속 무선인터넷 & 충전 콘센트
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#EBE5DC] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#18181B]">
                    <Coffee className="w-3.5 h-3.5 text-[#FF5B00]" />
                    <span>텀블러 할인</span>
                  </div>
                  <p className="text-[11px] text-[#71717A]">
                    개인 텀블러 주문 시 300원 즉시 할인
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#FCFBF7] border border-[#EBE5DC] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#18181B]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>간편 결제</span>
                  </div>
                  <p className="text-[11px] text-[#71717A]">
                    네이버페이 / 제로페이 / 애플페이
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
