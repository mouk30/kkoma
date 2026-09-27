import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, X, MessageCircle, ChevronRight, Volume2 } from 'lucide-react';
import { MASCOT_INFO } from '../data/cafeData';

interface MascotGreetingProps {
  onNavigate: (sectionId: string) => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export const MascotGreeting: React.FC<MascotGreetingProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [speechIndex, setSpeechIndex] = useState(0);
  const [isWavingHard, setIsWavingHard] = useState(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const greetingSpeeches = [
    "안녕! 어서와~ 신림동 COMA CAFE(꼬마다방)에 온 걸 환영해! 🧡",
    "반가워! 바리스타 꼬마야, 손 흔들어 인사할게~ 👋",
    "우린 새벽 5시까지 불 켜두고 따뜻하게 기다리고 있어! ✨",
    "프랑스산 버터로 갓 구운 브라운치즈 젤라또 크로플 꼭 맛봐! 🥐",
    "튤 조명 거울 앞에서 빈티지 핑크 전화기 들고 인생샷 남겨봐! 📸",
    "스탬프 5개 모으면 커피 무료, 10개 모으면 크로플 선물 줄게! 🎁"
  ];

  // Auto rotate greeting message every 6s when bubble is visible
  useEffect(() => {
    const timer = setInterval(() => {
      setSpeechIndex((prev) => (prev + 1) % greetingSpeeches.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [greetingSpeeches.length]);

  // Cheerful chime sound using Web Audio API on wave
  const playCuteChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Note 1 (E5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.3);

      // Note 2 (G5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, now + 0.1);
      gain2.gain.setValueAtTime(0.09, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.45);

      // Note 3 (C6)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(1046.5, now + 0.2);
      gain3.gain.setValueAtTime(0.1, now + 0.2);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      osc3.start(now + 0.2);
      osc3.stop(now + 0.65);
    } catch {
      // AudioContext not allowed before user gesture
    }
  };

  const handleWave = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsWavingHard(true);
    playCuteChime();

    // Spawn floating emoji hearts/sparkles
    const newHearts: FloatingHeart[] = [
      { id: Date.now() + 1, x: Math.random() * 40 - 20, y: -10, emoji: '🧡' },
      { id: Date.now() + 2, x: Math.random() * 40 - 20, y: -25, emoji: '✨' },
      { id: Date.now() + 3, x: Math.random() * 40 - 20, y: -40, emoji: '👋' },
    ];
    setHearts((prev) => [...prev, ...newHearts]);

    // Cycle message
    setSpeechIndex((prev) => (prev + 1) % greetingSpeeches.length);

    setTimeout(() => {
      setIsWavingHard(false);
    }, 1200);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 1500);
  };

  return (
    <div className="fixed bottom-16 md:bottom-6 left-3 md:left-6 z-40 select-none">
      {/* Floating Hearts Animation */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute text-lg pointer-events-none animate-heart-float z-50"
          style={{
            left: `calc(50% + ${h.x}px)`,
            bottom: '70px',
          }}
        >
          {h.emoji}
        </span>
      ))}

      {/* Expanded Interactive Mascot Dialog Bubble */}
      {isOpen ? (
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-[#FFD9C4] w-76 sm:w-80 mb-3 animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#F0ECE4] pb-2.5 mb-2.5">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#FF5B00] to-[#FFA726] shrink-0">
                <img
                  src={MASCOT_INFO.avatar}
                  alt="꼬마"
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs sm:text-sm text-[#18181B] leading-none">
                    마스코트 꼬마
                  </span>
                  <span className="text-[10px] text-white bg-[#FF5B00] font-black px-1.5 py-0.2 rounded-md leading-none">
                    COMA CAFE
                  </span>
                </div>
                <span className="text-[10px] text-[#71717A] mt-0.5 block">
                  공식 바리스타 & 안내원
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-[#A1A1AA] hover:text-[#18181B] hover:bg-[#F4F4F5] transition-colors cursor-pointer"
              title="대화 닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cute Greeting Speech Box */}
          <div
            onClick={handleWave}
            className="p-3 bg-[#FFF7F2] rounded-2xl border border-[#FFDECE] cursor-pointer hover:bg-[#FFF2E9] transition-colors group relative"
          >
            <div className="flex items-start gap-2.5">
              <div className="text-xl shrink-0 mt-0.5 animate-kkoma-wave">
                👋
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-semibold text-[#27272A] leading-snug break-keep">
                  &ldquo;{greetingSpeeches[speechIndex]}&rdquo;
                </p>
                <div className="flex items-center justify-between mt-1 text-[10px] text-[#FF5B00] font-bold">
                  <span>터치하면 손 흔들며 다른 말도 해줘요!</span>
                  <span className="text-[#A1A1AA] font-normal">{speechIndex + 1}/{greetingSpeeches.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="mt-3 space-y-1.5">
            <button
              onClick={() => {
                onNavigate('menu');
                setIsOpen(false);
              }}
              className="w-full py-2 px-3 bg-[#FFF5ED] hover:bg-[#FFE8D9] text-[#18181B] rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span>🥐</span>
                <span>수제 크로플 & 시그니처 메뉴</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#FF5B00]" />
            </button>

            <button
              onClick={() => {
                onNavigate('stamp');
                setIsOpen(false);
              }}
              className="w-full py-2 px-3 bg-[#FFF5ED] hover:bg-[#FFE8D9] text-[#18181B] rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span>🎁</span>
                <span>단골 꼬마 도장 쿠폰 찍기</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#FF5B00]" />
            </button>

            <button
              onClick={() => {
                onNavigate('story');
                setIsOpen(false);
              }}
              className="w-full py-2 px-3 bg-[#FFF5ED] hover:bg-[#FFE8D9] text-[#18181B] rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span>📸</span>
                <span>플라워 거울 & 핑크폰 포토존</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#FF5B00]" />
            </button>
          </div>

          {/* Wave Interaction Button */}
          <button
            onClick={handleWave}
            className="mt-3 w-full py-2 rounded-xl bg-[#FF5B00] hover:bg-[#E65200] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <span className="animate-kkoma-wave">👋</span>
            <span>꼬마에게 안녕! 손 흔들기</span>
          </button>
        </div>
      ) : null}

      {/* Main Mascot Floating Avatar Trigger Button */}
      <div className="relative group">
        {/* Subtle Pulse Ring */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FF5B00] to-[#FFA726] opacity-75 blur-xs animate-kkoma-ring pointer-events-none" />

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              handleWave();
            }
          }}
          className={`relative flex items-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 pr-3.5 sm:pr-4 bg-white hover:bg-[#FFF5ED] border-2 border-[#FFD9C4] rounded-full shadow-xl transition-all duration-300 cursor-pointer active:scale-95 ${
            isWavingHard ? 'animate-kkoma-bounce ring-4 ring-[#FF5B00]/30' : 'animate-kkoma-greet'
          }`}
          title="꼬마 마스코트와 인사하기"
        >
          {/* Avatar Container with Waving Hand Badge */}
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#FF5B00] via-[#FF8A3D] to-[#FFA726] shadow-xs shrink-0">
            <img
              src={MASCOT_INFO.avatar}
              alt="꼬마다방 마스코트 꼬마"
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Waving Hand Badge on Avatar Rim */}
          <div className="absolute -top-1 -right-0.5 bg-[#FF5B00] text-white w-5 h-5 rounded-full shadow-md flex items-center justify-center text-[11px] border border-white animate-kkoma-wave">
            👋
          </div>

          {/* Label & Status */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-brand text-xs sm:text-sm font-black text-[#18181B] group-hover:text-[#FF5B00] transition-colors leading-none">
                꼬마가 인사해요!
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[10px] text-[#FF5B00] font-bold mt-0.5 leading-none">
              &ldquo;안녕! 어서와 🧡&rdquo;
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
