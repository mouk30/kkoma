import React, { useState } from 'react';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { MenuItem } from '../data/cafeData';
import { CartItemOption } from '../types/cart';

interface ItemOptionModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, options: CartItemOption, quantity: number) => void;
}

export const ItemOptionModal: React.FC<ItemOptionModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const defaultTemp: 'HOT' | 'ICE' | 'NONE' =
    item.tempOptions === 'NONE'
      ? 'NONE'
      : item.tempOptions === 'ICE'
      ? 'ICE'
      : 'HOT';

  const [temp, setTemp] = useState<'HOT' | 'ICE' | 'NONE'>(defaultTemp);
  const [extraShot, setExtraShot] = useState<boolean>(false);
  const [sweetness, setSweetness] = useState<'default' | 'less'>('default');
  const [useTumbler, setUseTumbler] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const isBeverage = item.category === 'signature' || item.category === 'coffee' || item.category === 'non-coffee';
  const canAddShot = item.category === 'signature' || item.category === 'coffee';

  const unitPrice =
    item.price +
    (extraShot ? 500 : 0) -
    (useTumbler ? 300 : 0);

  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart(
      item,
      {
        temp,
        extraShot,
        sweetness,
        useTumbler,
      },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#EBE5DC] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-[#F0ECE4]">
          <div>
            <span className="text-xs font-bold text-[#FF5B00] tracking-wider uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>
                {item.category === 'signature' && 'COMA 시그니처'}
                {item.category === 'dessert' && '수제 디저트'}
                {item.category === 'coffee' && '스페셜티 커피'}
                {item.category === 'non-coffee' && '음료 & 에이드'}
              </span>
            </span>
            <h3 className="font-brand text-xl font-black text-[#18181B] mt-0.5 break-keep">
              {item.name}
            </h3>
            <p className="text-xs text-[#71717A] mt-0.5">{item.nameEn}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Item Image & Description */}
          <div className="flex gap-3.5 sm:gap-4 items-center">
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#EBE5DC] bg-[#F7F5F0] shrink-0"
            />
            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed break-keep">
              {item.description}
            </p>
          </div>

          {/* Temperature Option (HOT / ICE) if applicable */}
          {item.tempOptions === 'BOTH' && (
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs font-bold text-[#27272A]">
                온도 선택
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTemp('HOT')}
                  className={`min-h-[44px] py-2.5 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    temp === 'HOT'
                      ? 'border-[#FF5B00] bg-[#FFF5ED] text-[#FF5B00]'
                      : 'border-[#E4E4E7] bg-white text-[#52525B] hover:bg-[#F4F4F5]'
                  }`}
                >
                  따뜻하게 (HOT)
                </button>
                <button
                  type="button"
                  onClick={() => setTemp('ICE')}
                  className={`min-h-[44px] py-2.5 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    temp === 'ICE'
                      ? 'border-[#0284C7] bg-[#F0F9FF] text-[#0284C7]'
                      : 'border-[#E4E4E7] bg-white text-[#52525B] hover:bg-[#F4F4F5]'
                  }`}
                >
                  시원하게 (ICE)
                </button>
              </div>
            </div>
          )}

          {/* Coffee Shot Option */}
          {canAddShot && (
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs font-bold text-[#27272A]">
                샷 추가
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setExtraShot(false)}
                  className={`min-h-[44px] py-2.5 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    !extraShot
                      ? 'border-[#FF5B00] bg-[#FFF5ED] text-[#FF5B00]'
                      : 'border-[#E4E4E7] bg-white text-[#52525B]'
                  }`}
                >
                  기본 투샷
                </button>
                <button
                  type="button"
                  onClick={() => setExtraShot(true)}
                  className={`min-h-[44px] py-2.5 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    extraShot
                      ? 'border-[#FF5B00] bg-[#FFF5ED] text-[#FF5B00]'
                      : 'border-[#E4E4E7] bg-white text-[#52525B]'
                  }`}
                >
                  샷 추가 (+500원)
                </button>
              </div>
            </div>
          )}

          {/* Sweetness option */}
          {isBeverage && (
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs font-bold text-[#27272A]">
                당도 조절
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSweetness('default')}
                  className={`min-h-[44px] py-2.5 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    sweetness === 'default'
                      ? 'border-[#FF5B00] bg-[#FFF5ED] text-[#FF5B00]'
                      : 'border-[#E4E4E7] bg-white text-[#52525B]'
                  }`}
                >
                  추천 기본 당도
                </button>
                <button
                  type="button"
                  onClick={() => setSweetness('less')}
                  className={`min-h-[44px] py-2.5 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    sweetness === 'less'
                      ? 'border-[#FF5B00] bg-[#FFF5ED] text-[#FF5B00]'
                      : 'border-[#E4E4E7] bg-white text-[#52525B]'
                  }`}
                >
                  덜 달게
                </button>
              </div>
            </div>
          )}

          {/* Tumbler discount */}
          {isBeverage && (
            <div className="pt-1">
              <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#E4E4E7] bg-[#FCFBF7] cursor-pointer hover:bg-[#FFF8F3]">
                <input
                  type="checkbox"
                  checked={useTumbler}
                  onChange={(e) => setUseTumbler(e.target.checked)}
                  className="rounded border-[#D4D4D8] text-[#FF5B00] focus:ring-[#FF5B00] w-4 h-4 cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#18181B] break-keep">
                    개인 텀블러 지참 할인 (-300원)
                  </span>
                  <p className="text-[#71717A] mt-0.5 break-keep">
                    매장 픽업 시 준비해주신 텀블러에 담아드립니다.
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE4]">
            <span className="text-xs font-bold text-[#27272A]">수량 선택</span>
            <div className="flex items-center gap-3 bg-[#FCFBF7] border border-[#E4E4E7] rounded-xl px-2 py-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="p-1 rounded-lg text-[#52525B] hover:bg-[#EBE6DC] disabled:opacity-30 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-brand text-sm font-bold text-[#18181B] tabular-nums px-2 min-w-5 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 rounded-lg text-[#52525B] hover:bg-[#EBE6DC] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer with action */}
        <div className="p-4 sm:p-5 bg-[#FCFBF7] border-t border-[#F0ECE4] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#71717A] block">주문 예상 금액</span>
            <span className="font-brand text-xl font-black text-[#18181B] tabular-nums">
              {totalPrice.toLocaleString()}원
            </span>
          </div>
          <button
            onClick={handleConfirm}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF5B00] hover:bg-[#E65200] text-white text-sm font-bold transition-colors shadow-md cursor-pointer active:scale-98"
          >
            <Check className="w-4 h-4 text-white" />
            <span>장바구니 담기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
