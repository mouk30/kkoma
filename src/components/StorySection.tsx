import React from 'react';
import { SPACE_STORIES, MASCOT_INFO } from '../data/cafeData';
import { Camera, Sparkles } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-16 md:py-24 bg-[#FCFBF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs text-[#FF5B00] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern & Aesthetic Space</span>
          </div>
          <h2 className="font-brand text-2xl sm:text-3xl lg:text-4xl font-black text-[#18181B] tracking-tight">
            COMA CAFE 감각적인 공간 & 포토존
          </h2>
          <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
            비비드 오렌지 파사드부터 코랄레드 부스석, 은은한 튤 플라워 조명 거울까지.
            어느 각도에서 찍어도 감성 가득한 인생샷을 남길 수 있는 신림동의 트렌디한 공간입니다.
          </p>
        </div>

        {/* 3 Modern Space Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPACE_STORIES.map((story, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl border border-[#EBE5DC] overflow-hidden hover:border-[#FF5B00]/40 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-[#F7F5F0] overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#18181B] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Camera className="w-3 h-3 text-[#FF5B00]" />
                  <span>{story.tag}</span>
                </div>

                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[11px] font-mono tracking-wider uppercase opacity-85 block">
                    {story.subtitle}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <h3 className="font-brand text-lg font-bold text-[#18181B] group-hover:text-[#FF5B00] transition-colors leading-snug">
                  {story.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                  {story.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mascot Photo Spot Tip Box */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#FFD9C4] shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#FFF5ED] border border-[#FF6B00]/30 shrink-0">
            <img
              src={MASCOT_INFO.bakingImg}
              alt="크로플을 구운 꼬마"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5B00]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>꼬마 마스코트의 꿀팁</span>
            </div>
            <h4 className="font-brand text-base sm:text-lg font-bold text-[#18181B]">
              &ldquo;튤 조명 원형 거울 앞에서 핑크 레트로 전화기 들고 찍으면 인스타 피드 박제각! 📸&rdquo;
            </h4>
            <p className="text-xs text-[#71717A]">
              거울 조명이 얼굴을 화사하게 밝혀주고, 빈티지 핑크 수화기 소품이 러블리한 감성을 더해줍니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
