import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Clock, Phone, User, CheckCircle2, ShoppingBag, AlertCircle } from 'lucide-react';
import { CartItem } from '../types/cart';
import { CAFE_INFO, MASCOT_INFO } from '../data/cafeData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [pickupTime, setPickupTime] = useState<string>('15분 후');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [requestNote, setRequestNote] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isOrderComplete, setIsOrderComplete] = useState<boolean>(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string>('');

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.itemTotalPrice, 0);
  const totalTumblerDiscount = items.reduce(
    (sum, item) => sum + (item.options.useTumbler ? 300 * item.quantity : 0),
    0
  );

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim()) {
      setFormError('주문자 성함과 연락처를 입력해 주세요.');
      return;
    }
    setFormError(null);

    const orderNo = `COMA-${Math.floor(100000 + Math.random() * 900000)}`;
    setCompletedOrderNumber(orderNo);
    setIsOrderComplete(true);
    onClearCart();
  };

  const handleReset = () => {
    setIsOrderComplete(false);
    setCompletedOrderNumber('');
    setFormError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FCFBF7] shadow-2xl border-l border-[#EBE5DC] flex flex-col justify-between">
          {/* Top Header */}
          <div className="p-4 sm:p-5 border-b border-[#F0ECE4] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FF5B00]" />
              <h2 className="font-brand text-lg font-black text-[#18181B]">
                포장 주문 바구니
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 flex-1 overflow-y-auto space-y-6">
            {isOrderComplete ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-20 h-20 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#FF5B00] to-[#FFA726] mx-auto shadow-md">
                  <img
                    src={MASCOT_INFO.bakingImg}
                    alt="주문 완료 꼬마 마스코트"
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#FF5B00]">주문 접수 완료</span>
                  <h3 className="font-brand text-2xl font-black text-[#18181B]">
                    맛있게 준비해둘게요! 🧡
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525B] max-w-xs mx-auto leading-relaxed">
                    바리스타 꼬마가 주문을 확인했습니다. 지정하신 픽업 시간에 매장에 방문해 주세요.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#EBE5DC] text-left text-xs space-y-2 mt-4 shadow-xs">
                  <div className="flex justify-between border-b border-[#F4F1EA] pb-2">
                    <span className="text-[#71717A]">주문 번호</span>
                    <span className="font-mono font-bold text-[#18181B]">{completedOrderNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F4F1EA] pb-2">
                    <span className="text-[#71717A]">픽업 예정 시간</span>
                    <span className="font-bold text-[#FF5B00]">{pickupTime}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F4F1EA] pb-2">
                    <span className="text-[#71717A]">주문자</span>
                    <span className="text-[#18181B] font-medium">{customerName} ({customerPhone})</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-[#71717A]">수령 매장</span>
                    <span className="text-[#18181B] font-medium">{CAFE_INFO.shortAddress}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  <a
                    href={CAFE_INFO.naverMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-[#03C75A] text-white text-xs font-bold hover:bg-[#029844] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>네이버 지도에서 매장 길찾기</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="w-full py-3 rounded-xl bg-[#18181B] text-white text-xs font-bold hover:bg-[#FF5B00] transition-colors cursor-pointer"
                  >
                    확인 및 닫기
                  </button>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-[#D4D4D8]" />
                <p className="font-brand text-base font-bold text-[#18181B]">
                  장바구니가 비어 있습니다
                </p>
                <p className="text-xs text-[#71717A]">
                  시그니처 크로플과 커피를 골라 담아보세요.
                </p>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#71717A]">
                    <span>담은 메뉴 ({items.length}개)</span>
                    <button
                      onClick={onClearCart}
                      className="text-[#FF5B00] hover:underline font-medium cursor-pointer"
                    >
                      전체 비우기
                    </button>
                  </div>

                  <div className="divide-y divide-[#F4F1EA] bg-white rounded-2xl border border-[#EBE5DC] overflow-hidden shadow-xs">
                    {items.map((item) => (
                      <div key={item.id} className="p-3.5 space-y-2">
                        <div className="flex gap-3 justify-between items-start">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-xl object-cover bg-[#F7F5F0] border border-[#EBE5DC] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-brand text-sm font-bold text-[#18181B] truncate">
                              {item.menuItem.name}
                            </h4>

                            {/* Applied Options */}
                            <div className="text-[11px] text-[#71717A] mt-0.5 space-x-1">
                              {item.options.temp !== 'NONE' && (
                                <span className="font-bold text-[#FF5B00]">
                                  {item.options.temp === 'ICE' ? 'ICE' : 'HOT'}
                                </span>
                              )}
                              {item.options.extraShot && <span>· 샷추가</span>}
                              {item.options.sweetness === 'less' && <span>· 덜달게</span>}
                              {item.options.useTumbler && (
                                <span className="text-emerald-600 font-medium">· 텀블러(-300원)</span>
                              )}
                            </div>

                            <div className="font-brand text-xs font-bold text-[#18181B] mt-1 tabular-nums">
                              {item.itemTotalPrice.toLocaleString()}원
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#A1A1AA] hover:text-[#EF4444] p-1 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center justify-end gap-2 pt-1">
                          <div className="flex items-center border border-[#E4E4E7] rounded-lg bg-[#FCFBF7]">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="px-2 py-0.5 text-xs text-[#52525B] hover:bg-[#F4F4F5] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold px-2 tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="px-2 py-0.5 text-xs text-[#52525B] hover:bg-[#F4F4F5] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Validation Error Banner */}
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Pickup Details Form */}
                <form id="orderForm" onSubmit={handleCheckout} className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-[#18181B]">
                      <Clock className="w-3.5 h-3.5 text-[#FF5B00]" />
                      <span>방문 픽업 시간</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['15분 후', '30분 후', '1시간 후'].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setPickupTime(time)}
                          className={`py-1.5 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            pickupTime === time
                              ? 'border-[#FF5B00] bg-[#FFF5ED] text-[#FF5B00]'
                              : 'border-[#E4E4E7] bg-white text-[#52525B] hover:bg-[#F4F4F5]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-[#18181B]">
                        <User className="w-3.5 h-3.5 text-[#FF5B00]" />
                        <span>주문자 성함 *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="예: 홍길동"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          if (formError) setFormError(null);
                        }}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#E4E4E7] rounded-xl text-[#18181B] focus:outline-hidden focus:border-[#FF5B00]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-[#18181B]">
                        <Phone className="w-3.5 h-3.5 text-[#FF5B00]" />
                        <span>연락처 * (포장 완료 알림용)</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="010-0000-0000"
                        value={customerPhone}
                        onChange={(e) => {
                          setCustomerPhone(e.target.value);
                          if (formError) setFormError(null);
                        }}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#E4E4E7] rounded-xl text-[#18181B] focus:outline-hidden focus:border-[#FF5B00]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#18181B]">
                        바리스타 요청 사항 (선택)
                      </label>
                      <input
                        type="text"
                        placeholder="예: 얼음 적게, 포장 꼼꼼히 부탁드려요"
                        value={requestNote}
                        onChange={(e) => setRequestNote(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#E4E4E7] rounded-xl text-[#18181B] focus:outline-hidden focus:border-[#FF5B00]"
                      />
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Bottom Summary & Actions */}
          {!isOrderComplete && items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#EBE5DC] bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#52525B]">
                  <span>상품 주문 금액</span>
                  <span className="font-mono tabular-nums">
                    {(totalAmount + totalTumblerDiscount).toLocaleString()}원
                  </span>
                </div>
                {totalTumblerDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>개인 텀블러 할인</span>
                    <span className="font-mono tabular-nums">
                      -{totalTumblerDiscount.toLocaleString()}원
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-[#F0ECE4]">
                  <span className="font-brand text-sm font-bold text-[#18181B]">
                    최종 결제 금액
                  </span>
                  <span className="font-brand text-xl font-black text-[#FF5B00] tabular-nums">
                    {totalAmount.toLocaleString()}원
                  </span>
                </div>
                <p className="text-[11px] text-[#A1A1AA]">
                  * 결제는 매장 방문 시 카드/페이/현금으로 진행됩니다.
                </p>
              </div>

              <button
                type="submit"
                form="orderForm"
                className="w-full py-3.5 rounded-xl bg-[#FF5B00] hover:bg-[#E65200] text-white text-sm font-bold transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>포장 예약 접수하기</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
